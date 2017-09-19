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


### require的解析路径

require支持斜杠"/"或者盘符"c:"开头的绝对路径，也支持"./"开头的相对路径。

require还支持另外一种路径，写法类似于require("module")。这种写法，node会按照一下规则解析路径，直到找到模块的位置为止：

1. 寻找内置模块
   
   如果传递给require函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如require('fs')。
   
2. 寻找node_modules目录
   
   例如某个模块的绝对路径是/home/user/hello.js，在该模块中使用require('foo/bar')方式加载模块时，则NodeJS依次尝试使用以下路径。
   
        /home/user/node_modules/foo/bar         //同级目录
        /home/node_modules/foo/bar              //上一级目录
        /node_modules/foo/bar                   //根目录
  
  从例子中可以看出，nodejs会从当前同级目录下开始寻找，在没找到的情况下逐级往上寻找，直到找到模块或者寻找到根目录为止。
  
3. NODE_PATH环境变量

    与PATH环境变量类似，NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径。NODE_PATH环境变量中包含一到多个目录路径，路径之间在Linux下使用:分隔，在Windows下使用;分隔。例如定义了以下NODE_PATH环境变量：
    
   NODE_PATH=/home/user/lib:/home/lib
   
   当使用require('foo/bar')的方式加载模块时，则NodeJS依次尝试以下路径。

        /home/user/lib/foo/bar
        
        /home/lib/foo/bar
        
参考链接：
1. [7天学会nodejs--模块路径解析规则](http://nqdeng.github.io/7-days-nodejs/#2.1)