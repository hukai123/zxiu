var $ = require('./jquery-1.10.1.min.js');
require('./swiper-3.3.1.min.js');
var p = require('./swiper.animate1.0.2.min.js');

mainSwiper = new Swiper('.swiper-container',{
	 resistanceRatio:0,  //边缘抵抗为0
	 pagination:'.swiper-pagination',  //定义分页器
	 onInit:function(swiper){       //swiper 初始化完成以后
	 	p.swiperAnimateCache(); //隐藏动画元素 
    	p.swiperAnimate(); //初始化完成开始动画
	 },
	 //滑动结束的时候触发的回调函数
	 onSlideChangeEnd:function(swiper){
	 	//previousIndex  表示滑动前一页
	 	p.swiperAnimate(); //每个slide切换结束时也运行当前slide动画
	 }
})



