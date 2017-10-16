---
title: 学习数组
tags: [study notes, array]
categories: other
---

### 1. Array.of    (ES2015)

Array.of用于创造一个新的数组实例,类似于Array().区别在于只传一个参数的时候,Array()会解析为数组的个数,Array.of()会解析为只有一个元素的数组,其元素值为参数值。


    Array.of(1); //[1]
    Array.of(1,2,3) //[1,2,3]

### 2.类数组转数组的方法(不包含ES2015及以上的方法)

    - Array.apply(null,divs)
    - Array.prototype.slice.call(divs)/.apply(divs)
    - Array.prototype.concat.apply([],divs)
    - Array.prototype.map.call(divs,function(item){return item})


### 3.生成密集数组的方法(不包含ES2015及以上的方法)

    - Array.apply(null,{length:100})

### 4.数组的every(),some(),filter(),map(),forEach()方法,只能被已经赋值的数组元素调用。未赋值的数组元素或者已经被删除的数组元素不能调用这些方法。


### 5.初始化数组(不包含ES2015及以上的方法)

    - Array(100).join(' ').split('').map(function(){return 0})
    - Array.apply(null,{length:100}).map(function(){return 0})

### 6.Array(),push(),unshift(),concat(),slice()可通过apply或者call应用到类数组对象上。

>2是接收类数组对象,返回数组对象。
>3正是利用了2这一点,用类数组对象{length:100}生成了密集数组。
>5是在4的限制下进行的。首先要生成密集数组,然后才能调用map方法。


### 7.Array的toString()方法在Object的toString方法上被改写了。

数组调用toString()方法时,会使数组的每一个元素都调用其toString()方法,再用join()方法将其连接起来。join()的默认参数是','


    ['a','1',{b:'b'},['c','1',{b:'d'}]].toString()//"a,1,[object Object],c,1,[object Object]"

'a'.toString()=>a , '1'.toString()=>'1' , {b:'b'}.toString()=>[object Object]

['c','1',{b:'d'}].toString() => 'c,1,[object Object]'


### 8.Array的join()方法会先调用toString()方法再调用join()。









