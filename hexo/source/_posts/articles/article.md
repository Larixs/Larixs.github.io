## 博文记录

- [实例解析防抖动（Debouncing）和节流阀（Throttling）](https://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/)

   debounce: 连续（即两次触发间隔较短）多次（任意多次）触发同一事件，只执行一次函数。可最先执行，也可最后执行。

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

- [跨页面通信](https://github.com/ProtoTeam/blog/blob/master/201709/3.md)

    页面间通信:

    1、 window.open(搭配postMessage) / iframe 通信,

    2、 localStorage(浏览器，同域名同端口）。

    3、 sessionStorage(浏览器，同域名同端口同一会话）。从当前页面新开(window.open)的页面，会copy一份当前页面的sessionStorage，但父子页面之间sessionStorage变化不互通。

    4、 cookie。不推荐使用，因为会弄脏cookie数据并且每次发送请求时有多余的内容。

    5、 [BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel/BroadcastChannel)。与localStorage类似，生命周期更短，但[兼容性](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel/BroadcastChannel#Browser_compatibility)更差。

    6、 [SharedWorker](https://developer.mozilla.org/en-US/search?q=SharedWorker)。不是专门用来通信的，但也可以实现跨页面通信。

    7、 server。 tab被激活时请求服务器端数据；Websocket。

- [WebComponent和Polymer](http://taobaofed.org/blog/2018/10/31/a-tag/)

- [记一次 Node.js 应用内存暴涨分析](http://taobaofed.org/blog/2016/01/14/nodejs-memory-leak-analyze/)

    zelda-nuxt本地测试环境日益卡顿，竟然卡到我还没动手它就自己崩溃了。并不知道是为何导致的node内存泄漏，因为框架被包装太多层了：nuxt -> backpack -> webpack -> ...。没有太多时间去探究zelda-nuxt的病因，只能先简单粗暴地在node_modules/.bin的backpack执行程序中增大了node的最大内存。

    zelda-nuxt的崩溃，个人猜测是日益增多的业务代码导致测试环境的热更新占用越来越多的内存而导致的崩溃。不过这与我对热更新的印象不符，热更新不应该是每次只更新一部分代码，与总代码量无关吗？（只是瞎猜，还没实际去研究热更新机制）

    这篇文章提到了一种可能导致内存泄漏的原因：使用vm（virtual machine)时重复创建了释放速度很慢的变量，占用大量内存导致node程序崩溃。

    第一次读这种node和v8知识点比较多的文章，质量对我这种小白来说挺不错的。

- [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)

    简单介绍了一下虚拟DOM的实现：用js对象模拟DOM树 -> 发生变化时找出差异 -> 差异更新到真实DOM树上。

    其中差异对比算法类似于最小编辑距离（动态规划问题，时间复杂度O(m*n)），但做了相应的优化，让算法时间复杂度降到O(max(m,n))。具体实现在相关链接[合格前端系列第五弹-Virtual Dom && Diff](https://zhuanlan.zhihu.com/p/27437595)里有提到。

- [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)

    介绍了一些跨域资源共享（Cross-origin resource sharing）里常用的头信息。

- REST(REpresentational State Transfer), 表现层状态转移

    REST是一种设计风格，可以用来设计api的名称等。简单来说：

    URL里原则上只使用名词表示资源所属位置，用HTTP（GET,POST,DELETE,DETC,PATCH）方法去描述操作。并且使用HTTP Status Code传递Server的状态信息，例如200为成功，500为Server内部错误。

    例如：

        GET /v1/zoos: v1版本,列出所有动物园
        POST /v2/zoos  v2版本，新建一个动物园
        DELETE /v2/zoos v2版本，删除一个动物园

    优点：

    - 提供一套统一的接口为不同端(web，ios，android, ...)提供相同的服务。
    - URL语义化，能快速了解api作用。

    缺点：

    - 批量删除？
    - http动词太少

    相关引申：

    - RESTful api的一种特点： HATEOAS, Hypermedia as the engine of application state, 超媒体即应用状态引擎。返回结果中除了得到资源本身以外，还附带连向其他api的地址（具有连通性），使得用户不用查文档也知道下一步应该做什么。[github示例](https://api.github.com/)


    可以用到前端路由设计里来吗？

    参考：
        - [怎样用通俗的语言解释REST，以及RESTful？](https://www.zhihu.com/question/28557115)
        - [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
        - [不要被名字吓到-RESTful、HATEOAS、Spring boot之整合](https://www.jianshu.com/p/65b9e54dee7d)

