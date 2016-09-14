require('./zepto.min');
require('./zepto-tap');
require('./swiper-3.3.1.min');

var mainSwiper = new Swiper('#main-swiper',{
	resistanceRatio:0,
	pagination:'.swiper-pagination',
		//定义分页器
	paginationClickable:true,
	// paginationType:'bullets',
	paginationElement:"li",
	//设定分页器指示器（小点）的HTML标签。
	paginationBulletRender:function(index,className){
		var array = ['介绍','详情','实拍'];
		var fonts = ['&#xe601;','&#xe67a;','&#xe614;','&#xe631;']
		return '<li class ='+className+'>'+array[index]+'</li>';
	},
})


//计算section的高度
var oHeight = document.documentElement.clientHeight;
var oheader = $('header').height();
var page1 = $('#main-swiper .swiper-pagination').height();
console.log(page1);
$('section').css('height',oHeight-oheader);
$('#img-swiper').css('height',oHeight-oheader-page1);

var mainSwiper = new Swiper('#img-swiper',{
	resistanceRatio:0,
	paginationType:'bullets',
	bulletClass : 'my-bullet',
	bulletActiveClass : 'my-bullet-active',
	pagination:'.swiper-pagination',
	paginationElement:"span",
})