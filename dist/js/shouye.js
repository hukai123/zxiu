	
	require('./zepto.min');
	require('./swiper-3.3.1.jquery.min');
	require('./myiscroll');
	
	document.onselectstart=new Function("return false");
	$("#footer").load("../html/footer.html");
	function myswiperInit(){
		var myswiper = new Swiper('#myswiper',{
			autoplay:true,
			speed:3000,
			loop:true,
			pagination:'.swiper-pagination',
			//定义分页器
			paginationClickable:true,
			//分页器button可否点击 true 可以点击
			paginationType:'bullets',
		})
	}  
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getBanner.php",
		async:true,
		dataType:'jsonp',
		success:function(data){
			console.log(data);
			if(data.length){
				$.each(data,function(i){
					var dataImgUrl = JSON.parse(data[i].goodsBenUrl);
					var myslide = $("<div class='swiper-slide'><img src="+dataImgUrl[0]+" alt="+data[i].goodsName+" data-goodsID="+data[i].goodsID+" /></div>")
					myslide.appendTo($(".swiper-wrapper"));

				})
				myswiperInit();
			}
			
		}
	})