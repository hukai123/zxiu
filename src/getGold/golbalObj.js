//依赖jquery插件
var $ = require('../js/jquery-1.10.1.min.js');
//定义全局对象  添加各种全局属性
var golbalObj = {
	gameName:"getGold",
	box_size:{width:$("#game-box").width(),height:$("#game-box").height()},
	gameBox:document.getElementById('game-box'),
	timeBox:document.getElementById('time-box'),
	scoreBox:document.getElementById('score-box'),
	timer:null,
	fps:20,
	goldAll:{},   //金币对象
	code:0,
	car:null,    //小车对象
	timeMax:20,  //游戏时间
	sumScore:0	 //游戏得分
}


module.exports = golbalObj;


