# CSS布局

作为一名小白，在刚会制作网页的时候，遇到了不少问题。先把这些遇到的问题和解决方案总结一下，以后用时方便查找。

## 1. 清除浮动

当子元素处于浮动状态时，因为子元素脱离了文档流，所以父元素的高度或宽度不能完全包含子元素，产生了溢出。此时父元素就需要清除浮动，让父元素的高度和宽度能与子元素的相匹配。
清除浮动的解决方案：

解决方案1(非body)

	.clearfix {
	    overflow: auto;
 	}


解决方案2(非body)

	.clearfix{
		overflow:hidden;
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
		
## 4.段落文字左右两边对齐

### text-align:justify 
报纸一样的排版，每行的左右两边努力对齐

### word-break:break-all
强行拆开一个单词


## 5.移动端去掉点击时的阴影

    *{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
        /* For some Androids */
    }
    
## 6.HTML5、@media兼容ie8的做法


	<!-- html -->
  	 <meta http-equiv="X-UA-Compatible" content="IE=edge">
	 <link rel="stylesheet" href="style.css">
 	 <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries  -->
  	<!--[if lt IE 9]>
 	 <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  	<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
  	<![endif]-->
  	
 
以上为html的代码，还需在css文件中增加以下代码

	article,aside,dialog,footer,header,section,footer,nav,figure,menu{
  	display:block}

- \<!--[if lt IE 9]>是条件注释，IE以外的浏览器将会把它们看作是普通的注释而完全忽略它们。IE将会根据if条件来判断是否如解析普通的页面内容一样解析条件注释里的内容。条件注释是一种安全的区分IE浏览器版本的语法，且被认为是取代针对IE css hack的首选办法。

- html5shiv解决html5的兼容性问题，respond解决响应式的问题。respond需要在css文件之后，但要尽早解析，避免出现闪屏。更多注意事项见[respond.js](https://github.com/scottjehl/Respond)

#### 什么时候才能不兼容ie8呀,ie8烦死惹(摔!)

## 7.css3多栏布局

- column-width:200px; : 内容会分布在200px宽度的栏位中,视口尺寸变化时,浏览器会自动调整栏位数量。

- column-count:3; :保持栏位数量不变而让栏位宽度根据视口调整。

- column-gap:20px; :栏间距

- column-rule: thin dotted #999;  :栏的分割线



## 8.让li表现为横向菜单

方案一 利用table布局

    ul{
      display:table-row;
    }
    li{
      display:table-cell;
    }

方案二 利用float布局,加清除浮动


    ul{
      margin:0;
      padding:0;
    }

    .clearfix::after{
      content:"";
      display:block;
      clear:both;

    }
    li{
      float:left;
      list-style:none;
    }

## 9.三列布局

双飞翼布局:
方案一 position:absolute;

    html

    <div class="container">
        <div class="left">left</div>
        <div class="right">right</div>
        <div class="main">main</div>
     </div>


    css

    .container{
      margin:0 100px 0 100px;
      border:1px solid black;
    }

    .main{
      width:100%;
      height:200px;
      border:1pxs solid blue;
    }
    .left{
      position:absolute;
      left:0;
      width:100px;
      height:200px;
      border:1px solid red;
    }
    .right{
      width:100px;
      height:200px;
      border:1px solid red;
      position:absolute;
      right:0;
    }


方案二 display:flex

    html

    <div class="container">
       <div class="left">left</div>
       <div class="main">main</div>
       <div class="right">right</div>
    </div>



    css

    .container{
      border:1px solid red;
      display:flex;
      height:200px;

    }
    .container > div{
      border:1px solid black;
    }
    .left{
      width:100px;
    }
    .right{
      width:100px;
    }
    .main{
      flex-basis:100%;/*   flex-grow:1; 也同样生效  */
    }