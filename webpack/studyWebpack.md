
## 为什么要使用webpack

worse environment

- 假设你在页面中引入了外部script文件（即不是自己编写的文件），如jquery，当jquery链接失效或者引入顺序错误，那么整个页面就不会正常使用。

- 假设你引入了一个依赖，但是从未使用，这样加载大量不必要的代码显然是不科学的。


通过说明模块的依赖关系，webpack可以构建依赖关系图，然后根据此图生成优化的bundle，让脚本可以以正确顺序运行。此时，未使用的依赖不会被包含在bundle中。

## Loaders

webpack将所有文件（包括css、html、scss等等）都当做模块，但是webpack只识别js。

Loaders 将这些文件转化为模块，这样webpack才可以将它们加入依赖视图。

因此Loaders主要有两个作用：

- 通过特定的loader识别需要转化的文件

- 转化文件，这样才能将它们加入依赖视图。

示例：

    const config = {
      entry: './path/to/my/entry/file.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
      },
      module: {
        rules: [
          {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]
      }
    };
    module.exports = config;
    
在module.rules下设置loader，示例中的loader只有一个，它的意思是：

“嗨webpack，当你在require()/import声明中遇到文件后缀为.js或者.jsx的文件时，先使用（use）babel-loader转化这个文件，再将其添加到bundle中。

[添加loaders的三种方法](https://webpack.js.org/concepts/loaders/)


## Plugins

插件可以帮助你管理webpack的compile流程，比loader强大得多。

插件是webpack的核心。webpack本身的构建体系和你在webpack配置中使用的插件是同一个插件体系。插件可以提供loader所不能提供的其他任何功能。（They also serve the purpose of doing anything else that a loader cannot do.）

添加plugin有两个方法，一个是通过配置文件，一个是通过Node API。

在webpack源码中还有很多自由添加plugin的示例。

[添加plugin的方法](https://webpack.js.org/concepts/plugins/)


学习资料：

[webpack2官方教程](https://webpack.js.org/concepts/)