#静态成员(class,static)


----------


###静态方法


**静态方法不可以被实例继承，可以被子类继承。**

写法：
```javascript
//es6
class A {
    //A.eat()
    static eat(){
        return 'eat';
    }
}
    
```

继承演示：
```javascript
class A{
  static eat(){
    console.log('eat');
    return ;
  }
  constructor(a){
    this.a = a;
  }
}

class B extends A{
  constructor(props){
    super(props);
  }
}

const a = new A(1);
const b = new B(2);
A.eat();//'eat'
a.eat();//error : a.eat() is not a function
B.eat();//'eat'
b.eat();//error : b.eat() is not a function
```


----------


###静态属性

静态属性是指class本身的属性，及class.prop，而不是定义在实例对象（this）上的属性。即不能通过this调用，只能通过类名class调用。

**静态属性不可以被实例继承，可以被子类继承。**

写法:
```javascript
//es6 明确规定只有静态方法，没有静态属性，因此只能如此定义静态属性
    class A {
    //通过A.obj调用
        obj:{
            x = 3,
            y = 4
        }
    
    }
    
```

```javascript
//es7 有静态属性的提案，目前babel已支持转码.


//实例属性写法
    class A {
    //在A内部通过this.obj调用
        obj = {
            x = 3,
            y = 4
        };
    
    }

//静态属性写法
    class A {
    //通过A.obj调用
        static obj = {
            x = 3,
            y = 4
        };
    }
    
```

继承演示
``` javascript
class A{
  static str = 'fun' ;

  constructor(a,b){
    this.a = a;
    this.b = b;
  }
}
class B extends A{
  constructor(...props){
    super(...props);
  }
}
const a = new A(1,22);
const b = new B(2,22);

console.log(A.str);//'fun'
console.log(a.str);//undefined
console.log(B.str);//'fun'
console.log(b.str);//undefined

```


----------


##总结：
1.  静态成员定义在类本身上，而不是this上。因此可以通过类名调用而不可以通过this调用。  

2.  静态成员，包括静态方法和静态属性，不可以被实例继承，但是可以被子类继承。