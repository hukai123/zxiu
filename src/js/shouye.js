require('./zepto.min');
require('./zepto-tap');
var $ =require('./jquery-1.10.1.min.js');
var load = require('./loadfooter.js');
load.loadHtml(0);
require('./swiper-3.3.1.min');
//初始化swiper
function swiperInit(){
	var myswiper = new Swiper('#myswiper',{
		autoplay:true,
		speed:2000,
		loop:true,
		pagination:'.swiper-pagination',
		//定义分页器
		paginationClickable:true,
		//分页器button可否点击 true 可以点击
		paginationType:'bullets',
	})
}
getSwiperData();
function getSwiperData(){
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getBanner.php",
		type:"get",
		dataType:'jsonp',
		success:function(data){
			console.log(data);
			if(data.length){
				$.each(data,function(i){
					var dataImgUrl = JSON.parse(data[i].goodsBenUrl);
					// slice()方法与substring()方法非常类似，它传入的两个参数也分别对应着开始位置和结束位置。而区别在于，slice()中的参数可以为负值，如果参数是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符。
					// imgUrl = imgUrl.split(',')[0].slice(2,-1);
					// var oDiv = $("<div class='swiper-slide'><img src="+imgUrl+" alt="+data[i].goodsName+" data-classID = "+data[i].calssID+" data-goodsID = "+data[i].goodsID+"></div>");
					// $("#myswiper .swiper-wrapper").append(oDiv);
					var oDiv = $("<div class='swiper-slide'><img src="+dataImgUrl[0]+" alt="+data[i].goodsName+" data-classID = "+data[i].calssID+"	data-goodsID="+data[i].goodsID+" /></div>")
					oDiv.appendTo($("#myswiper .swiper-wrapper"));
				})
				swiperInit();
			}
		}
	})
}



// 获取 商品列表信息
getGoodsData();
function getGoodsData(classID,pageCode,linenumber,slide){
	var thisClassID = classID?classID:0;   //三目运算符
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
					var oldPrice = parseInt(data[i].price*10/data[i].discount);
					var oLi = $("<li ><dl><dt><img src="+data[i].goodsListImg+"></dt><dd><h3>"+data[i].goodsName+"</h3>h3><div><b class='price'>￥"+data[i].price+"</b><span class='oldprice'>￥"+oldPrice+"</span></div><span class='discount'>"+data[i].discount+"折</span><a id='addGoodInCar' data-goodsID="+data[i].goodsID+" data-count='0'></a></dd></dl><div class='clickarea' data-classID="+data[i].classID+" data-goodsID="+data[i].goodsID+"></div></li>")
					$('#thelist').append(oLi);
				});
			}
		}
	})
}

// 点击 搜索商品 进入搜索详情页面
$('#searchBtn').on('touchstart',function(){
	var selectInp = $('.searchinp').val();
	window.location.href = 'sousuo.html?selectText='+encodeURI(selectInp);
})

require("./myiscroll");

// 点击加入购物车
$(document).on('click','#addGoodInCar',function(e){
	console.log("加入购物车1");
	 // if(e.target == this){
	 	var e = window.event || e;
	 	if(e.stopPropagation){
	 		e.stopPropagation()
	 	}else{
	 		e.cancelBubble  = true;
	 	}
	var userID =  localStorage.getItem('username');
	var goodsID = $(this).attr('data-goodsID');
	if(userID!=null||userID!=undefined){
		var goodsNumber;
		var goodDataTpye = 'gdType_'+ goodsID;
		// localStorage.pCount 键值对才能这么获取
		var thisGoodsData = JSON.parse(localStorage.getItem(goodDataTpye));
		if(thisGoodsData){
			goodsNumber = thisGoodsData.goodsNum;
			goodsNumber++;
		}else{
			goodsNumber = 1;
		}
		var goodData =  {
			goodsID:goodsID,
			goodsNum:goodsNumber
		}
		goodData = JSON.stringify(goodData);
		localStorage.setItem(goodDataTpye,goodData)
	}else{
		window.location.href="login.html";
	}
})

$('#thelist').on('click','.clickarea',function(){
	var goodsID = $(this).attr('data-goodsID');
	console.log(goodsID);
	   window.location.href = 'goodsDetail.html?goodsID='+goodsID;
	var params = {
		goodsID:goodsID,
	}
	$.ajax({
		url:'http://datainfo.duapp.com/shopdata/getGoods.php',
		type:'get',
		data:params,
		dataType:'jsonp',
		success:function(data){
			console.log(data);
		}
	})
})



