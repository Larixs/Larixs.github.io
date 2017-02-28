var Scroll = {};
/*
 * 思路：以内容滚动为核心，触发滚动条滚动以及顶上的tab切换
 *
  *滚动条和tab提供滚动的位置信息
  *内容根据滚动信息滚动
  *内容滚动时触发监听事件，带动滚动条滚动及tab切换
  *
  * */
(function(win,doc){
    function ScrollBar(options){
        this._init(options);
    }
    $.extend(ScrollBar.prototype,{
        /*
            初始化整个流程
        * */
        _init:function(options){
            /*
             1.参数初始化
             2.绑定滑块拖动
             3.绑定内容区域滚轮事件
             4.绑定顶端菜单切换事件
             */
            var self = this;
            if(!options){
                return;
            }
            self.options = {
                contSelector:"",
                anchorSelector:"",
                barSelector:"",
                sliderSelector:"",
                tabItemSelector:"",
                tabActiveClass:"",
                wheelStep:30//滚动步伐
            };
            //合并参数
            $.extend(true,self.options,options||[]);
            self._initDomEvent();
            self._initSliderDragEvent();
            self._initTabEvent();
            self._bindMouseWheel();
        },
        _initDomEvent:function(){
            var opts = this.options;
            this.$doc = $(doc);
            this.$cont = $(opts.contSelector);
            this.$slider = $(opts.sliderSelector);
            this.$bar = opts.barSelector ? $(opts.barSelector):this.$slider.parent();
            this.$tabItem = $(opts.tabItemSelector);
            this.$anchor = $(opts.anchorSelector);
            this.anchorArr = this.getAllAnchorPosition();
            this.dragContBarRate = this.getMaxScrollPosition()/this.getMaxSliderPosition();
        },
        _initSliderDragEvent: function () {
            var self = this;
            var slider = self.$slider;
            var cont = self.$cont;
            var doc = self.$doc,
                dragStartPagePosition,
                dragStartScrollPosition;
            function mousemoveHandler(e){
                if(dragStartPagePosition == null){
                    return ;
                }
                self.scrollContTo(dragStartScrollPosition + (e.pageY - dragStartPagePosition) * self.dragContBarRate);
            }
            slider.on("mousedown",function(event){
                event.preventDefault();
                dragStartPagePosition = event.pageY;
                dragStartScrollPosition = cont[0].scrollTop;
                doc.on("mousemove.scroll", function (event) {
                    event.preventDefault();
                    //内容滚动
                    mousemoveHandler(event);
                }).on("mouseup.scroll",function(event){
                    event.preventDefault();
                    doc.off(".scroll");
                })
            })
        },
        _initTabEvent: function () {
            var self = this;
            self.$tabItem.on("click",function(e){
                e.preventDefault();
                var index = $(this).index();
                self.scrollContTo(self.anchorArr[index]);
            });
        },
        _bindMouseWheel: function () {
            var self = this;
            self.$cont.on("mousewheel DOMMouseScroll", function (e) {
                e.preventDefault();
                var oEv = e.originalEvent;
                //$().on('mousewheel DOMMouseScroll') 同时绑定两个事件： 谷歌和firefox的兼容问题
                //谷歌firefox的滚动步伐不一样,谷歌是120，火狐是3
                //wheelRange=-1时向上滚动，为1时向下滚动
                var wheelRange = oEv.wheelDelta ? -oEv.wheelDelta/120:(oEv.wheelDelta||0)/3;
                self.scrollContTo(self.$cont[0].scrollTop + wheelRange * self.options.wheelStep);
            })
        },
        cont2Scroll: function () {
            var self = this;
            self.$slider.css("top",self.$cont[0].scrollTop / self.dragContBarRate + 'px');
        },
        cont2Tab: function (positionVal) {
            var self = this;
            var anchorArr = self.anchorArr;
            var i = anchorArr.length - 1;
            if(self.$tabItem.length == anchorArr.length) {
                for (i; i > 0; i--) {
                    if (positionVal >= anchorArr[i] - 150) {
                        break;
                    }
                }
            }
            self.changeTabSelect(i);

        },
        changeTabSelect: function (index) {
            var self = this;
            var active = self.options.tabActiveClass;
            var lastActiveItem = $("."+active),
                nextActiveItem = self.$tabItem.eq(index);

            if(lastActiveItem !== nextActiveItem){
                lastActiveItem.removeClass(active);
                nextActiveItem.addClass(active);
                self.$tabItem.last().next(".st-status").css({'left':index*100+10+'px'});
                return;
            }
        },
        getAllAnchorPosition:function (){
            var self = this;
            var allAnchor = [];
            for(var i = 0 ; i <self.$anchor.length ; i++){
                allAnchor.push(self.$anchor.eq(i).position().top);
            }
            return allAnchor;
        },
        scrollContTo:function (positionVal) {
            var self = this;
            self.$cont.scrollTop(positionVal);

            //页面滚动改变滑动条和tab
            self.cont2Scroll();
            self.cont2Tab(positionVal);
        },
        getMaxScrollPosition:function (){
            var self = this;
            //.height()为可视内容高度，scrollHeight为不包含滚动条的元素高度
            return Math.max(self.$cont.height(),self.$cont[0].scrollHeight)-self.$cont.height();
        },
        getMaxSliderPosition: function () {
            var self = this;
            return self.$bar.height() - self.$slider.height();
        }

    });
    Scroll.ScrollBar = ScrollBar;
})(window,document);
var scroll = new Scroll.ScrollBar({
    contSelector:".scroll-cont",
    anchorSelector:".anchor",
    barSelector:".scroll-bar",
    sliderSelector:".scroll-slider",
    tabItemSelector:".tab-item",
    tabActiveClass:"tab-active"
});