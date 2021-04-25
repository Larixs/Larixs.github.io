---
title: DOM Based XSS和html字符编码
tags: [study notes, xss, html]
categories: other
---

最近发现页面有xss的安全性问题，我之前简单了解xss攻击是什么，但是细节还是不够清楚，借这个机会再重新学习梳理一下。

## 什么是XSS
世界上有两种事很难，一个是把我的想法放进你的脑袋里，另一个是把你口袋里的钱放到我口袋里。
XSS就是把我的代码注入到你的代码里，把你口袋里的钱放到我口袋里。

正经点，XSS就是向本可以被信任的良性网站注入恶意脚本，而网站因为一些疏忽执行了恶意脚本，从而对受害者为所欲为的攻击。

## XSS分类

参考[Types of XSS](https://owasp.org/www-community/Types_of_Cross-Site_Scripting)。

最开始的分类：

1. Stored XSS: 通常发生在需要在服务器里储存用户输入的场景，例如博客、评论区等，攻击者将恶意代码通过网页提交到服务器，在其他访问者访问相关页面时，如果不经过滤和处理的情况下直接渲染，可造成恶意注入。

    举个简单🌰，攻击者在某文章评论区里输入了````<script>alert('hello fish')</script>````，网站没有过滤就直接将这段代码提交到了服务器。受害者在访问这个文章时，服务器下发这条评论，服务器和网站又双叒没有过滤并且直接渲染，受害者就收到了这个小小的攻击。
2. Reflected XSS: 当用户输入的全部或者部分内容会成为网络请求返回数据的一部分，如果没有经过安全处理就直接渲染造成的攻击属于此列。如果将注入行为拼接到url上，受害者点开时，网站在这种不设防的情况下直接执行请求返回，导致被注入攻击。利用这种漏洞构成url发送给受害者来点击，是很多钓鱼(phishing，音同fishing🐟，谐音梗扣钱)方案的核心。
3. DOM Based XSS: 基于DOM的XSS攻击，从源头读取数据到渲染具体DOM过程中被攻击。例如从query中读取数据，不经过处理的恶意字符串被document.write直接渲染到页面上。
    举个简单🌰，就是这次业务中发现的漏洞：页面从query中读取userName后，经过一系列拼接处理，直接用vue的v-html语法直接进行渲染，导致如果userName的值为````<script>alert('you idiot')</script>````，那么不仅侮辱性极强，伤害也很大。

后来发现XSS可能由以上几种重叠组成，又延伸出一种分类：
1. Server XSS: 非法数据来源于服务端返回，页面无脑执行里面嵌入的脚本。
2. Client XSS: 调用不安全的函数将没经过处理的数据直接渲染到页面上。

此次发现的问题就是典型的DOM Based XSS，因此接下来对这个方向将多探讨一些。

## DOM Based XSS防御

### DOM Based XSS
>DOM Based XSS (or as it is called in some texts, “type-0 XSS”) is an XSS attack wherein the attack payload is executed as a result of modifying the DOM “environment” in the victim’s browser used by the original client side script, so that the client side code runs in an “unexpected” manner. That is, the page itself (the HTTP response that is) does not change, but the client side code contained in the page executes differently due to the malicious modifications that have occurred in the DOM environment.
>
>This is in contrast to other XSS attacks (stored or reflected), wherein the attack payload is placed in the response page (due to a server side flaw).

翻译一下：服务端返回的页面没有问题，但是页面自己执行了代码修改了自己的内容，被攻击的时候导致运行不如预期。

DOM Based XSS的防御原则

HTML、HTML attribute, URL, 和CSS都可以在JS执行上下文中被触达和修改。


## HTML字符实体

### HTML预留字符
### 模糊的连结符


为了将一些HTML会解析的特殊字符用文本形式展示出来，HTML设计了字符引用([Character references](https://html.spec.whatwg.org/multipage/syntax.html#character-references))。
这些字符必须`&`开头, 紧接至少一位0-9a-zA-Z里的字符，最后以`;`结尾。字符分为以下三种：
1. 十进制字符，如````&#169;````
2. 十六进制字符，如````&#xA9;````
2. 带命名的字符，如````&copy;````


## 其他类型的xss防御（简单介绍）
目前常用的已知机制包含以下几种：
1. [CSP(Content-Security-Policy)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)：

CSP是被设计用来防止和减轻某些类型的攻击，例如xss和数据注入，它是完全向下兼容的，不支持它的浏览器会采用默认的同源策略。

## 小结
借用大佬的话，网络攻防是很复杂的，不仅是前端的问题，往往需要多端配合来防御攻击。但是前端要力所能及地去守护自己网站的安全。对于一些不安全的js方法和HTML属性（eval、document.write、innerHTML以及衍生出来的语法糖等），在使用之前要多思考是否有使用的必要，如果确实要使用，那一定要对数据进行过滤处理。千里之堤毁于蚁穴，对于网络安全，再小心也不为过。

学习链接：
- [CSP(mdn)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Cross Site Scripting (XSS)-owasp](https://owasp.org/www-community/attacks/xss/#stored-and-reflected-xss-attacks)
- [Types of XSS](https://owasp.org/www-community/Types_of_Cross-Site_Scripting)
- [DOM based XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)
- [Ambiguous ampersands](https://mathiasbynens.be/notes/ambiguous-ampersands)
- [你们的系统是如何防范XSS攻击的？](https://tech.bytedance.net/questions/6901645786388693005)
- [Entity](https://developer.mozilla.org/zh-CN/docs/Glossary/Entity)