---
title: BFC (block formatting context)
tags: [bfc]
categories: layout
---

## 定义

一个**块格式化上下文（block formatting context）** 是Web页面的可视化CSS渲染出的一部分。`它是块级盒布局出现的区域，也是浮动层元素进行交互的区域。`

## 哪些情况会生成BFC

1. 根元素
2. 浮动元素，即float属性不为none
3. 绝对定位元素，即position为absolute或fixed
4. display为inline-block, table-cell, table-caption, flex, inline-flex
5. overflow不为visible

## 布局规则

1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算

## 应用

### 清除浮动

方案1(非body)

	.clearfix {
	    overflow: auto;
 	}


方案2(非body)

	.clearfix{
		overflow:hidden;
	}
	
可以看出，两个方案其实原理是一样的，都是利用了overflow不为visible时让该元素触发BFC，这样就应用了BFC的布局规则` 计算BFC的高度时，浮动元素也参与计算`

### 两列布局

#### 左列不定宽，右列自适应
html

    <div class="parent">
        <div class="left">
            <p>left</p>
        </div>
        <div class="right">
            <p>right</p>
            <p>right</p>
        </div>
    </div>
    
css

    .left{
        float: left;
        width: 100px;
        margin-right: 20px;    //形成20px的间隔
    }
    .right{
        overflow: hidden; //通过设置overflow: hidden来触发BFC特性
    }
    
原理如下：

1. 通常情况下，浮动元素的块状兄弟元素会无视浮动元素的位置，尽量占满一整行，这样该兄弟元素就会被浮动元素覆盖。
2. 若浮动元素的块状兄弟元素为BFC，则该兄弟元素不会占满一整行而导致部分内容被浮动元素遮住。而它会根据浮动元素的宽度，占据该行剩下的宽度，避免与浮动元素重叠。
3. 浮动元素与其块状BFC兄弟元素之间的margin可以生效，这将继续减少兄弟元素的宽度。

其实主要用到了布局规则中的` BFC的区域不会与float box重叠。`

并不是一定要在.right上用overflow: hidden;，只要能让.right触发BFC就行。另外在IE6上也可以触发haslayout特性（推荐用*zoom: 1;）。

由于.right的宽度是自动计算的，不需要设置任何与.left宽度相关的css，因此.left的宽度可以不固定（由内容盒子决定）。

参考资料：

1. [MDN BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
1. [前端精选文摘：BFC 神奇背后的原理](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)
1. [两列自适应布局方案整理](https://segmentfault.com/a/1190000004424442)