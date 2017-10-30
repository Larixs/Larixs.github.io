---
title: 深入学习vue -- core/Observer/index.js
tags: [study notes]
categories: vue
---

### 1、基础原理：

#### a) 访问器属性

对象属性分为两种，一种是数据属性，另一种是访问器属性。平常使用的属性都是数据属性。例如

{% codeblock lang:js%}
 obj.a = 5; //a为数据属性。
{% endcodeblock %}    
访问器属性不能直接定义，需要用Object.defineProperty()来定义。

{% codeblock lang:js%}    
    //用js高程的例子
    var book = {
        _year : 2004, //"_year"是数据属性
        edition : 1
    }
    Object.defineProperty(book, "year", { //"year"是访问器属性
        get: function(){
            return this._year;
        },
        set: function(newValue){
            if (newValue > 2004){
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    });
    book.year = 2005; //此时访问的是访问器属性"year"
    alert(book.edition); //2
 {% endcodeblock %}   
 
vue利用了访问器属性来实现数据监听。因为Object.defineProperty()是ES5实现的api，且无法shim，因此vue不支持ie8及以下浏览器。

相关api：Object.getOwnPropertyDescriptor (访问器属性、数据属性都能读到)

#### b) 继承数组

Vue通过**寄生组合式继承**方式来继承数组，以改写数组的一系列方法，方便数组元素变动时能够监听。

{% codeblock lang:js%}  
const arrayProto = Array.prototype 
export const arrayMethods = Object.create(arrayProto)

//改写  'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse' 方法以监听增加的元素。

{% endcodeblock %}   

在Observer里改写Array类型的value的原型，使其指向arrayMethods.。

在实现了__proto__属性的浏览器里，可以直接将value的__proto__改写为arrayMethods，以实现数组继承（protoAugment）。

在没有实现__proto__属性的浏览器里，只能将改写后的方法作为不可枚举的属性定义到value上（copyAugment）。

参考资料:
1. [How ECMAScript 5 still does not allow to subclass array](http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/)
2. js高程

### 2、代码实现：

Observer简略流程图(可能并不标准)

![](/images/vue/Observer.png)

### 参考资料：
1. [vue早期版本](https://github.com/vuejs/vue/tree/706c67d1d013577fdbfab258bca78557419cba7c)
2. [vue近期版本](https://github.com/vuejs/vue/tree/0cc8c27a3543b63677f1ac947d404bcda47b26e2) 
3. [youngwind的blog](https://github.com/youngwind/blog)
4. 《JavaScript高级程序设计》
