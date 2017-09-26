zelda项目突然有一天就不支持在dev环境下热刷新了。

可能是因为zelda经历了一次项目文件的重构，不知道把什么写掉了（可是我确实不记得见过或者修改过关于热更新热加载的代码）。

曾经修了一下午无果，google出的方案也都失效，就放弃了。

今天上午因为后台挂了，没有办法写需求，突然想起来我还可以fix这个问题。这次运气很好，换了关键词（可能上次搜索时钻牛角尖了）就搜到了解决方案。

目前在zelda中，要想实现热刷新热加载，需要以下3个条件：
1. 每个入口处添加“webpack-hot-middleware/client?reload=true”,即


    webpack.config.js={
        entry:{
          entry1:[entry1.js,"webpack-hot-middleware/client?reload=true"],
          entry2:[entry2.js,"webpack-hot-middleware/client?reload=true"],
        }
    }
    
2. 在webpack配置中添加plugin插件new webpack.HotModuleReplacementPlugin()。

3. 在Express实例中添加中间件'webpack-hot-middleware'。

终于解决了，开心。o(*￣▽￣*)ブ 

原来是少了第一条所以代码已经热更新了，但是页面没有刷新。感谢写文章的大佬(上次查了好多问题和文章都没写第一条，生气)。

参考链接：
1. [webpack多页面配置6--热加载刷新](https://godbasin.github.io/2017/08/19/webpack-multi-project-6-hot-reload/)


