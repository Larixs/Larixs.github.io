---
title: Dynamic import
tags: [ES6,dynamic modules]
categories: ES6
---
如何异步引入模块(译)

___

###1、 ES 的modules模块都是静态引入的
引入方式：

	import * as someModule from './dir/someModule.js';
	
首先，import 声明需要在顶部出现，这是为了防止你在if表达式或者其他handler里import模块。

其次， module specifier './dir/someModule.js'是写死的，你不能在运行的时候才获得准确的值（比如通过函数调用来返回）。

###2、 如何实现动态引入模块(dynamic module imports)
	
动态引入方式如下：
	
	const moduleSpecifier = './dir/someModule.js';
	import(moduleSpecifier).then(someModule => someModule.foo());
	
这个操作更像一个函数。这种引入方式和上面import的方式不一样的点在于：
- Module specifier 不再是写死的字符串了，可以是任何能够返回字符串的表达式。
- 这种引入返回的是一个promise. 一旦module加载完成，那么Promise就算完成了。（意思即为触发resolve）

###3、 用处

参考文章里提到有三种用处

    a. 按需加载
    b. 条件加载模块
    c. 计算module specifiers

个人觉得这三种用处都是一样的，最终目的都是按需加载，需要什么，再去动态地加载什么。

###4、 Tips

a. obj的解析语法可以帮助访问module的exports

    import('./myModule.js')
    .then(({export1, export2}) => {
        ···
    });
    
b. 访问default exports。可以通过点操作符访问，不能通过解析语法访问default。

    import('./myModule.js')
    .then(myModule => {
        console.log(myModule.default);
    });

c. 动态加载多个模块

    Promise.all([
        import('./module1.js'),
        import('./module2.js'),
        import('./module3.js'),
    ])
    .then(([module1, module2, module3]) => {
        ···
    });
    
d. Async函数和import()

Import()返回的是promise，正好可以配合async使用。
	
	async function main() {
    const myModule = await import('./myModule.js');
		const {export1, export2} = await import('./myModule.js');
		const [module1, module2, module3] =
        await Promise.all([
            import('./module1.js'),
            import('./module2.js'),
            import('./module3.js'),
        ]);
    }
    main();

###5、 import()支持
	
- Node.js: node-es-module-loader

- Webpack v1: babel-plugin=dynamic-import-webpack将import()转化为require.ensure()

- Webpack v2:  通过 import() 支持code splitting 


参考链接: [ES proposal: import() – dynamically importing ES modules](http://2ality.com/2017/01/import-operator.html)
