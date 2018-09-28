---
title: SSR(Server-Side Rendering) + vue
tags: [study notes]
categories: ssr
---

公司最近的pc站要用SSR了，陆哥先行学习了一把，我也得跟着学一学，不然咋开发呢。（听说天津下雪了而北京就只是冷而已

什么是SSR
----------

Q1：服务器端渲染的是哪一部分，服务器怎么知道它该渲染哪一部分，那剩下的部分会以什么形式返回给客户端呢？

A:  服务器端只渲染在服务器端写好的vue部分，渲染出来的字符串，通过模板html里的

    <!--vue-ssr-outlet-->

确定字符串被插入的位置。然后服务器返回模板加字符串之后的结果给客户端。

Q2：服务器端是什么时候渲染呢，接到请求才开始渲染，还是预先会渲染好，然后一直储存呢？

SSR的优缺点
----------

SSR Introduction再三强调，要确认SSR是否是符合自己需求的，要慎重选择。这侧面说明SSR的缺点在某些方面的影响会很大。

优点：

1. 利于SEO。搜索引擎不会等待网页完全完成才开始爬取，通过ajax请求返回的内容就有可能不被搜索引擎的爬虫爬取。如果服务器端能直接返回带有内容的网页，那肯定是利于SEO的。
2. 更快的展示内容(time-to-content)。在网络环境或者设备较差的情况下，能更快展示内容，提高用户体验。

缺点：

1. 开发环境受限。
2. 构建和部署会有更多要求。
3. 服务器端负载加大。

如果SSR带来的优势并不大，那用SSR就是overkill。（Introduction着重提了使用者是否看重time-to-content)。

就公司的pc站而言，利于seo听起来不错，尤其是用于资讯页和产品页。time-to-content并不是很重要。SSR的缺点目前还不了解，不知道会带来多大负担。

编写通用代码
----------

编写在客户端和服务器端都能运行的代码的注意事项：

1. 响应式对象在服务器上，大部分情况下是多余的。

    因为服务器端在渲染之前就已经预取数据了，这时就不需要响应式对象了。

2. 生命钩子的变化。

    由于没有动态更新，所以只有**beforeCreate**和**created**会被调用。

    因此会带来全局副作用的事件也不要往beforeCreate和created里放，应该放在beforeMount或者mounted。例如在created里setInterval，而在beforeDestroy里清除setInterval，这在服务端是行不通的，服务器压根不调beforeDestroy，意味着setInterval并不会清除。（为啥mounted都不调用了呢？难道vue是一口气把所有字符串都编译出来？并不是先编译子组件字符串，然后把子组件字符串插入父组件？）

3. 平台的API变化。

    在服务器端，你是访问不到window或者document等全局对象的。很简单，就是因为渲染的环境不同。

    因此最好将平台API的实现放在一个通用api里，或者找一个库来做这件事。譬如axios，它为服务器端和客户端提供的接口名称都是一样的。

    对于浏览器端的api，常用的解决办法就是把他们放在只有浏览器才能访问到的lifecycle hooks里。

4. 自定义指令

    多数自定义指令直接操作DOM，但这样在SSR里就会报错。目前有两种解决方法(ssr introduction)：

    1. 推荐使用组件作为抽象机制，并运行在「虚拟 DOM 层级(Virtual-DOM level)」（例如，使用渲染函数(render function)）
    2. 如果你有一个自定义指令，但是不是很容易替换为组件，则可以在创建服务器 renderer 时，使用 directives 选项所提供"服务器端版本(server-side version)"

源码结构
----
1.  避免状态单例(singleton)

    在node.js里生成的实例应该避免生成共享的实例(除非你真的确认它应该共享)。因为node.js会长期运行，一旦生成了实例，不主动销毁的话，它就会一直存在内存里。例如服务器端返回的vue根实例就不应该是单例，因为服务器需要在每次收到请求时都返回新的实例，否则容易造成状态和请求的交叉污染。

    解决办法：工厂模式产生实例。

路由和代码分割
-------

router：

1. 避免stateful singleton
2. 要等router的异步组件和钩子都准备好之后，服务器端才能返回html。

code-splitting:

代码分割和懒加载能帮助你在首屏加载时减少下载的资源数，提升加载效率。关键就是“加载你所需要的东西”。

不管在客户端还是服务端，都有必要用router.onReady，因为router一定要提前(ahead of time)加载路由组件，以便正确调用组件钩子。

Data Pre-Fetching and State
---------------------------

SSR中，在进行渲染进程之前，需要预取数据。而客户端在取数据的时候，也应该取到一样的数据。

caveats:

1. 在路由组件里负责预取数据的函数，是拿不到this的。因为取数据的时候，组件还没有被实例化。

Problems with Basic SSR
-----------------------

基础的SSR无法热更新，Node.js本身也不支持source map。 gg思密达，每次修改服务器端的代码都得重启一次。

为了解决热更新的问题， vue-server-renderer提供一个名为createBundleRenderer的API。


20180315 技术分享
-------------

昨天陆哥做了一次ssr的技术分享，引发了非常多的讨论，主要在于以下几点:

1. ssr的优势是seo和一些time-to-content的加速，但是劣势就是需要服务器提前渲染，这对服务器压力较大，且相对于传统spa来说，能够缓存的东西就更少了。 ssr的优势是否能完全抵消劣势？
2. 学长提出的，关于node层面的东西，例如node层无cookie处理头，node该如何抗住大量访问？（个人对这个问题还有点感兴趣）
3. time-to-content的加速主要在于node层面与服务器通信比终端与服务器通信更快。 但是在首屏加载时，如果api返回过慢，那么ssr的页面则会白屏直到服务器端渲染完毕并返回，而spa页面至少可以返回一个带loading的基础页面。
4. spa的seo问题比较严重。

个人的疑问：
1. ssr带来的服务器压力有大，怎么计算服务器能够承受的极限? 虽然说可以用钱买服务器，钱能解决的问题都不是问题，可是没有任何测试会令我有一丝不安。
2. ssr有办法做到缓存吗，有什么样的缓存机制? 能承担多少缓存？
3. node作为服务器中间层可能带来的问题。关于node我了解的实在是太少了。
4. seo需要的信息量究竟有多大? tdk不能满足吗？


缓存机制
----

页面级别的缓存：

用[micro-caching](https://www.nginx.com/blog/benefits-of-microcaching-nginx/)可以做页面级别的缓存。

是否进行页面缓存，在node层面的server里去判断和处理。

适用范围： 对于不同用户及不同状态都展示同样内容的页面。

——————————

组件级别的缓存：

用[lur-cache](https://github.com/isaacs/node-lru-cache)可以做组件级别的缓存。

是否进行组件缓存，是通过组件的**serverCacheKey**进行判断。需要进行缓存的组件，必须要有一个独一无二的name。当
serverCacheKey的值是一样的，则使用缓存，否则重新渲染。一些静态组件可以让serverCacheKey返回一个常量。

适用范围：

1. 子组件不依赖全局状态
2. 子组件对渲染context没有副作用。


nuxt.js
-------

The Nuxt.js is similar to [Next.js](https://zeit.co/blog/next)

参考链接：

1.[SSR Introduction](https://ssr.vuejs.org/en/)
2.[Nuxt.js](https://nuxtjs.org/guide)