# redux学习笔记

标签（空格分隔）： redux

---

### 三大原则
    
*  单一数据源。   整个应用的state被储存在一棵object tree中，并且这个object tree只存在于唯一一个store中。
*  state是只读的。 唯一改变state的方法就是触发action。
*  使用纯函数来执行修改。

```seq

store(object tree)-->App:(nextState) update
Note left of store(object tree):reducer(preState,action)->nextState
```

q：action是谁发送的？



###Actions

action只负责描述**事件变化**。

actions是store **唯一**的数据来源。由application通过store.dispatch() 方法发给store。
action需要尽量小。


###Action Creators (action创建函数)
不包含dispatch，只负责返回action。

###Reducers

reducer负责决定**app的state该如何更新**。

reducer(previousState,action) => newState

首先解释“纯净”的意思：只要传入的参数相同、返回计算得到的值一定相同。

为了保持reducer的纯净，永远不要在reducer里做以下操作：

*   修改arguments
*   调用不纯净的函数，例如Date.now()、Math.random()
*   执行有副作用（哪些副作用？）的函数，例如API请求和路由跳转

reducer一定要保持纯净。**只要传入参数相同，返回计算得到的下一个state就一定相同。没有特殊情况、没有副作用，没有api请求，没有变量修改，单纯执行计算。**

tips：

*   不要修改state。可以用object.assign({}，state,action)来返回新的state，但是千万不要修改state。
*   在default情况下返回旧的state，避免未知action引起的错误。


###Store

Store的职责：

*   保存应用的state
*   提供getState()方法访问state
*   提供dispatch方法更新state
*   通过subscribe(listener)注册监听器(监听啥？）
*   通过subscribe(listener)的返回函数来注销监听器

### Data Flow （strict unidirectional data flow )

**严格的单向数据流**

数据的生命周期：
1.  调用store.dispatch(action)
2.  store调用你之前赋给它的reducer函数
3.  根reducer应该将多个子reducer的输出合并为一个单一的state树
4.  store存储根reducer返回的整个state树。





