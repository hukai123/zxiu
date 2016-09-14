require('./zepto.min');
require('./zepto-tap');
var $ =require('./jquery-1.10.1.min.js');
var load = require('./loadfooter.js');
load.loadHtml(0);

getTextFromUrl();
//获取地址栏的selectText
function getTextFromUrl() {
	var src = window.location.href;
	var selectText = src.split('?');
	console.log(selectText);
	for (var i in selectText) {
		if (selectText[i].indexOf('selectText=')!=-1) {
			var myselectText = selectText[i].split('selectText=')[1];
		}
	}
	myselectText = decodeURI(myselectText);
	//解码
	if(myselectText == 'undefined' || myselectText ==""){
		console.log(selectText);
	}else{
		$('.searchinp').val(myselectText);
		getSelectData(myselectText);
	}
}


$('#searchBtn').on('touchstart',function(){
	var selectInp = $('.searchinp').val();
	if(selectInp){
		getSelectData(selectInp);
	}else{
		alert('请输入关键字!');
	}
})

function getSelectData(selectInp){
	var params = {selectText:selectInp}
	$.ajax({
		url:'http://datainfo.duapp.com/shopdata/selectGoodes.php',
		type:'get',
		data:params,
		dataType:"jsonp",
		success:function(data){
			console.log(data);
			$('#thelist').html(" ");
			if(data==0){
				$('.noGoods').show().text('没有搜索到相关商品!');
				return;
			}
			if(data.length){
				$('.noGoods').hide();
				$.each(data,function(i){
					var oldPrice = parseInt(data[i].price*10/data[i].discount);
					var oLi = $("<li><dl><dt><img src="+data[i].goodsListImg+"></dt><dd><h3>"+data[i].goodsName+"</h3><div><b class='price'>￥"+data[i].price+"</b><span class='oldprice'>￥"+oldPrice+"</span></div><span class='discount'>"+data[i].discount+"折</span><a href='#'></a></dd></dl></li>")
					$('#thelist').append(oLi);
				});
			}else{
				$('.noGoods').show().text('没有搜索到相关商品!');
			}
		}
	})
}



$(window).scroll(function(){
	var oHeight = $("header").height();
	if($('body').scrollTop()>=oHeight){
		$('.searchBox').css({"position":"fixed","top":0,"left":0,"z-index":10});
	}else{
		$('.searchBox').css({"position":"relative"})
	}
})


