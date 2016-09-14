var $ = require('./jquery-1.10.1.min.js');

function loadfooter(oIndex){
	$('.footer-container').load('footer.html',function(){
	//	console.log('公共底部加载成功');
		$('#footer ul li').eq(oIndex).addClass('active').siblings().removeClass('active');
		var src = window.location.href;
		var thisHtml = src.split('/');
		var thisHTmlHash = null;
		for(var i in thisHtml){
			if(thisHtml[i].indexOf('.html')!=-1){
				thisHTmlHash = thisHtml[i].split('.html')[0];
			}
		}
		// 修改存储到本地对应的hash值
		var reg = /^htmlHash_/;
		if(localStorage.length){
		//	console.log(1);
			for(var i=0;i<localStorage.length;i++){
				var key = localStorage.key(i);
				if(reg.test(key)){
					var thisIndex = key.split('_')[1];
				//	console.log(thisIndex);
					if(thisIndex==oIndex){
						localStorage.setItem(key,thisHTmlHash)
					}
				}
			}
		}
	});
}


module.exports = {
	loadHtml:loadfooter
}



