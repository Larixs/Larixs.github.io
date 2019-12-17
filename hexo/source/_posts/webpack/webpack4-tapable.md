---
title: webpack4-tapable
tags: [study notes]
categories: webpack
---

阅读webpack源码，你能轻松发现Compiler里注册了大量hooks，他们都是使用了tapable进行管理。

[tapable官方网址](https://github.com/webpack/tapable)

compiler结合tapable管理钩子函数的最简流程如下：

生成一个compiler实例 -\> 在这个实例上用tapable的tap方法在相应的钩子上挂载函数 -\> 开始compiler的生命周期，并执行对应生命周期上挂载的所有钩子函数

    const { SyncHook } = require('tapable');
    
    class Compiler {
      constructor() {
        this.hooks = {
          life: new SyncHook(['compilation']), 
          // 声明一个类型为SyncHook、名字为life的hook。
          // 'compilation'是调用hook时会传入的形参。
        };
      }
    
      run() {
        this.hooks.life.call('I\'m running!'); 
        // 以"I'm running"作为真实参数传入挂载到life钩子上的所有函数并运行
      }
    
    }
    
    function createCompiler({ plugin }) {
      const compiler = new Compiler();
      if (typeof plugin === 'function') {
        myPlugin(compiler);
      }
      return compiler;
    }
    
    const myPlugin = function(compiler) {
      compiler.hooks.life.tap('plugin1', str => console.log(`plugin111: ${str}`));
      compiler.hooks.life.tap('plugin2', str => console.log(`plugin222: ${str}`));
    };
    const myCompiler = new createCompiler({ plugin: myPlugin });
    
    myCompiler.run();
    
    // 生成compiler 
    // -> 在life上挂载了plugin1、plugin2函数
    // -> 执行compiler.run，触发life，将'I\'m running!'作为参数传入plugin1、plugin2


### 参考

1. [这才是官方的tapable中文文档](https://segmentfault.com/a/1190000017420937)
2. [显微镜下的webpack4：灵魂tapable，终于搞懂钩子系列！](http://www.imooc.com/article/260336)