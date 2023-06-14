# Larix's Blog

现在及以后的.md 文档都会存放在 hexo/source/\_post 文件夹中，统一由 hexo 生成博客。

进入 hexo 文件夹： cd hexo/

启动测试环境： hexo server -g

上线命令：hexo deploy -c -g

参考资料：

1. [hexo](https://hexo.io/)

提交不上?

- 可能是 github 账号不对

`git config --local user.name "larixs"`

`git config --local user.email 627398360.com`

- The "mode" argument must be integer.

可能是 node 版本和 hexo 不匹配。已知 node 12.22.3 和 hexo 3.9.0 匹配。（hexo -v 可查看）
