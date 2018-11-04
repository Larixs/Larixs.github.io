## 博文记录

- [实例解析防抖动（Debouncing）和节流阀（Throttling）](https://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/)

   debounce: 连续（即两次触发间隔较短）多次（任意多次）触发同一事件，只执行一次函数。可zv 先执行，也可最后执行。

   throttle: 一段时间内，如果有多次事件触发，只执行一次函数。

   throttle与debounce的区别： throttle有时间段的限制，假如连续触发次数够多、连续时间够长，那debounce只会执行一次函数，throttle会执行多次。


- [定制lodash](http://lodash.think2011.net/custom-builds)

    步骤： 安装lodash-cli -> 通过lodash的不同命令定制lodash.js。

- [使用CSS自定义属性构建骨架屏](https://juejin.im/post/5bd07157f265da0ad221cd19)

    骨架屏的实现方案之一： css (background-image + 自定义变量) 或考虑(:empty选择器 + 伪元素)。

- [前端组件设计--位运算的妙用](https://juejin.im/post/5bd052aff265da0a857ab850)

    组件的解耦设计与巧用位运算表示多项选择（只有是或否两种选择，这样才可以用二进制的位运算）结果。

- [深入浏览器的事件循环 (GDD@2018)](https://zhuanlan.zhihu.com/p/45111890)

    macrotask(如setTimeout), requestAnimationFrame, microtask(如Promise.then)的执行流程。

- [ES6的Symbol竟然那么强大，面试中的加分点啊](https://juejin.im/post/5bdbb3406fb9a022752c319e)

  [Symbol.toPrimitive--mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)

    symbol： 通过Symbol.for创建的symbol会进入全局注册表，每次创建之前会先去表里查找；对象可以修改其[Symbol.toPrimitive]来修改获取其值的函数，有点类似于修改valueOf和toString(通过hint值判断需要转换的类型)。