var $ = require('./jquery-1.10.1.min.js');
//加载footer
// var l = require('./loadfooter。js');
// l.loadHtml(3);

$('#btn').on('click',function(){
	$('#btn').addClass('disabled');
	var allBox = $('.gameBox .box');
	var newArr = getArr(allBox);
	var speed = 10;
	var oIndex = 0;
	var arrNum = [0,1,1,1,1,1,1,1,2,2];
	var win = arrNum[getRandom(10,0)];
	action();
	function action(){
		setTimeout(function(){
			newArr.eq(oIndex).addClass('touch').siblings().removeClass('touch');
			oIndex++;
			speed+=30; 
			if(oIndex>7){
				oIndex = 0;
			} 
			if(speed>=500){
			 	speed=500;
			 	if(lottery[win].thisNum==oIndex-1){
			 		alert('恭喜你,获得'+lottery[win].lot);
			 		$('#btn').removeClass('disabled');
			 	}else{
			 		action();
				}
			}else{
			 	action();
			}
		},speed)
	}
})

//只能中奖的数组对象
var lottery = [
	{thisNum:0,lot:'手表',lotteryId:0},
	{thisNum:4,lot:'谢谢惠顾',lotteryId:7},
	{thisNum:5,lot:'红包',lotteryId:6}
]

//设置 高亮块的滚动路径
function getArr(arr){
	var newArr = [];
	newArr[0] = arr[0];
	newArr[1] = arr[1];
	newArr[2] = arr[2];
	newArr[3] = arr[4];
	newArr[4] = arr[7];
	newArr[5] = arr[6];
	newArr[6] = arr[5];
	newArr[7] = arr[3];
	return $(newArr);
}

//获取8以内的随机整数
function getRandom(max,min){
	return min + Math.floor(Math.random()*(max-min));
}

