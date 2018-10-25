## 博文记录

- [实例解析防抖动（Debouncing）和节流阀（Throttling）](https://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/)

   debounce: 连续（即两次触发间隔较短）多次（任意多次）触发同一事件，只执行一次函数。可zv 先执行，也可最后执行。

   throttle: 一段时间内，如果有多次事件触发，只执行一次函数。

   throttle与debounce的区别： throttle有时间段的限制，假如连续触发次数够多、连续时间够长，那debounce只会执行一次函数，throttle会执行多次。


- [定制lodash](http://lodash.think2011.net/custom-builds)

    步骤： 安装lodash-cli -> 通过lodash的不同命令定制lodash.js。