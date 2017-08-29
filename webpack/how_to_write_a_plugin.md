# How to write a plugin
如何写一个webpack插件（译）
___
### Compiler and Compilation

####Compiler:

Compiler对象代表整个配置好的webpack环境。这个对象在webpack启动时构建一次，并且配置好了options、loaders、plugins等操作设置。 

当将插件应用于webpack环境中时，这个插件将接收这个compiler的引用。利用compiler来访问主要的webpack环境。
	
#### Compilation:

一个compilation对象代表a single build of versioned assets. 当运行webpack development middleware时，每次文件改变被监测到时，都会创建一个新的compilation，因此产生新的一组编译好的资源。 

Compilation可以提供模块资源的当前状态、编译后的assets、改变的文件和被监视的依赖。
compilation还提供许多回调点，插件可以执行自定义操作。

#### 基本的插件结构

插件是在原型上有apply方法的实例对象。apply方法在安装这个插件时，被webpack的compiler调用一次。apply方法会接收到webpack compiler的引用，这能访问到compiler的回调。

参考链接：

1. [how to write a plugin](https://github.com/webpack/docs/wiki/how-to-write-a-plugin)
2. [compiler.js](https://github.com/webpack/webpack/blob/master/lib/Compiler.js)
3. [Compilation.js](https://github.com/webpack/webpack/blob/master/lib/Compilation.js)