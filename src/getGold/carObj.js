

//依赖全局对象
var golbalObj = require('./golbalObj');

//定义小车对象
function carObj(opt){
	this.config = {
		id:null,
		size:{width:50,height:30},     //小车的宽高
		speed:5,                  //小车的移动速度
		pos:{x:0,y:0},            //小车开始的坐标(left right)
		dir:"right",    //right表示向右运动   left表示向左运动
	}
	//把传进来的opt的参数赋值给this.config这属性
	for(var i in opt){
		this.config[i] = opt[i];
	}
	// $.extend(this.config,opt) 与上面for in 实现一样的功能

	this.ele = null;
}

//添加原型方法
carObj.prototype = {
	//创建小车添加到gameBox这个div中去
	create:function(){
		var ele = document.createElement('div');
		ele.className = "mycar";
		//cssText 是css样式集合,批量处理css样式的属性，优点高效，缺点是覆盖
		ele.style.cssText = "width:"+this.config.size.width+"px;height:"+this.config.size.height+
		"px;top:"+this.config.pos.y+"px;left:"+this.config.pos.x+"px;"
	//在游戏区域生成一个小车
		golbalObj.gameBox.appendChild(ele);
		this.ele = ele;
	},
	move:function(){
		switch(this.config.dir){
			case "right":
				this.config.pos.x+=this.config.speed;
				break;
			case "left":
				this.config.pos.x-=this.config.speed;
				break;
		}
		this.moveListener();
		this.ele.style.left = this.config.pos.x+"px";
	},
	moveListener:function(){
		if(this.config.pos.x<0){
			this.config.pos.x=0;
		}
		else if(this.config.pos.x>golbalObj.box_size.width-this.config.size.width){
			this.config.pos.x=golbalObj.box_size.width-this.config.size.width;
		}

	},
	death:function(){
		golbalObj.gameBox.removeChild(this.ele);
	}
}
module.exports = carObj;



