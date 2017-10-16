---
title: css模块化
tags: [front-end engineering, css module]
categories: react
---

# CSSModule  css模块化

	传统的css提倡与html分离开，便于管理且可移植性强。
	react的css提倡模块化管理,将css嵌入到js中，这样不会污染到全局。

### 如何实现：
参考链接：http://blog.csdn.net/kun5706947/article/details/52596766
#### 1.使用style-loader和css-loader将css嵌入到js中

webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

#### 2.使用CSS modules处理，避免全局污染

CSS modules 的技术就意在把JS的模块化思想带入CSS中来，通过CSS模块，所有的类名，动画名默认都只作用于当前模块。
Webpack从一开始就对CSS模块化提供了支持，在CSS loader中进行配置后，你所需要做的一切就是把”modules“传递都所需要的地方，然后就可以直接把CSS的类名传递到组件的代码中，且这样做只对当前组件有效，不必担心在不同的模块中具有相同的类名可能会造成的问题。

### 初学踩坑

1.在react组件内引入css时，组件中的className需要通过引入的样式来声明，如果直接声明，那么css中相应的样式就不会起效。
原因: css modules为了防止全局污染，会把css文件中的类名换为hash值，即原类名不存在，只能通过相应的hash值取得样式。

比如：

在ListItem中引入style，在控制台中输出style是这样的：

[style的输出](http://img.blog.csdn.net/20161126172051636)

userImg是一个类名，它在js中最后被替换为'_1Mg9kL_n3wNMjzfPVvifCV'，userImg不再存在。如果在组件中写userImg的话，那最终是没有对应的样式的。因此我们只能通过sytle.userImg取得'_1Mg9kL_n3wNMjzfPVvifCV'来获取相应的样式。

	//wrong
	import style from './ListItem.css';

	class ListItem extends React.Component{
	    render(){
	        var msg = this.props.msg;
	        return(
	            <li>
	                <div className='userImg'>
	                    <img src={msg.img}/>
	                </div>
	            </li>
	        );
	    }
	}

	//right
	import style from './ListItem.css';

	class ListItem extends React.Component{
	    render(){
	        var msg = this.props.msg;
	        return(
	            <li>
	                <div className={style.userImg}>
	                    <img src={msg.img}/>
	                </div>
	            </li>
	        );
	    }
	}