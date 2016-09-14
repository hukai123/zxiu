var $ = require('./jquery-1.10.1.min.js');
//require('./zepto.js');
require('./swiper-3.3.1.min.js');

//swiper学习网站  https://img.alicdn.com/bao/uploaded/i4/TB1vGO5IFXXXXb4XXXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg


//通过js设置swiper-silde的高度
   var oHeight = $('header').height();
   var oBodyHeight = $('body').height();
   $('section').css('height',oBodyHeight-oHeight);
  
  
var mainSwiper = new Swiper('#main-swiper',{
	 resistanceRatio:0,  //边缘抵抗为0
	 pagination:'.swiper-pagination',  //定义分页器
	 paginationClickable:true,  //分页器button可否点击 true 可以点击
	 paginationElement:'span',   //定义分页器的标签类型
	 paginationBulletRender: function (index, className) {
		var arrText = ['介绍','详情','实拍'];
//    	// return '<span class="' + className + '">' + (index + 1) + '</span>';  原始的自带的
    	return '<span class=' + className + '>' + arrText[index] + '</span>'; 
   }
}) 

var page1Height = $('.page1').height();   //获取主swiper滚动条高度
$('#detail-swiper').css('height',oBodyHeight-oHeight-page1Height);     //详情swiper高度


var detailSwiper = new Swiper("#detail-swiper",{
	 resistanceRatio:0,  //边缘抵抗为0
	 pagination:'.swiper-pagination',  //定义分页器
	 paginationClickable:true,  //分页器button可否点击 true 可以点击
	 paginationElement:'span',   //定义分页器的标签类型
	 bulletClass:"my-bullet",     //当有多个swiper时,而每个滚动条的样式还不一样,那么就需要对默认的原点(bullet)的类名进行重命名,否则就相互影响起冲突
	 bulletActiveClass:"my-bullet-active"  //当有多个swiper时,而每个滚动条的样式还不一样,那么就需要对默认的原点(bullet)的类名进行重命名,否则就相互影响起冲突
})

