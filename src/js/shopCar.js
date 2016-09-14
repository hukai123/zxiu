var $ = require('./jquery-1.10.1.min.js');
//var load = require('./loadfooter');
//load.load(2);

// 更新购物车
refreshCar()
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
	getCar();
}

//购物车后台更新ajajx
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

// 删除某一条购物车商品  和本地存储数量
$('.goodsList').on('click','.deleteBtn',function(){
	var userID = localStorage.getItem('username');
	var goodsID = $(this).attr('data-goodsID');
	updateCar(userID,goodsID,0);
	// 可以添加一定的动画
	$(this).parents('li').remove();
	var thisGoods = 'gdType_'+goodsID;
	localStorage.removeItem(thisGoods);
	count();
})

// 添加商品到购物车(更新到后台)
add()
function add(){
	$('.goodsList').on('click','.addGood',function(){
		var goodsID = $(this).parents('li').attr('data-goodsid');
		var userID = localStorage.getItem('username');
		var thisGoods = 'gdType_'+goodsID;
		var thisGoodsData = JSON.parse(localStorage.getItem(thisGoods));
		var goodsNumber = thisGoodsData.goodsNum;
		goodsNumber++;
		$(this).prev().val(goodsNumber); 
		var dataInfo = {
			goodsID:goodsID,
			goodsNum:goodsNumber
		}
		dataInfo = JSON.stringify(dataInfo);
		localStorage.setItem(thisGoods,dataInfo);
		updateCar(userID,goodsID,goodsNumber);
		count();
	})
}

//购物车商品数量减少
desc();
function desc(){
	$('.goodsList').on('click','.descGood',function(){
		var goodsID = $(this).parents('li').attr('data-goodsid');
		var userID = localStorage.getItem('username');
		var thisGoods = 'gdType_'+goodsID;
		var thisGoodsData = JSON.parse(localStorage.getItem(thisGoods));
		var goodsNumber = thisGoodsData.goodsNum;
		goodsNumber--;
		$(this).next().val(goodsNumber);
		var dataInfo = {
			goodsID:goodsID,
			goodsNum:goodsNumber
		}
		dataInfo = JSON.stringify(dataInfo);
		localStorage.setItem(thisGoods,dataInfo);
		updateCar(userID,goodsID,goodsNumber);
		count();
	})
}

// 计算商品总量
function count(){
	var sum = 0;
	var account = 0;
	$('.goodsList li').each(function(index){
		var goodsNumer = parseInt($(this).find('.goodnumber').val());
		var goodsPrice = $(this).find('.googprice').text();
		console.log(goodsPrice);
		sum += goodsNumer;
		account += goodsNumer*goodsPrice;
		$('.goodsNum').html(sum);
		$('.moneySum').html(account);
	})
}

//  数量input value发送手动变化时
function countInpChange(){
	$('.goodsList').on('change','.goodnumber',function(){
		var goodsNumber = $(this).val();
		var userID = localStorage.getItem('username');
		var goodsID = $(this).parents('li').attr('data-goodsid');
		var thisGoodsType = 'gdType_'+goodsID;
		var thisGoodInfo = {
			goodsID:goodsID,
			goodsNum:goodsNumber
		}
		thisGoodInfo = JSON.stringify(thisGoodInfo);
		localStorage.setItem(thisGoodsType,thisGoodInfo);
		updateCar(userID,goodsID,goodsNumber);
		count();
	})
}



// 查看购物车 购物车数据遍历
function getCar(){
	var userID = localStorage.getItem('username');
	console.log(userID);
	var param = {
		userID:userID
	}
	$.ajax({
		url:'http://datainfo.duapp.com/shopdata/getCar.php',
		type:'get',
		data:param,
		dataType:'jsonp',
		success:function(data){
			console.log(data);
			if(data.length){
				$.each(data,function(i){
					var oLi = $("<li data-goodsID = "+data[i].goodsID+"><dl><dt><img src="+data[i].goodsListImg+"></dt><dd><h3>"+data[i].goodsName+"</h3><p><span>单价:</span><span class='pcolor'><b>￥</b><b class='googprice'>"+data[i].price+"</b></span></p><div><span>数量 : </span><input type='button' value='-' class='descGood'><input type='text' class='goodnumber' value="+data[i].number+"><input type='button' value='+' class='addGood'></div></dd><a class='deleteBtn' data-goodsID = "+data[i].goodsID+"></a></dl></li>");
					$('.goodsList').append(oLi);
				})
			}
			count();
			countInpChange();
		}
	})
}



