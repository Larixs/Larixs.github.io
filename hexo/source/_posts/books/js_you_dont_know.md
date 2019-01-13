---
title: 你不知道的Javascript
tags: [ES]
categories: books
---

# 上卷 (scope & closures & this & object prototypes)

## part1, scope and closures

### scope

1. 参与编译的部分：

- 引擎： 从头到尾负责整个js程序的编译及执行过程。
- 编译器： 负责语法分析及代码生成。
- 作用域： 收集并维护所有声明的标识符（变量），确定当前执行的代码对这些标识符的访问权限。

2. 遇到变量时的简要编译运行过程：

    ``var a = 2;``

    编译器将程序分解并解析成一个抽象语法树（AST），遇到var a时，会先询问作用域是否有一个该名称的变量存在同一个作用域的*集合*中。如果有，则忽略该声明，继续进行编译，否则会要求作用域在当前作用域的*集合*中声明一个新的变量， 并命名为a。

    引擎运行a = 2时，会先询问作用域变量是否存在，如果是，引擎就会使用这个变量，否则继续往上查找。

3. LHS、RHS

   获取变量的值使用的是RHS，为变量赋值（或者说是获得变量的指针？）是用的LHS。 函数声明不会触发LHS。在非严格模式下，LHS在作用域的顶层（即全局作用域）也找不到变量时，全局作用域会创建一个具有该名称的变量并返给引擎。


4. 作用域嵌套

    引擎在当前作用域找不到对应变量时，就会继续向外层作用域查找，直到找到变量或者到达最外层作用域。

    综合示例：

            function test(str){  // 函数传参时有个隐形变量分配，触发LHS。
                var a = str;  // 编译器在test作用域内声明变量a，引擎触发RHS查找str的值，触发LHS为变量a赋值。
                b = a; // 因为没有var这个声明符，所以在编译器没有在test作用域内声明变量b。
                       // 引擎运行时，触发RHS查找a的值，触发LHS查找b。LHS在test作用域内没有找到b，便向外层查找，直到全局作用域。全局作用域也没有变量b，在非严格模式下，全局作用域创建了一个全局变量b，并返回给引擎。
            }

            test('hello world');  // RHS查找函数。
            console.log(b); // b >> 'hello world'

5. 欺骗词法

    欺骗词法是指运行时“修改”（或者说欺骗）词法作用域，典型的有eval和with。

    弊端：

    - 由于作用域的不确定性，影响编译器的优化。
    - 在严格模式下会限制或者禁止欺骗词法。
    - 代码可读性下降。

6. 函数作用域与块作用域

    定义不赘述。

    注： for循环里如果for的循环变量是声明的let变量，则每次进入循环的时候，都会**重新**绑定到每一个迭代中。

    加上闭包概念的典型示例：

        for(let i = 1; i <= 5; i++) {
            setTimeout(function timer(){
                console.log(i);
            }, i*1000);
        } // 输出1,2,3,4,5

        for (var j = 1; j <= 5; j++){
            setTimeout(function timer(){
                console.log(j);
            }, j*1000);
        } // 输出6,6,6,6,6

7. 提升

    - 函数声明会首先被提升。
    - 变量var存在变量声明提升，而let不存在变量声明提升。

    变量var声明提升示例：

        console.log(a); // undefined
        var a;

        console.log(c); // Uncaught ReferenceError: c is not defined;

        console.log(b); // Uncaught ReferenceError: b is not defined;
        let b;

    原理：

    - 编译器在读取``console.log(a); var a;``时，因为有var声明符，所以编译器会先在当前作用域创建一个变量a，值为undefined。引擎再读取时，存在该变量a，但是该变量取值为undefined。因此打印"undefined"。
    - ``console.log(c);``没有变量声明，编译器也不会提前创建一个相关变量，所以引擎使用时会找不到变量而报错。
    - let声明符与var表现不同，没有提升的作用。

### closures

   函数在定义时的词法作用域以外的地方被调用，且此时可以继续访问定义时的词法作用域，该行为称之为闭包。

   示例

        function foo(){
            var a = 2;
            function bar(){
                console.log(a);
            }
            return bar;
        }
        var baz = foo();  // baz也是对bar函数的引用。
        baz(); // 2。通过闭包访问到了foo内部的变量a

## part2, this

this是在运行时进行绑定的，并不是在编写时绑定。this的上下文取决于函数调用时的各种条件，和函数声明的位置没有任何关系，只取决于函数的调用方式。

1. 默认绑定：
    **非严格模式**下，this默认绑定到全局对象。严格模式下，全局对象无法使用默认绑定，this会绑定到undefined。

2. 隐式绑定：
    当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。

    简单示例：

        function foo() {
            console.log( this.a );
        }
        var obj = {
        a: 2,
        foo: foo
        };
        obj.foo(); // 2

3. 隐式丢失：
    当为一个绑定了上下文的函数创建一个新的别名时，此时通过新别名调用函数，可能会丢失this对象。注意，参数传递其实也是一种隐形赋值，所以函数在作为参数传递的过程中，容易丢失this对象而使用默认绑定。

    简单示例：

        function foo() {
            console.log( this.a );
        }
        var obj = {
            a: 2,
            foo: foo
        };
        var bar = obj.foo; // 函数别名！
        var a = "oops, global"; // a 是全局对象的属性
        bar(); // "oops, global" // 丢失了绑定的obj上下文

4. 显式绑定：

    - 硬绑定：call, apply, bind

    - api调用的"上下文"

        简单示例：

            function foo(el) {
                console.log( el, this.id );
            }
            var obj = {
                id: "awesome"
            }; // 调用 foo(..) 时把 this 绑定到 obj [1, 2, 3].forEach( foo, obj );
            // 1 awesome 2 awesome 3 awesome

5. new 绑定

    javascript实际上不存在所谓的"构造函数"，只有对于函数的"构造调用"。

    构造函数调用时的操作：
    
    1. 创建一个全新对象。
    
    2. 对这个新对象执行"原型"连接。

    3. 函数里的this会指向这个新对象（原译文：'这个新对象会绑定到函数调用的this。'，感觉原译文有点奇怪，此项为自行理解的内容）。
    
    4. 执行函数。如果函数没有其他返回对象，那么new表达式中的函数调用会自动返回这个新对象。

6. 优先级

    new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定

7. 箭头函数

    箭头函数会捕获所在外部函数被调用时的当时环境，并绑定该环境的this。箭头函数的绑定无法被修改。

## part3, object

对象的属性名永远都是字符串。如果使用了string(字面量)以外的其他值作为属性名，那它首先会使用该值的toString方法被转化成一个字符串。

### 不变性

1. 创建对象常量：
    
    结合属性描述符writable: false, configurable: false就可以创建一个真正的常量属性（无法修改、重定义或者删除）。

2. 禁止扩展

    禁止一个对象添加新属性并保留已有属性：

    Object.preventExtensions(myObject);
    
3. 密封

    禁止添加新属性并且不可删除、重新配置已有的属性。
    
    即在一个现有对象上调用 Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false 。
    
    Object.seal(myObject);
    
4. 冻结

    禁止添加新属性并且不可修改、删除、重新配置已有属性。
    
    即在一个现有对象上调用 Object.seal(..) 并把所有“数据访问”属性标记为 writable:false。
    
    Object.freeze(myObject);
    
### 遍历

可以使用@@iterator对象和它的next()方法遍历数据值（而非属性名）。

## part4、 混合对象类




