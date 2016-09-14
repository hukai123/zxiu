
var $ =require('./jquery-1.10.1.min.js');

// 更新购物车
refreshCar();
function refreshCar(){
	var reg = /^gdType_/;
	var length = localStorage.length;
	var userID = localStorage.getItem('username');
	for(var i=0;i<length;i++){
		var key = localStorage.key(i);
		if(reg.test(key)){
			var thisGoods = JSON.parse(localStorage.getItem(key));
			console.log(thisGoods);
			var goodsID =thisGoods.goodsID;
			var number = thisGoods.goodsNum;
			updateCar(userID,goodsID,number);
		}
	}
}
//购物车更新ajajx
function updateCar(userID,goodsID,number){
	var param = {
		userID:userID,
		goodsID:goodsID,
		number:number
	}
	$.ajax({
		url:'http://datainfo.duapp.com/shopdata/updatecar.php',
		type:'post',
		data:param,
		success:function(data){
			console.log(data);
		}
	})
}

//查看购物车
function getCar(){
	var userID = localStorage.getItem('username');
	console.log(userID);
	var param = {
		userID:userID
	}
	$.ajax({
		url:'http://datainfo.duapp.com/shopdata/getCar.php',
		type:'get',
		
	})
}

var load = require('./loadfooter.js');
load.loadHtml(2);


