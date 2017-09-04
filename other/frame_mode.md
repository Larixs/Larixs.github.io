# 框架模式

在不同的应用场景中，框架模式也许会有所改变，因此同一个框架可能出现不同的图示和理解，不要太纠结细节，理解大概便是。以下皆不放图示了，避免引起误会。

这篇md很难写。1是内容太过抽象，没有合适的例子，2是众说纷纭，我也不是太理解。3是可应用的机会小，细学的动力小。

## MVC
全称Model View Controller,即模型-视图-控制器。

View: 
放置视图相关的代码，原则上不应该有任何业务逻辑

Controller：
放置视图与模型之间的映射，原则上只放一些与事件绑定相关的代码，并不实现真正的功能，是一个桥梁。
    
Model: 
主要实现逻辑的地方。

## MVVM
全称Model View ViewModel。


参考链接：
1. [浅谈框架模式 MVC、MVP 和 MVVM](http://web.jobbole.com/89314/)
2. [被误解的MVC和被神化的MVVM](http://www.infoq.com/cn/articles/rethinking-mvc-mvvm)
3. [浅谈 MVC、MVP 和 MVVM 架构模式](http://draveness.me/mvx.html)