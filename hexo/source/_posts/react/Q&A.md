# react学习的Q&A

此篇Q&A仅为我本人关于reactjs学习的自问自答，不涉及其他react的衍生库。Answer可能有错处，所以每次看的时候需勤加思考。

## 高级指引

### 为什么使用forwardRef向下传递ref，而不是直接作为props传给子组件？

常规函数和class组件不会将ref且props的参数，类似的还有key。forwardRef方法可以收到ref参数，然后将它重命名作为props参数传到被包裹的组件上。（那这个和直接将ref重命名传入被包裹的组件有什么区别吗？forwardRef能想到的优点就是使用者可以直接用ref，更符合直觉，而不用记住并使用重命名，重命名的过程交给组件的维护者。）

## HOOk

### react为什么设计了HOOK？

- 相关联的函数被迫拆分到各生命钩子里完成，例如监听器的设置和清除，不够清晰。
- class的写法不够友好，状态逻辑难以复用
- 函数组件想维护状态时，不用再强行转换成class组件

参考： [React Hooks 详解（近 1w 字）+ 项目实战](https://juejin.im/post/5dbbdbd5f265da4d4b5fe57d)

### 读取state时，其值为何被固定在它被创建的那次渲染中？

官方hooks的FAQ中提到一个问题，[为什么我会在我的函数中看到陈旧的 props 和 state ？](https://zh-hans.reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function)。我不太理解props为何会看到陈旧的，只能归为是父组件的state是陈旧的，这个state作为子组件的props，导致子组件的props是陈旧的。这样的话，其实只有一个问题，就是state是陈旧的。

官方解释中提到一句，<b>组件内部的任何函数，包括事件处理函数和 effect，都是从它被创建的那次渲染中被「看到」的</b>。没有看过react源码，只是根据[官网给出的概念](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components)来理解useState的原理。在初始时，useState创建一个变量存到react的"记忆单元格"里，每次更新时，如果已经有这个变量，则返回一个此变量的复制（值类型复制值，对象类型进行一次深拷贝?）值，否则进行初始化。react的hook组件就是一个函数，每次更新的时候都会重新执行一遍，内部定义的回调函数或者异步函数会重新创建一份，由于js的闭包性质，导致这些函数使用的都是此时的state值，不会因为后续state的更改而影响函数所使用的值。

### 为什么用useState来保存需要渲染的变量，而不是useRef?

经测试，useRef每次返回的都是同一个对象，当current改变时，不会触发组件的更新。使用useState是因为返回的值里有重新设置值的函数，当state值改变时，使用那个函数重新赋值会触发视图的重新更新。

### 如何既使用connect,又使用React.forwardRef来包装组件？

    function Components({forwardRef, ...restProps}){
        /**
        *   组件实现细节
        */
        return (
            <div ref={forwardRef}>
                {/*具体实现*/}
            </div>
        )
    }
    
    const ConnectedComponents = connect()(Components)
    export default React.forwardRef((props, ref)=>{
        return <ConnectedComponents {...props} forwardRef={ref} />
    });
    