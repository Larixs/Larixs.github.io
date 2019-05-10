---
title: 一些奇奇怪怪的样式问题处理
tags: [study notes, wap]
categories: layout
---

做的移动端页面和响应式页面时遇到的兼容性问题：
______

### 1. audio

audio在ios上的兼容性问题如下：

 音频的开始和停止在**safari**下都需要手动操作。标签设置的preload属性会被忽略，导致不能自动播放；网页关闭后，音频仍然播放，不会随网页的关闭而停止，除非把浏览器彻底关掉（使用微信浏览器则退出微信）。

 解决方法：

 自动播放：

 		//player为audio元素
 		player.load();//ios9及以上需要先load再play
 		player.play();//ios9以下不需要load


 **（关于load的说法，因为没有ios9以下的设备进行验证load的必须性，所以此项仅供参考。不过ios9及以上设备使用load是没有问题的) **

 自动停止：

 		window.onunload = stopVideo;
 		//在关闭网页的时候停止音频播放。stopVideo是自己实现的函数。

 ** 有人提供了另一种思路，通过document.hidden来判断网页是否缩小、被切换、关闭，然后将音频停止。不过有一个问题，难道浏览器要一直轮询hidden状态吗？如果不的话，怎么得知网页状态的变化呢？或许应该好好看看js高程 **

______

### 2. position:sticky

 ios的浏览器，多数在滚动的时候会**暂停所有js代码执行**，注意，是** 所有的 **，包括你提前设定好的定时器。

 有一个比较直观的例子，你在ios的微信中点开公众号，查看gif动图，当在屏幕在滚动的过程中时，gif会定格在某一画面，等你松手之后gif才会继续播放。

 js就像gif一样，在屏幕滚动的时候会被暂停，滚动结束后才继续。

 遇到的问题：如何在ios端实现粘性布局？

 解决方案： position:sticky。 这个css3新属性几乎是为ios特别定制的，它很好的解决了ios的粘性布局问题。

 position:sticky的表现上像是position:fixed和position:relative的结合体，设置了position:sticky的元素，特征如下：

     - 元素不会脱离文档流，并保留元素在文档流中占位的大小
     - 元素在容器中被滚动超过指定的偏移值时，元素在容器内固定在指定位置
     - 元素固定的相对偏移是相对于离它最近的具有滚动框的祖先元素，如果祖先元素都不可以滚动，那么是相对于viewport来计算元素的偏移

 sticky其生效条件已经有人研究过，我就不再赘述了。

PS：也许会有其他库来实现粘性布局，不过如果只实现粘性布局的话，就没必要引入库了，自己写写js，ios使用sticky属性，非ios增加对scroll的监听，通过计算位置来调整positon。

______

2017.12.21

已经是第三次解决这个问题了，每次解决这个问题都得看老久文档，然后研究好久父元素需要设置的条件。亲自试验和看别人的文章还是不一样。原因就在于我没理解到文章的点，所以看起来很费解而且用起来也不顺手。决定自己写一下经过实验后自己的理解，对正确性不保证。

1. 目标元素需要设置position: sticky; top: 0;
2. overflow是设置视口。目标元素的祖先元素中，如果有元素的overflow不为visible,则该元素设置为视口。当视口滚动时（设置高度小于内容高度），才触发sticky。
3. 如果祖先元素的overflow均为visible, 那么目标元素相对于视口进行定位。

______
2018.01.05

第四次看着这个问题，我还是不能很顺利的一次性解决，我也是服气的。这次出现的问题在于，父元素没有高于目标元素导致目标元素没有滚动起来。目标元素就算设置了sticky并且生效了，也只会在父元素里滚动。因此要注意目标元素的DOM节点位置和父元素的高度。

_____

##### 参考链接：
[position:sticky实现iOS6+下的粘性布局](http://efe.baidu.com/blog/position-sticky/)

[sticky demo](http://html5-demos.appspot.com/static/css/sticky.html)

______

### 3. -webkit-overflow-scrolling: touch 引起的元素莫名消失的现象

假设存在一个元素的CSS属性同时使用了以下两条：

    overflow:auto;
    -webkit-overflow-scrolling: touch;

且该元素的子元素使用了positon:relative, 在ios的浏览器会触发内容实际存在但显示空白的bug。

解决方案： 为positon:relative的子节点添加

    transform: translate3d(0,0,0);

##### 参考链接：

[-webkit-overflow-scrolling设置为touch的一个bug](http://isay.me/2015/09/one-css-bug-webkit-overflow-scrolling-touch.html)

______

### 4. input type="tel"

该元素在ios上会弹出纯数字键盘，非常纯，连个小数点都没有，若非特殊需求，请谨慎使用。

如果想要在input元素获取焦点时首先弹出数字键盘，且可以选择其他字符，那么使用input type="number"在ios上表现会更好。

______

### 5. pc端浏览器使用win10自带中文输入法时光标错位

需求： 用户在输入框输入手机号时，将其合理分割并且添加空格。

现象： 使用vue框架，通过函数处理后返回添加过空格的字符串。当使用win10自带中文输入法且正好该字符串刚添加过一个空格，则光标会错误地停留在前一位。

解决方案：

在返回包含空格的字符串后， 利用setTimeout主动设置光标的位置

    if(val.length > 0){
     //如果不设置if条件，在IE11下会出现不停获得焦点的bug
        setTimeout(function(){
            target.setSelectionRange(_self.inputVal.length,_self.inputVal.length)
        },0)
    }

______

### 6. ios移动端滚动穿透

ios移动端不仅有点击穿透的问题，还有滚动穿透的问题。现象为撑满全屏且可内容滚动的的fixed元素在内容滚到其底部后，再滑动会使body在接收不到touch事件的情况和无冒泡的情况下触发scroll事件，且无法禁止滚动。

解决方案：

在弹出fixed元素时，设置body

    body.modal-open {
        position: fixed;
        width: 100%;
    }

同时记录body滚动条的位置，待fixed元素关闭后恢复body的css属性和滚动条位置。

    var ModalHelper = (function(bodyCls) {
      var scrollTop;
      return {
        afterOpen: function() {
          scrollTop = document.scrollingElement.scrollTop;
          document.body.classList.add(bodyCls);
          document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function() {
          document.body.classList.remove(bodyCls);
          // scrollTop lost after set position:fixed, restore it back.
          document.scrollingElement.scrollTop = scrollTop;
        }
      };
    })('modal-open');

##### 参考链接：

[移动端滚动穿透问题完美解决方案](https://segmentfault.com/a/1190000005617307)

______

### 7.ios11以下的safari在开启无痕时，localStorage和sessionStorage的setItem操作报错

如题所述，开发过程中，发现ios11以下的safari在开启无痕模式时，两种storage的setItem操作都会抛出错误 “QUOTA_EXCEEDED_ERR”，如果没有处理错误的话，还会中断后面的js代码。

似乎没有什么兼容措施，只能判断当前环境是否支持setItem操作，例如

    function isLocalStorageNameSupported() {
      var testKey = 'test', storage = window.localStorage;
      try {
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return true;
      } catch (error) {
        return false;
      }
    }

把localStorage换成sessionStorage同样适用。

另一种方式就是，在你进行setItem操作时，用try-catch包装一下。

    function localStorageSetItem( key, value){
        try{
            localStorage.setItem(key, value)
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }

##### 参考链接：

[Safari Private 模式下 localStorage 的问题](https://www.bbsmax.com/A/8Bz8XXm1zx/)

[html5 localStorage error with Safari: “QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to add something to storage that exceeded the quota.”](https://stackoverflow.com/questions/14555347/html5-localstorage-error-with-safari-quota-exceeded-err-dom-exception-22-an)
______


### 8. label的点击事件会触发其关联的input的点击事件

      <div class="test">
        <input id="input" @click="inputClickHandler" type="text">
        <label for="input" @click="labelClickHandler">标签</label>
      </div>

      <script>
        { ...
            inputClickHandler() {
                console.log('input click');
            },
            labelClickHandler() {
                console.log('label click');
            }
        }
      </script>

此时label与input元素在位置上并不重叠。点击label的时候，会先打印'label click', 紧接着打印'input click'。点击input的时候只打印'input click'。

