---
title: 深入学习vue -- core/Observer/dep.js, core/Observer/watcher.js
tags: [study notes]
categories: vue
---

本次学习core/Observer/dep.js, core/Observer/watcher.js，

以下简称为dep.js和watcher.js

### 1、基础原理：

#### a) 静态成员

在早期文章[静态成员(class,static)](../ES6/static.md)中有较为详细的笔记。

笔记总结如下：

1. 静态成员包括静态属性和静态方法。
2. ES2015只规定了静态方法，没有规定静态属性。ES2017有静态属性的提案。目前babel已支持转码。
3. 静态成员是作为类的属性而存在的，它可以被子类继承，但不可以被实例继承及访问。
4. 静态成员只能通过类名访问。

在dep.js里，类Dep就有个静态属性target。在dep.js及src/core/observer/index.js都可以看到，访问target都是通过Dep.target这个类名本身去访问的，没有通过dep(dep = new Dep())去访问。

在dep.js里Evan You的注释提到， target表示当前正在计算的目标watcher。target是全局唯一的，因为在任何时间都只有一个watcher会被计算。应该是出于此考虑，所以Evan You将其注册为Dep的静态属性，这样还可以全局访问（猜测，不负任何责任(●'◡'●)）。

target对应的还有一个targetStack。targetStack及将一系列需要处理的target储存入栈。



### 2、代码实现:


#### a) 何时进行依赖收集，何时通知依赖更新

Dep作为各Observer的订阅中心，里面保存着订阅该Observer变化的watcher。

在两个地方会生成新的dep，一个是在Observer的constructor里，一个是在defineReactive里（代码位于core/observer/index.js）。

defineReactive生成的dep是键名的dep，Observer生成的dep是键值的dep。

例如监听 obj = { a: 1 }

obj = {} 时，defineReactive生成的dep去触发依赖更新， obj.a = 2时由Observer生成的dep去触发更新。

数组变化触发依赖更新写在vue改写的数组方法里(core/observer/array.js)。非数组触发依赖更新在defineReactive的set里。

所有数据收集依赖的地方放在了defineReactive的get里。

{% codeblock lang:js%}
dep.depend() //添加当前Dep.target到dep的订阅名单里
{% endcodeblock %}  

刚开始我还有点疑惑，看起来数组没有进行依赖收集，因为当Observer的接收的值类型为数组时，根本不会进入defineReactive。后面仔细一看，发现后面还有一句
{% codeblock lang:js%}
childOb.dep.depend()
{% endcodeblock %}   
数组的依赖收集就是在这里，通过其父对象使用此句进行收集。因为数组永远是作为某个对象的property被访问的（最开始的数据data一定是个对象，不存在一开始访问的数据的类型就是数组这种情况）。

如图所示：

![](/images/vue/Observer + dep.png)
____

#### b) 如何进行依赖收集

在a）的结尾里提到了数组是如何进行依赖收集的。不过这里存在一个问题，当对一个类型为Object的数据进行依赖收集时，其父对象已经用childOb.dep.depend()为该对象添加依赖，到这个对象时，自己又会执行一遍dep.depend(),这样就有两次依赖收集了。本小节记录的内容之一就是vue如何处理依赖收集中的问题。

dep.js
{% codeblock lang:js%}
class Dep{ 

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  
}
{% endcodeblock %}   

watcher.js
{% codeblock lang:js%}
class Wathcer{

  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  
}
{% endcodeblock %}   

综合两个文件可以看出，其实dep.depend()的意思为
{% codeblock lang:js%}
    if(Dep.target){
        const id = dep.id
        if (!watcher.newDepIds.has(id)) {
          watcher.newDepIds.add(id)
          watcher.newDeps.push(dep)
          if (!watcher.depIds.has(id)) {
            dep.addSub(watcher)
          }
        }
    }
{% endcodeblock %}   

每个dep都有不同的id。当Dep.target存在时，如果是新的dep，那么会将该watcher添加到dep的订阅名单里，否则跳过。这就解决了重复收集的问题。这里的newDepIds和depIds都使用了新的数据类型Set.

newDepIds和depIds的联系和区别:

在初始的时候，newDepIds和depIds是一致的。在第一次cleanupDeps之后，depIds为newDepIds的值，newDepIds清空，从此开始newDepIds作为depIds的子集存在，保存从上一次cleanupDeps之后到目前为止新添加的dep的id。

#### c) 如何通知依赖更新

Evan You的注释：

dep.js: A dep is an observable that can have multiple directives subscribing to it. 指令？？

watcher.js：A watcher parses an expression, collects dependencies, and fires callback when the expression value changes. This is used for both the $watch() api and directives. 用于$watch和directives(?)。