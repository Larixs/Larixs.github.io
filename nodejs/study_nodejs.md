# 学习nodejs

____
### 事件驱动

node.js 是事件驱动的。

php：任何时候当有请求进入的时候，网页服务器（例如Apache）就为这一请求新建一个进程，并且开始从头到尾执行相应的PHP脚本。

**node.js: 单线程。** 先为某个事件传入回调函数，当有相应事件发生时就调用这个函数。它通过事件轮询来实现并行操作。假如在某一个回调函数中被阻塞，其他事件也得不到处理。因此node.js需要尽可能避免阻塞操作，并且多使用非阻塞操作。

参考资料：

1. [Node入门](https://www.nodebeginner.org/index-zh-cn.html)
____
### exports 与 module.exports

foo.js

    const circle = require('./circle.js');
    console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);

circle.js(与foo.js在同一级目录下)

    const { PI } = Math;
    
    exports.area = (r) => PI * r ** 2;
    
    exports.circumference = (r) => 2 * PI * r;
    
- exports = module.exports = {}
- circle.js中，为exports对象添加了area、circumference属性，导出exports对象（本质是module.exports）。
- circle.js中的变量是私有的。例如PI。
- 当你希望输出的模块不是一个对象，而是类、数组、函数等等，可以使用module.exports输出。
- 当module.exports和exports同时有输出时，以module.exports的为准。因为module.exports和exports引用的是同一个对象，nodejs最终以module.exports为准。

参考资料：
1. [modules | nodejs](https://nodejs.org/dist/latest-v8.x/docs/api/modules.html)
2. [Node.js中exports与module.exports的区别](http://weizhifeng.net/node-js-exports-vs-module-exports.html)

____

