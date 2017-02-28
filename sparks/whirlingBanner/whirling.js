var Whirling = {};
//可改写成横向切换，只需将布局改为横向排列，再将js代码中的top改为left即可。以后可做成一个参数进行切换
(function(win,doc){
    function Vertical(options){
        this._init(options);
    }
    $.extend(Vertical.prototype,{
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
            self.options = {
                whirlingBox:".whirling-box",
                whirlingBody:".whirling-body",
                whirlingItem:".whirling-item",
                whirlingBtn:".whirling-btn",
                whirlingBtnActive:"whirling-active",
                whirlingBtnStyle:"whirling-btn-style",
                whirlingSize:"whirling-size",
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
        //获得所需要的dom节点
        _initDOM: function () {
            var self = this;
            self.$doc = $(doc);
            self.$box = $(self.options.whirlingBox).addClass(self.options.whirlingSize);
            self.$body = $(self.options.whirlingBody).css("transition","top " + self.options.aniSpeed +"s");
            self.$items = $(self.options.whirlingItem);
            $(self.options.whirlingItem + " img").addClass(self.options.whirlingSize);
            self.$btns = $(self.options.whirlingBtn).addClass(self.options.whirlingBtnStyle);
            self.itemsPositionArr = self.getAllItemsPosition();
            self.timer = null;
            self.itemIndex = 0;
            if(self.$items.length !== self.$btns.length){
                alert("切换按钮与图片个数不对应");
                return;
            }
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
        //获得切换图片的高度
        getAllItemsPosition: function () {
            var self = this;
            var posArr = [];
            var len = self.$items.length;
            for(var i =  0 ; i < len; i++){
                posArr.push(self.$items.eq(i).position()["top"]);
            }
            return posArr;
        },
        //切换图片
        changeItemIndex:function(index){
            var self  = this;
            self.$body.css("top","-" + self.itemsPositionArr[index]+"px");
        },
        //切换按钮
        changeTabIndex: function (index) {
            var self = this,
                active = self.options.whirlingBtnActive;
            $("."+ active).removeClass(active);
            self.$btns.eq(index).addClass(active);
        }
    });
    Whirling.Vertical = Vertical;
})(window,document);