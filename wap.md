# 移动端布局

## 基本概念

### 像素篇

#### 物理像素(physical pixel)

显示设备中一个最微小的物理部件

#### 设备独立像素(density-independent pixel)

设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

#### CSS像素(device-independent pixel，简称DIPs)


#### 设备像素比(device pixel ratio)

设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：

	设备像素比 ＝ 物理像素 / 设备独立像素
	
css中2px*2px的元素，在实际设备（dpr=2）上，是有4\*4=16个物理像素点来显示

（原来的理解好像有误，综合后面对不同dpr设置不同font-size的代码来看，在dpr=1和dpr=2的设备上，2px控制的都是两个像素点，但是dpr=2的像素点更多更密集，让dpr=2上的2px小于dpr=1的2px。因此在dpr=2的设备上，需要4px，才能和dpr=1上的2px效果一样。

有个疑惑的地方，我用chrome的dpr去测试同一个页面，同一个font-size，dpr=3和dpr=2的表现是一样的。是chrome的调试环境有问题，还是我测试的不对呢？）

	
#### initial-scale  缩放比例：
  
  \<meta name="viewport" content="initial-scale=2.0,width=device-width"\>
  
  缩放比例为2.0，这会使页面放大到设备尺寸两倍显示
  
#### viewport 视窗：

简单理解，viewport是严格等于浏览器的窗口。

pc端：viewport就是浏览器窗口的宽度高度。

移动端： 因为视口太窄，所以提供了两个viewport ：可见的visual viewport(what you can see,a portion of layout viewport)和布局的layout viewport（all the web, the size and shape never change）。


###单位篇

#### 1.rem (font size of the root element)

rem是以根元素html的font-size为基准来做计算的。

#### 2.px（pixel）
像素是相对于显示器屏幕分辨率而言的。


### 代码篇

#### 1.动态设置meta

\<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js">\</script>

这个js文件动态改写了meta标签，为不同的设备设置不同的data-dpr、font-size属性。

#### 2.根据不同的dpr，（将rem转化为不同的px值？）

方案1 使用sublime Text3的cssREM插件

方案2 使用sass的函数和混合宏（可是并没有根据不同的dpr转化不同的px呀）

方案3 npm工具px2rem 这个会根据不同的dpr转化为不同的px

#### 3.描述性文本字号一般不通过rem做适配，通过不同的dpr来设置字号大小

文本使用px单位，但会根据不同的dpr设置不同的字号大小。如：

	div {
    	width: 1rem; 
    	height: 0.4rem;
    	font-size: 12px; // 默认写上dpr为1的	fontSize
	}
	[data-dpr="2"] div {
    	font-size: 24px;
	}
	[data-dpr="3"] div {
    	font-size: 36px;
	}


可使用sass的混合宏

	@mixin font-dpr($font-size){
    	font-size: $font-size;

    	[data-dpr="2"] & {
        	font-size: $font-size * 2;
    	}

    	[data-dpr="3"] & {
        	font-size: $font-size * 3;
    	}
	}



#### 学习链接：

[使用Flexible实现手淘H5页面的终端适配](http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)

[css3的rem设置字体大小](http://www.w3cplus.com/css3/define-font-size-with-css3-rem)
