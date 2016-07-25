# CSS布局

作为一名小白，在刚会制作网页的时候，遇到了不少问题。先把这些遇到的问题和解决方案总结一下，以后用时方便查找。

## 1. 清除浮动

当子元素处于浮动状态时，因为子元素脱离了文档流，所以父元素的高度或宽度不能完全包含子元素，产生了溢出。此时父元素就需要清除浮动，让父元素的高度和宽度能与子元素的相匹配。
清除浮动的解决方案：

解决方案1

	.clearfix {
	    overflow: auto;
 		zoom: 1;
 	}


解决方案2(亲测可用)

	.clearfix{
		overflow:hidden;
		zoom:1;
	}
		
解决方案3

	.clearfix::after{
		content:'';
		display:block;
		clear:both;
	}
		
## 2. 居中

居中分为：

1. 水平居中
2. 垂直居中
3. 水平垂直居中

####水平居中的方法：

解决方案1(flex)

	.father{
		display:flex;
		justify-content:center;
	}
		
解决方案2(text-align)

	.father{
		text-align:center;
	}
	.children{
		margin: 0 auto;//只要左右边距是auto就行了
		width: 200px; //如果不设置width的话，看不出居中的效果
	}
	
解决方案3(margin-left)
	
	.father{
		position:relative;
	}
	.children{
		position:absolute;
		left:50%;
		margin-left:-150px;//margin-left的绝对值设为width的一半
		width:300px;
	}
	

####垂直居中的方法：

解决方案1(flex)

	.father{
		display:flex;
  		flex-direction:column;
		justify-content:center;
	}

解决方案2(margin-top)

	.father{
		position:relative;
	}
	.children{
		position:absolute;
		top:50%;
		margin-top:-100px;//margin-top的绝对值设为height的一半
		height:200px;
	}
	
#### 水平垂直居中

解决方案1（flex）
	
	.father{
		display:flex;
	}
	.children{
		margin:auto;
	}
	
解决方案2（margin）

	.father{
		position:relative;
	}
	.children{
		position:absolute;
		top:50%;
		left:50%;
		margin-top:-200px;
		margin-left:-100px;
		width:200px;
		height:400px;
	}
	

#### 参考链接：
[flex布局](https://segmentfault.com/a/1190000002910324)

## 3.自动编号（counter-increment）

利用counter-increment和counter实现自动标号
***

	li{
		counter-increment:item; //从0开始，每有一个li，则为计数器item+1
	}
	li::before{
		content:counter(item); //取出计数器item的值
	}


以上输出的是从1开始依次编号（1,2,3,4...）的li

***

	li{
		counter-increment:item+2; //从0开始每有一个li，则为计数器item+2
	}
	li::before{
		content:counter(item); //取出计数器item的值
	}
	
以上输出的是从2开始的偶数编号（2，4，6，8...）的li

*** 

	h1{
		counter-increment:chapter -1 section 2 part; //charpter-1，section+2，part+1；
		}
		
***

####参考链接：
[counter-increment MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/counter-increment)
		
	