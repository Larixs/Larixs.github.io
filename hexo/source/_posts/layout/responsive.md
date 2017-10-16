---
title: 学习响应式布局
tags: [study notes, responsive]
categories: layout
---

响应式布局，即同一网页在不同设备上均能正常显示。

目前学习到的有：

## 1. 设置html字体大小。
  各设备上体现的像素大小不一样，所以要对不同设备的字体大小进行动态设定。之前学长给了一段代码，适用于__移动端__的计算。代码如下：
    
    (function (doc, win) {//屏幕自适应
    
    var docEl = doc.documentElement;
      
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      
      recalc = function () {
      
      var clientWidth = docEl.clientWidth;
        
      if (!clientWidth) return;
        docEl.style.fontSize = 50 * (clientWidth / 375) + 'px';
      };
      
 	  if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);


    })(document, window);
    
    
假如给的移动端的设计稿是750px，则按照这段代码，font-size = 50 * 750 / 375 + "px" =100px, 则1rem对应的就是100px。设计稿中的100px宽的元素，就可以用1rem表示其宽度，这样做出来的网页在750px的设备下显示最完美，其他设备虽然不够完美但也不会出太大差错。

####参考网址：[移动端适配，font-size设置的思考](http://www.cnblogs.com/axl234/p/5156956.html)

###__Question__:

1. 移动端用这段代码没大问题，但是如果这个网页同时在pc端显示，按照之前的计算方法，将pc设计稿中的px单位换算成rem后，网页上的元素就会异常的大。因此，在我做bookcet网页时，通过媒体查询，写了两套样式：一套是pc端，度量单位为px；一套是wap端，度量单位为rem。第一次写同时响应pc和wap的页面,感觉并没有get到响应式的精髓？
2. chrome允许的最小字体是12px。之前在网上搜索的时候，发现不少人用的是 html{ font-size:62.5%;}这种方式，将1rem对应的16px折合成10px来布局。我在chrome下尝试过这种设置方式，在浏览器自带的调试器下进行测量，发现1rem对应的是12px。如果设计稿给的是20px，按理来说应该设置为2rem,然后就会得到20px，但是在1rem对应12px的情况下，这只能得到24px。所以他们是怎么能得到正确布局的，是没尝试过就转载了，还是我的理解方式不对？
3. initial-scale和font-size是如何配合的？当我的font-size设置为625%(1rem=100px)时，initial-scale设置为1，则在iPhone5se上画布特别大，导致元素也特别大。这个应该可以自己研究一下。


##2.H5新标签picture的自适应

	<picture>
	  <source srcset="img_smallflower.jpg" media="(max-width: 400px)">
	  <source srcset="img_flowers.jpg">
	  <img src="img_flowers.jpg" alt="Flowers">
	</picture>
	
picture是h5标签，它想audio和video一样，可以设置多个source，第一个source是最佳的。还可以将css的媒体查询化为media属性进行设置。media是可选的。上面的代码意思即为，当视口（？）宽度小于400px时，显示第一张图片img_smallflower.jpg，除此之外显示第二张图片img_flowers.jpg。img是做平稳退化使用，当浏览器不支持picture标签时，使之可以退化为img标签。

##3. 如何在兼容ie8的情况下实现响应式布局

这点在另外一篇经验总结[css布局](layout.md)里的第五点提到了，使用respond.js进行兼容。(在《响应式web设计》里提到了Modernizr这个库,里面可以解决响应式布局的大部分问题。)


