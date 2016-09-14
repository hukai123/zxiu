var $ = require('./jquery-1.10.1.min.js');
require('./swiper-3.3.1.min.js');

mainSwiper = new Swiper('.swiper-container',{
	 resistanceRatio:0,  //边缘抵抗为0
	 pagination:'.swiper-pagination',  //定义分页器
	 onInit:function(swiper){       //swiper 初始化完成以后
	 	$('.z-quan').addClass('quan');
	 	$('.z-geng').addClass('geng');
	 	$('.z-duo').addClass('duo');
	 	$('.z-ban').addClass('ban');
	 	$('.z-base').css('opacity','1');
	 },
	 //滑动开始的时候触发的回调函数
	 onSlideChangeStart:function(swiper){ 
	 	// swiper 表示滑到当前页的slide;
	 	// activeIndex  每一个slide的活动索引
	 	if(swiper.activeIndex==0){
			$('.z-quan').addClass('quan');
		 	$('.z-geng').addClass('geng');
		 	$('.z-duo').addClass('duo');
		 	$('.z-ban').addClass('ban');
		 	$('.z-base').css('opacity','1');
	 	}
	 	if(swiper.activeIndex==1){
	 		//表示滑到索引值为1的 slide页
	 		$('.z-buy').addClass('buy');
	 		$('.z-txt').addClass('txt');
	 		$('.z-zhong').addClass('zhong');
	 		$('.z-man').addClass('man');
	 		$('.z-base').css('opacity','1');  
	 	} 
	 	 if(swiper.activeIndex==2){
	 		$('.z-shang').addClass('shang');
	 		$('.z-li').addClass('li');
	 		$('.z-qiang').addClass('qiang');
	 	 	$('.z-base').css('opacity','1');
	 	 }
	 	if(swiper.activeIndex==3){
	 		$('.z-hui').addClass('hui');
	 		$('.z-now').addClass('now');
	 		$('.z-begin').addClass('begin');
	 	}
	 },
	 //滑动结束的时候触发的回调函数
	 onSlideChangeEnd:function(swiper){
	 	//previousIndex  表示滑动前一页
	 	//console.log(swiper.previousIndex);
	 	if(swiper.previousIndex==0){
	 		$('.z-quan').removeClass('quan');
		 	$('.z-geng').removeClass('geng');
		 	$('.z-duo').removeClass('duo');
		 	$('.z-ban').removeClass('ban');
		 }
	 	if(swiper.previousIndex==1){
	 		$('.z-buy').removeClass('buy');
	 		$('.z-txt').removeClass('txt');
	 		$('.z-zhong').removeClass('zhong');
	 		$('.z-man').removeClass('man');
	 	}
	 	if(swiper.previousIndex==2){
	 		$('.z-shang').removeClass('shang');
	 		$('.z-li').removeClass('li');
	 		$('.z-qiang').removeClass('qiang');
	 	}
	 	if(swiper.previousIndex==3){
	 		$('.z-hui').removeClass('hui');
	 		$('.z-now').removeClass('now');
	 		$('.z-begin').removeClass('begin');
	 	}
	 }
})

$(".z-begin").on("click",function(){
	window.location.href="html/shouye.html";
})