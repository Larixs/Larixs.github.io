# react学习的Q&A

此篇Q&A仅为我本人关于reactjs学习的自问自答，不涉及其他react的衍生库。Answer可能有错处，所以每次看的时候需勤加思考。

## HOOk

### 读取state时，其值为何被固定在它被创建的哪次渲染中？

官方hooks的FAQ中提到一个问题，[为什么我会在我的函数中看到陈旧的 props 和 state ？](https://zh-hans.reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function)。我不太理解props为何会看到陈旧的，只能归为是父组件的state是陈旧的，这个state作为子组件的props，导致子组件的props是陈旧的。这样的话，其实只有一个问题，就是state是陈旧的。

官方解释中提到一句，<b>组件内部的任何函数，包括事件处理函数和 effect，都是从它被创建的那次渲染中被「看到」的</b>。没有看过react源码，只是根据官网给出的概念来理解useState的原理。在初始时，useState创建一个变量存到react生成的组件的某个私有变量里，每次更新时，如果已经有这个变量，则返回一个次变量的复制（值类型复制值，对象类型进行一次深拷贝?）值，否则新建一个。react的hook组件就是一个函数，每次更新的时候都会重新执行一遍，内部定义的回调函数或者异步函数会重新创建一份，由于js的闭包性质，导致这些函数使用的都是此时的state值，不会因为后续state的更改而影响函数所使用的值。

### 为什么用useState来保存需要渲染的变量，而不是useRef?

经测试，useRef每次返回的都是同一个对象，当current改变时，不会触发组件的更新。使用useState是因为返回的值里用重新设置的函数，那个函数会触发视图的重新更新。

