# 深入学习vue_1

### 如何监听数据变化

#### 1、基本原理：

对象属性分为两种，一种是数据属性，另一种是访问器属性。平常使用的属性都是数据属性。例如

    obj.a = 5; //a为数据属性。
    
访问器属性不能直接定义，需要用Object.defineProperty()来定义。
    
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
    
vue利用了访问器属性来实现数据监听。因为Object.defineProperty()是ES5实现的api，且无法shim，因此vue不支持ie8及以下浏览器。

相关api：Object.getOwnPropertyDescriptor (访问器属性、数据属性都能读到)

- Object
#### 2、具体代码实现：

**Object:**

[源码](https://github.com/vuejs/vue/blob/0cc8c27a3543b63677f1ac947d404bcda47b26e2/src/core/observer/index.js)

源码注释中就有提到，每个被观察的对象都会关联Observer类。一旦关联了，observer就会把这个对象的属性键值转化为getter/setter，以此收集依赖、dispatch 更新。



____
**Array:**

监听Array的一系列方法：
    
[源码](https://github.com/vuejs/vue/blob/0cc8c27a3543b63677f1ac947d404bcda47b26e2/src/core/observer/array.js)
      
arrrayMethods以寄生组合式（js高程p172）的方式继承了Array。为arrayMethods的新定义push,pop,shift,unshift,splice,sort,reverse为数据属性，其值为正常调用Array方法时返回的值。其余方法使用Array的原生方法。当使用unshift,push,splice增加新元素时，增加这些新元素的监听。
____


###参考资料：
1. [vue早期版本](https://github.com/vuejs/vue/tree/706c67d1d013577fdbfab258bca78557419cba7c)
2. [vue近期版本](https://github.com/vuejs/vue/tree/0cc8c27a3543b63677f1ac947d404bcda47b26e2) 
3. [youngwind的blog](https://github.com/youngwind/blog)

4. 《JavaScript高级程序设计》
