require('./zepto');
var arrHtml = ['shouye','shopList','shoppingCar','myxiu','more'];

// 手机端的点击事件 (300ms)
$('#footer ul').on('touchstart','li',function(){
	// window.location.href =""
	var oIndex = $(this).index();
	// window.location.href = arrHtml[oIndex]+'.html';
	getHashFromLoacl(oIndex);
})

//取出对应的li的下标，并存到本地hash去
function getHashFromLoacl(oIndex){
	var reg = /^htmlHash_/;
	for(var i=0; i<localStorage.length;i++){
		var key = localStorage.key(i);
		if(reg.test(key)){
			var thisIndex = key.split('_')[1];
			if(thisIndex==oIndex){
				var htmlHashData = localStorage.getItem(key);
				window.location.href = htmlHashData+'.html';
			}
		}
	}
}

