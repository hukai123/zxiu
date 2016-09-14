
//依赖全局对象
var golbalObj = require('./golbalObj');

//定义金币对象
function goldObj(opt){
	this.config = {
		id:null,
		size:10,
		speed:5,
		pos:{x:0,y:0},
		class:"y",    //y表示黄色  r表示红色
		score:10
	};
	for(var i in opt){
		this.config[i] = opt[i];
	};
	this.ele = null;   //存储每一个金币的Dom对象
}

goldObj.prototype = {
	//在游戏区gameBox里创建金币div;
	create:function(){
		var ele = document.createElement('div');
		ele.className = "gold "+this.config.class;
		ele.style.cssText = "width:"+this.config.size+"px;height:"+this.config.size+
		"px;left:"+this.config.pos.x+"px;right:"+this.config.pos.y+"px;border-radius:"+this.config.size/2+"px;"
		//生成金币
		golbalObj.gameBox.appendChild(ele);
		this.config.score = parseInt((this.config.speed+(200/this.config.size))*0.35);
		//把对应的金币的left和top存到this.ele中
		this.ele = ele;
	},
	//金币的运动函数
	move:function(){
		this.config.pos.y += this.config.speed;
		this.ele.style.top = this.config.pos.y + "px";
		this.dropListener();
	},
	//删除金币的方法
	delete:function(){
		//在页面删除金币这个dom节点
		golbalObj.gameBox.removeChild(this.ele);
		//删除 全局属性的里面 goldAll 对应id 的金币
		//删除数组里面对应键的对象
		delete golbalObj.goldAll[this.config.id];
	},
	//统计游戏分值
	countScore:function(){
		//小车和金币碰撞，就要累计求和金币
		golbalObj.sumScore+=this.config.score;
		this.delete();
		golbalObj.scoreBox.innerHTML = golbalObj.sumScore;
	},
	//判断金币和小车碰撞
	dropListener:function(){
		if(this.config.pos.y>golbalObj.box_size.height){
			this.delete();
		}

		//小车left top
		var carSize = {
			w:golbalObj.car.config.size.width/2,
			h:golbalObj.car.config.size.height/2,
		}
		var carPos = {
			x:golbalObj.car.config.pos.x+carSize.w,
			y:golbalObj.car.config.pos.y+carSize.h
		}
		
		//金币的left top  内心
		var thisGoldSize = {
			w:this.config.size/2,
			h:this.config.size/2,
		}
		var thisGoldPos = {
			x:this.config.pos.x+thisGoldSize.w,
			y:this.config.pos.y+thisGoldSize.h
		}
		// p碰撞临界条件
		if(Math.abs(carPos.x-thisGoldPos.x)<(carSize.w+thisGoldSize.w)&&
			Math.abs(carPos.y-thisGoldPos.y)<(carSize.h+thisGoldSize.h)){
			this.countScore();
		}
	}
}

module.exports = goldObj;




