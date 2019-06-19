---
title:
categories: 偏函数应用，柯里化，bind函数
tags: [ES]
---

## 偏函数应用

partially applied function，个人觉得更贴切的名字应该是部分函数应用。偏函数应用经常被简称为偏函数。

偏函数应用是先将函数的某些参数固定下来，返回一个带固定参数的函数。剩下的参数在使用的过程中再传入。

例如固定fn的a参数

    fn(a,b,c) => partial(b,c) // partial里面存了a

### 实际应用

当参数大于1个时，某些情况下，在多次调用时，其中某些参数是保持不变的，这是我们可以使用偏函数来固定其中的参数，在使用时更加方便。
例如将字符串转化为多种进制时,如果要大量转化二进制，那么就可以通过固定进制类型来简化调用。

### js自己实现一个

固定前几位：

    function partialFactory(fn, ...pArg){
        return function(...arg) {
            return fn(...pArg, ...arg);
        }
    }
    const test = function(a,b,c){
        return a * b * c;
    }
    const p = partialFactory(2);
    p(3, 4) // 24
    p(3, 4, 5) // 24 多余的参数会忽略

假如转化二进制，固定指定的参数

    function partialParseInt() {
        return function(val) {
            return parseInt(val, 2)
        }
    }
    const p = partialParseInt();
    p('010101');

## 柯里化

currying。 把接收多参的函数转化成可以逐个调用单个参数并返回接收剩下参数的函数。fn(a,b,c) => curring(a)(b)(c)

### 实际应用

### js自己实现一个

    function curry(fn){
        return function(a){
            return function(b){
                return function(c){
                    return fn(a,b,c)
                };
            }
        }
    }

    const sum = function(a, b){
        return a + b;
    }

    const c = curry(sum);
    c(2)(3)(4) // 24

## bind

ES语法，返回一个原函数的拷贝，并拥有指定的this值和初始参数。

### 参数

> function.bind(thisArg[, arg1[, arg2[, ...]]])

thisArg是想要绑定的this值

arg1,arg2等等参数是想固定在函数里的参数，可以理解为生成一个固定参数arg1,arg2的``偏函数``吧。

### js自己实现一个

    // 只是为了加深理解, 实现一个简单的bind，和原生bind有差异。一切特性以原生bind为准。
    function bind(fn, thisArg, ...args){
        return function(...args2){
            fn.apply(thisArg, args.concat(args2));
        }
    }

    const test = {
        a: 'test'
    };
    var a = 'window';
    const fn = function(str1, str2){
        console.log(str1 + str2 + this.a);
    }
    fn('no bind: ', 'this is '); // 'no bind: this is window'
    const bindFn = bind(fn, test, 'bind: ');
    bindFn('this is ') // 'bind: this is test';
    bindFn('that is ') // 'bind: that is test';

## 柯里化与偏函数

柯里化可以生成偏函数

### '高级'柯里化实现（每次不仅限于只调用1个参数）

实现一个更为通用的柯里化工厂函数：（例子和代码来自[柯里化和偏函数](https://zh.javascript.info/currying-partials)）


    function curry(fn){
        return function curried(...args) {
            if(args.length === fn.length){
                return fn.apply(this, args);
            }else {
                return function(...args2){
                    return curried.apply(this, args.concat(args2));
                }
            }
        }
    }

    function sum(a, b, c) {
      return a + b + c;
    }

    let curriedSum = curry(sum);

    // 依然可以被正常调用
    console.log( curriedSum(1, 2, 3) ); // 6

    // 得到 curried(1) 的偏函数，然后用另外两个参数调用它
    console.log( curriedSum(1)(2,3) ); // 6

    // 完全柯里化形式
    console.log( curriedSum(1)(2)(3) ); // 6


## 参考

- [偏函数](https://www.jianshu.com/p/053d195f0b1b)
- [偏函数 vs 部分应用函数 vs 柯里化](http://songkun.me/2018/05/16/scala-partialfunction-partially-applied-function-currying/)
- [柯里化和偏函数](https://zh.javascript.info/currying-partials)(推荐阅读)
- [Function.prototype.bind()
-mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
