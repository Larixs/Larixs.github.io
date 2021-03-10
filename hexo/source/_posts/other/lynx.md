---
title: lynx
tags: [lynx dsl]
categories: other
---

## DSL
DSL(domain-specific language) 领域专用语言，释义可以参考
[开发者需要了解的领域特定语言（DSL）](https://juejin.cn/post/6844904082428149773)

lynx以小程序的dsl作为上层语言进行设计。

## lynx

分为视图层（ttml, ttss)和逻辑层(js, json)。视图层用于页面渲染，运行在主线程（UI线程）上。逻辑层运行在js线程上。

视图层到逻辑层的通信方式：事件系统，包含用户行为事件和动画事件。

组件对应 ttss 文件的样式，只对组件 ttml 内的节点生效，这一点与卡片相同，整个卡片解决方案是不支持样式继承特性的。

优势：
- RN是在js运行时去创建、更新dom节点，js虚拟机承担了大部分工作。 lynx将dom节点构建（那更新呢？）全部放在native层，js运行业务逻辑，不影响ui展示。
- lynx在打包时会将前端ttml代码和data编译成一个模板指令（用于生成视图的指令）下发到native，这样首屏渲染的一部分工作就分担到打包过程中了；运行时再反向绑定执行的js脚本，建立与前端的联系，保证前端业务逻辑的执行。
- 足够轻量（？保持怀疑，现在打包还有很大的优化空间）


## react-lynx

getJSModule GlobalEventEmitter ?
 
事件的冒泡与否如何定义，lynx是使用bind和catch作为事件前缀进行划分