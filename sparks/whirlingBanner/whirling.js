var Whirling = {};
//可改写成横向切换，只需将布局改为横向排列，再将js代码中的top改为left即可。以后可做成一个参数进行切换
(function(win,doc){
    function Slider(options){
        this._init(options);
    }
    $.extend(Slider.prototype,{
        _init:function (options){
            /*
            * 1.参数初始化
            * 2.btn的hover和body绑定
            * 3.定时器和body、btn绑定（autoplay=true)
            * */
            var self = this;
            /*
            * 参数的意义：
             whirlingBox:外层 selector
             whirlingBody:内容主题 selector
             whirlingItem:需要切换的内容分块 selector
             whirlingBtn:切换按钮 selector
             whirlingBtnActive:按钮激活样式 class （请使用important覆盖样式）
             whirlingBtnStyle:按钮样式 class
             whirlingSize: 整体宽高 class
             autoplay:是否自动播放，true为自动播放 boolean
             slideSpeed:自动播放的速度(ms) number
             aniSpeed: 切换时的过渡速度(s) number
            * */
            //默认参数
            self.options = {
                whirlingBox:".whirling-box",
                whirlingBody:".whirling-body",
                whirlingItem:".whirling-item",
                whirlingBtn:".whirling-btn",
                whirlingBtnActive:"whirling-active",
                whirlingBtnStyle:"whirling-btn-style",
                whirlingSize:"whirling-size",
                direction:"vertical",
                autoplay:true,
                slideSpeed:2000,
                aniSpeed: 2
            };

            $.extend(true,self.options,options||{});
            self._initDOM();
            self._initBtnHoverEvent();
            if(self.options.autoplay === true){
                self._initInterval();
            }
        },
        //获得所需要的dom节点。设置参数
        _initDOM: function () {
            var self = this;
            self.$doc = $(doc);
            self.$box = $(self.options.whirlingBox).addClass(self.options.whirlingSize);
            self.$body = $(self.options.whirlingBody).css("transition", "all "+ self.options.aniSpeed +"s");
            self.$items = $(self.options.whirlingItem);
            $(self.options.whirlingItem + " img").addClass(self.options.whirlingSize);
            self.$btns = $(self.options.whirlingBtn).addClass(self.options.whirlingBtnStyle);
            self.timer = null;
            self.itemIndex = 0;
            if(self.$items.length !== self.$btns.length){
                alert("切换按钮与图片个数不对应");
                return;
            }
            //设置切换方向，如果是水平切换，则需要添加类名使图片水平排列
            if(self.options.direction=="horizontal"){
                self.cssDirection = "left";
                self.$items.addClass("whirling-item-h");
                //将ul的宽度设置为图片宽度*图片个数,20为预留出的缝隙宽度
                self.$body.css("width",parseInt(self.$box.css("width"))*self.$items.length + 20 + "px");
            }else{
                self.cssDirection = "top";
            }
            //获取图片的位置
            self.itemsPositionArr = self.getAllItemsPosition();

        },
        //对切换按钮进行初始化
        _initBtnHoverEvent: function () {
            var self = this;

            self.$btns.hover(function(){
                self.itemIndex = $(this).index();
                self.changeItemIndex(self.itemIndex);
                self.changeTabIndex(self.itemIndex);
            }, null);
        },
        //初始化定时器
        _initInterval:function (){
            var self = this;
            self.autoPlay();
            self.$btns.hover(function () {
                self.itemIndex = $(this).index();
                clearTimeout(self.timer);
            },function(){
                if(self.itemIndex == self.$items.length - 1){
                    self.itemIndex = -1 ;
                }
                self.timeToSlide(self.itemIndex + 1 );
            });
            //不能对box进行监听，会引起大混乱
            self.$body.hover(function(){
                self.itemIndex = $("."+self.options.whirlingBtnActive).index();
                clearTimeout(self.timer);
            },function(){
                if(self.itemIndex == self.$items.length - 1){
                    self.itemIndex = -1 ;
                }
                self.timeToSlide(self.itemIndex + 1 );
            });

        },
        //自动播放
        autoPlay: function () {
            var self = this;
            self.timeToSlide(1);
        },
        //切换到第index张图片(从0开始)
        timeToSlide: function (index) {
            var self = this;
            self.timer = setTimeout(function(){
                self.changeItemIndex(index);
                self.changeTabIndex(index);
                if(index >= self.$items.length - 1){
                    index = 0;
                }else{
                    index++;
                }
                //切换到下一张
                self.timeToSlide(index);
            },self.options.slideSpeed);
        },
        //获得切换图片的位置
        getAllItemsPosition: function () {
            var self = this;
            var posArr = [];
            var len = self.$items.length;
            for(var i =  0 ; i < len; i++){
                posArr.push(self.$items.eq(i).position()[self.cssDirection]);
            }
            return posArr;

        },
        //切换图片
        changeItemIndex:function(index){
            var self  = this;
            self.$body.css(self.cssDirection,"-" + self.itemsPositionArr[index]+"px");
        },
        //切换按钮
        changeTabIndex: function (index) {
            var self = this,
                active = self.options.whirlingBtnActive;
            $("."+ active).removeClass(active);
            self.$btns.eq(index).addClass(active);
        }
    });
    Whirling.Slider = Slider;
})(window,document);