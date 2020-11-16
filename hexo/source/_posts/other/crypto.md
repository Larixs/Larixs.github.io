---
title: 记一次加密需求开发
tags: [crypto]
categories: other
---

1. Buffer
2. SM2
   公钥加密，私钥解密。同一个公钥加密同一段明文可以产生不同的密文，可能是有时间因子在里面。密文前缀为04时表示为非压缩密文。
3. SM4
4. 为什么已经有SM2了，还要使用SM4加密
   SM4加解密比SM2更快。

[Base64的编码与解码](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding)
[Base64编码与URLEncode的简介](https://blog.csdn.net/qq_40414209/article/details/100639230)

学习链接：
- [JS 计算字符串所占字节数](http://www.alloyteam.com/2013/12/js-calculate-the-number-of-bytes-occupied-by-a-string/)