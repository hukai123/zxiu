function getGoodsData(classID,pageCode,linenumber,slide){
	var thisClassID = classID?classID:0;
	var thisPageCode = pageCode?pageCode:0;
	var thisSlide = slide?slide:0;
	var thisLineNumber = linenumber?linenumber:6;
	var params = {
		classID:thisClassID,
		pageCode:thisPageCode,
		linenumber:thisLineNumber
	}
	$.ajax({
		url:'http://datainfo.duapp.com/shopdata/getGoods.php',
		type:'get',
		data:params,
		dataType:'jsonp',
		success:function(data){
			console.log(data.length);
			if(data.length){
				$.each(data,function(i){
					var oldPrice = parseInt(data[i].price*data[i].discount*0.1);
					var oLi = $("<li><dl><dt><img src="+data[i].goodsListImg+"></dt><dd><h3>"+data[i].goodsName+"</h3><div><b class='price'>￥"+oldPrice+"</b><span class='oldprice'>￥"+data[i].price+"</span></div><span class='discount'>"+data[i].discount+"折</span><a href='#'></a></dd></dl></li>")
					$('#thelist').append(oLi);
				});
			}
		}
	})
}

module.exports = getGoodsData();