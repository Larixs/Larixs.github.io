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


#### a)依赖的收集和通知更新的时机

Dep作为各Observer的订阅中心，里面保存着订阅该Observer变化的watcher。

在两个地方会生成新的dep，一个是在Observer的constructor里，一个是在defineReactive里（代码位于core/observer/index.js）。

所有的响应式数据总会经过这两个地方之一。若数据类型为Object或者Array,那么在constructor里生成自己的dep订阅中心，其他的在defineReactive里生成自己的订阅中心。

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


Evan You的注释：

dep.js: A dep is an observable that can have multiple directives subscribing to it. 指令？？

watcher.js：A watcher parses an expression, collects dependencies, and fires callback when the expression value changes. This is used for both the $watch() api and directives. 用于$watch和directives(?)。