---
title: 文件权限相关及linux操作
tags: [linux]
categories: linux
---

权限数字：

一共三位数字，第一位表示所有者的权限，第二位表示同组用户权限，第三位表示公共用户权限。

读权限-r-4，写入权限-w-2，执行权限-x-1

每位数等于各自用户权限数值相加。

例如

777： 4+2+1 4+2+1 4+2+1 即三种用户都拥有r,w,x权限

644： 4+2 4 4 即所有者拥有rw权限，同组用户和公共用户只拥有r权限。
___

ubuntu下修改权限

chmod -R 权限数字 文件名

___

查看权限：

(sudo) ls -l 文件名

__


### 参考资料
1. [Linux主机文件777，755，644权限详解](http://blog.sina.com.cn/s/blog_690c53680101jp61.html)
2. [Linux系统下如何查看及修改文件读写权限](http://www.cnblogs.com/CgenJ/archive/2011/07/28/2119454.html)