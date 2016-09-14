var $ = require('./jquery-1.10.1.min');
var load = require('./loadfooter.js');
load.loadHtml(1);

require('./swiper-3.3.1.min');




//获取商品分类
getGoodNav();
function getGoodNav(){
	$.get('http://datainfo.duapp.com/shopdata/getclass.php',function(data){
		if(data){
			setGoodNav(data);
		}
	})
}
// 商品分类数据输入到导航中
function setGoodNav(data){
	if(data){
		var mydata = JSON.parse(data);
		$.each(mydata,function(i){
			var myNav = $("<div class='swiper-slide' data-id="+mydata[i].classID+"><i class='iconfont'>"+mydata[i].icon+"</i><span>"+mydata[i].className+"</span></div>")
			$('#swiper1 .swiper-wrapper').append(myNav);
			$("#swiper1 .swiper-slide").eq(0).addClass('active-nav');
		})
		$("header span").text(mydata[0].className);
	}
	// 数据获取成够再来初始化swiper
	swiperInit()
}

//swiper超出部分导航
function swiperInit(){
	var swiper1 = new Swiper('#swiper1',{
			slidesPerView:"auto",
			watchSlidesProgress : true,
			watchSlidesVisibility : true,
			//开启watchSlidesVisibility选项前需要先开启watchSlidesProgress，如果开启了watchSlidesVisibility，则会在每个可见slide增加一个classname，默认为'swiper-slide-visible'。
			resistanceRatio:0,
			// onTap:function(){
			// 	swiper2.slideTo(swiper1.clickedIndex);
			// }
			onTap:function(){

				swiper2.slideTo(swiper1.clickedIndex);
			}
		})
	var swiper2 = new Swiper('#swiper2',{
		resistanceRatio:0,
		autoHeight:true,
		onSlideChangeStart:function(){
			change();
		}
	});
	function updateNavposition(){
		
		var currentIndex = swiper2.activeIndex;
		$('#swiper1 .active-nav').removeClass('active-nav');
		var activeNav = $('#swiper1 .swiper-slide').eq(currentIndex).addClass('active-nav');
		if(!activeNav.hasClass('swiper-slide-visible')){
			if(currentIndex>swiper1.activeIndex){
				var num = Math.floor(swiper1.width/activeNav.width()-1);
				// swiper1.activeIndex;
				swiper1.slideTo(currentIndex-num)
			}else{
				swiper1.slideTo(currentIndex)
			}
		}
	}

	// swiper1.on('tap',function(){
	// 	var index = swiper1.clickedIndex;
	// 	console.log(swiper1.clickedIndex);
	// 	$('#swiper1 .swiper-slide').eq(index).addClass('active-nav').siblings().removeClass('active-nav');
	// })


	function change(){
		var currentIndex = swiper2.activeIndex;
		// console.log(currentIndex);
		var activeNav = $('#swiper1 .swiper-slide').removeClass('active-nav').eq(currentIndex).addClass('active-nav')
		//表示执行高亮先生  activeNav 指向高亮对象 jq对象
		// console.log(activeNav.find('span').html())
		$('header span').text(activeNav.find('span').html())
		var classID = activeNav.attr('data-id');
		// console.log(classID);
		getGoodsData(classID,0,6,currentIndex);
		if(!activeNav.hasClass('swiper-slide-visible')){
			if(currentIndex>swiper1.activeIndex){
				var oNum = Math.floor(swiper1.width/activeNav.width());
				//求出当前 swiper1 显示的 slide的个数
				var swiper1ActiveIndex = currentIndex - oNum + 1;
				swiper1.slideTo(swiper1ActiveIndex);
			}else{
				swiper1.slideTo(currentIndex);
			}
		}
	}
	getGoodsData();
	// function user(){
	// 	function in1(){
	// 		this.name = "Tom";
	// 	}
	// 	in1();
	// }
	// var  a = new user;
	// console.log(a.name);


    // 获取 商品列表信息 
	function getGoodsData(classID,pageCode,linenumber,slide){

		var thisClassID = classID?classID:0;
		var thisPageCode = pageCode?pageCode:0;
		var thisSlide = slide?slide:0;
		var thisLineNumber = linenumber?linenumber:6;
		var params = {
			classID:thisClassID,
			pageCode:thisPageCode,
			linenumber:thisLineNumber
		}
		$.ajax({
			url:'http://datainfo.duapp.com/shopdata/getGoods.php',
			type:'get',
			data:params,
			dataType:'jsonp',
			success:function(data){
				console.log(data.length);
				if(data.length){
					$.each(data,function(i){
						var oLi = $("<li><dl><dt><img src="+data[i].goodsListImg+"></dt><dd><p class='gd'>"+data[i].goodsName+"</p><div><span class='price'>￥"+data[i].price+"</span><b class='discount'>"+data[i].discount+"折</b></div></dd></dl><a href='' class='goodDetail'></a></li>");
						$('#swiper2 .swiper-slide').eq(thisSlide).find('#thelist').append(oLi);
					});
				}
			}
		})
	}
}

// require('./myiscroll');