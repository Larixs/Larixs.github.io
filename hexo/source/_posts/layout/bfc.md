---
title: bfc
tags: [bfc]
categories: layout
---

## 定义

## 触发

## 应用

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
    
这个方法主要是应用到BFC的一个特性：

1. 浮动元素的块状兄弟元素会无视浮动元素的位置，尽量占满一整行，这样该兄弟元素就会被浮动元素覆盖。
2. 若浮动元素的块状兄弟元素为BFC，则不会占满一整行，而是根据浮动元素的宽度，占据该行剩下的宽度，避免与浮动元素重叠。
3. 浮动元素与其块状BFC兄弟元素之间的margin可以生效，这将继续减少兄弟元素的宽度。

并不是一定要在.right上用overflow: hidden;，只要能触发BFC就好了，另外在IE6上也可以触发haslayout特性（推荐用*zoom: 1;）。

由于.right的宽度是自动计算的，不需要设置任何与.left宽度相关的css，因此.left的宽度可以不固定（由内容盒子决定）。

参考链接：[两列自适应布局方案整理](https://segmentfault.com/a/1190000004424442)