---
title: 安卓app里的px
tags: [study notes]
categories: vue
---

目前的项目android的app并不全是原生写的页面，大部分是访问h5页面。h5页面是根据视口宽度、利用rem做自适应，而原生写的页面是根据PPI(每英寸像素密度)来做自适应。

h5写字体大小是用的虚拟像素，而原生写字体大小用的却是物理像素。

因为双方做自适应的标准不同，因此做出来的页面之间样式并不统一。为了解决这个问题，最终决定h5去适应原生的方案。

我之前并没有接触过安卓，导致首次沟通非常困难。挫败感很强，憋着一口气还是把这个搞明白了。

## 1. 参数们

首先看下iphone的参数

![](/images/layout/iphone_screen_density.png)

屏幕尺寸： 屏幕对角线长度

分辨率(pt)： h5前端通过document.documentElement.clientWidth取得的视口宽度。

Reader:  dpr ?

分辨率(px)： 安卓前端读到的物理像素宽高。 width * height

PPI： 每英寸像素密度。安卓前端通过PPI来计算当前屏幕该用多大字体。 PPI^2 = (width^2 + height^2) / 屏幕尺寸^2   这里的参数都是物理像素宽度(因为不会打开根符号，所以就这么写了）

## 2. 安卓计算字体的方式

安卓是以PPI值为160作为基准， 在PPI为 x 时，该屏幕设置的14号字(即前端意义上的font-size: 14px)为 (x / 160) * 14 + 'px'


## 3. h5计算自适应字体的方式

很简单，获取clientWidth，为html元素设置rem，rem随clientWidth的增大而增大。clientWidth获取到的是虚拟像素宽度。

## 4. 差别与解决方案

差别：双方在做自适应时参考的变量不同。h5仅参考视口宽度，安卓参考了物理宽度和物理高度。

解决方案： h5去适应安卓。h5用的都是虚拟像素，安卓用的是物理像素。安卓通过一些事件或方法，向前端的h5页面传递安卓取到的屏幕物理像素宽度deviceWidth，以及安卓里1虚拟像素所对应的物理像素androidPx。

此时需要求的就是h5下如何将h5的1px所对应的物理像素和安卓下1px对应的物理像素相等。

如果不做任何设置，h5下1px虚拟像素所对应的物理像素就是dpr的值。粗略的计算，dpr = deviceWidth / clientWidth 。（clientWidth是h5自己取到的视口宽度）

公式：  1px * dpr * ratio = 1px * androidPx

即 dpr * ratio = androidPx

即 deviceWidth /clientWidth  * ratio = androidPx

即 ratio = androidPx * clientWidth / deviceWidth

至此，就求出了h5所需的转化比率，只要在获取clientWidth计算rem时，为rem的计算结果乘上这个ratio，即可让h5的自适应效果与安卓的自适应效果大致相同。