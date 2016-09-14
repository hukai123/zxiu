var $ = require('../js/jquery-1.10.1.min.js');
//加载footer
var l = require('../js/loadfooter.js');
l.loadHtml(3);

//依赖全局对象 
var golbalObj = require('./golbalObj.js');
//console.log(golbalObj.box_size.width);

//依赖小车对象
var carObj = require('./carObj.js');

//依赖金币对象
var goldObj = require('./goldObj.js');

//创建实例化小车
function createCar(){
	var size = {
		width:50,
		height:30
	};
	var pos = {
		x:(golbalObj.box_size.width-size.width)/2,
		y:golbalObj.box_size.height-size.height
	};

	//实例化小车,给golbalObj.car
	golbalObj.car = new carObj({
		size:size,
		pos:pos
	})
	//
	golbalObj.car.create();
}

//实例化并创建金币
function createGold(){
	var id = getId();
	var date = new Date();
	var sec = date.getSeconds();    //获取当前时间撮的秒
	var colorClass = (sec%2)?"y":"w" ;
	golbalObj.goldAll[id] = new goldObj({
		id:id,
		speed:getSpeed(),
		pos:getPos(),
		size:getSize(),
		class:colorClass
	});
	golbalObj.goldAll[id].create();
}

//点击开始游戏
clickStartGame();
function clickStartGame(){
	$("#start-game").on("click",function(){
		$(".shade").hide();
		gameInit();
		gamePlay();
	})
}

//重复游戏和回放游戏
function resetGame(){
	golbalObj.car.death();
	for(var i in golbalObj.goldAll){
		//遍历金币对象，添加move,让金币掉落
		golbalObj.goldAll[i].delete();
	}
	var  opt = {
		timer:null,
		code:0,
		car:null,
		goldAll:{},
		timeMax:20,
		sumScore:0
	}
	$.extend(golbalObj,opt);
}

$(".replay").on("click",function(){
	$(".shade1").hide();
	gameInit();
	gamePlay();
})
$(".review").on("click",function(){
	$(".shade1").hide();
	gameInit();
})

//查看排行榜
function getRank(){
	var userID = localStorage.getItem('username');
	var param = {
			userID:userID,
			gname:golbalObj.gameName
		}
	$.ajax({
		url: 'http://datainfo.duapp.com/gamesinfo/catchgolds/rankinglist.php',
		type: 'get',
		dataType:'jsonp',
		data: param,
		success: function (data) {
			console.log(data);
		}
	});
}
$(".getrank").on('click',function(){
	getRank();

})


//初始化游
function gameInit(){
	var time = "00:00:"+golbalObj.timeMax;
	golbalObj.timeBox.innerHTML = time;
	golbalObj.scoreBox.innerHTML = golbalObj.sumScore;
}

//开始游戏函数
function gamePlay(){
	createCar();
	addOperation();
	golbalObj.timer = setInterval(function(){
		golbalObj.code++;
		//每一秒生成一枚金币
		if(golbalObj.code%golbalObj.fps==0){
			createGold();
			golbalObj.timeMax--;
			golbalObj.timeBox.innerHTML ="00:00:"+setNum(golbalObj.timeMax);
		}
		if(golbalObj.timeMax==0){
			gameOver();
		}
		for(var i in golbalObj.goldAll){
			//遍历金币对象，添加move,让金币掉落
			golbalObj.goldAll[i].move();
		}
		golbalObj.car.move();
	},1000/golbalObj.fps)
}

//游戏结束函数
function gameOver(){

	clearInterval(golbalObj.timer);
	$(".thisScore").html(golbalObj.sumScore);
	$(".shade1").show();
	resetGame();
	var userID = localStorage.getItem('username');
	var param = {
		userID:userID,
		score:golbalObj.sumScore,
		gname:golbalObj.gameName
	}
	$.ajax({
		url: 'http://datainfo.duapp.com/gamesinfo/catchgolds/gamesubmit.php',
		type: 'post',
		data:param,
		success: function(data){
			console.log(data);
		}
	});

}

//给gameBox绑定一个点击事件click、touchstart  操作小车
function addOperation(){
	golbalObj.gameBox.addEventListener('click',function(e){
		var e = window.event||e;
		//鼠标相对于当前元素的位置， offsetX表示左边距离
		var oLeft = e.offsetX;
		var carLeft = golbalObj.car.config.pos.x + golbalObj.car.config.size.width;
		if(oLeft>carLeft){
			golbalObj.car.config.dir = "right";
		}else{
			golbalObj.car.config.dir = "left";
		}
	})
	// function handleOrientation(orientData) {
//   var absolute = orientData.absolute;
//   var alpha = orientData.alpha; z
//   var beta = orientData.beta;  x
//   var gamma = orientData.gamma; y

//   // Do stuff with the new orientation data
// }
// DeviceOrientationEvent.alpha 表示设备沿z轴上的旋转角度，范围为0~360。
// DeviceOrientationEvent.beta 表示设备在x轴上的旋转角度，范围为-180~180。它描述的是设备由前向后旋转的情况。
// DeviceOrientationEvent.gamma 表示设备在y轴上的旋转角度，范围为-90~90。它描述的是设备由左向右旋转的情况。
	function handleOrientation(event) {
	  var x = event.beta;  // In degree in the range [-180,180]
	  var y = event.gamma; // In degree in the range [-90,90]
	  var z = event.alpha; // In degree in the range [0,360]
	  // golbalObj.scoreBox.innerHTML = y;
	  	if(y>0){
			golbalObj.car.config.dir = "right";
		}else{
			golbalObj.car.config.dir = "left";
		}
	}
	// 监测设备是否在摆动  deviceorientation
	window.addEventListener('deviceorientation', handleOrientation);

}

//随机生成16位ID
function getId(){
	var arr = "qwertyuiopasdfghjklzxcvbnm0123456789QWERTYUIOPASDFGHJKLZXCVBNM";
	var id = "a";
	for (var i = 0;i<15; i++){
		id+=arr[Math.floor(Math.random()*62)];
	}
	return id
}

//获取金币下落的随机速度 2-8
function getSpeed(){
	return  Math.floor(Math.random()*6)+2;
}

//获取金币随机宽度 10-30
function getSize(){
	return Math.floor(Math.random()*20)+10;
}

//获取金币下落的随机 left 
function getPos(){
	var pos = {
		x:Math.floor(Math.random()*(golbalObj.box_size.width-30)),
		y:0
	}
	return pos;
}
function setNum(n){
	if(n<10){
		n = "0"+n;
	}
	return n;
}
