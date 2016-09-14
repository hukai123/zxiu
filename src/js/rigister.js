// require('./zepto.min');
var $ = require('./jquery-1.10.1.min');


/*
需求：
账号：
6-16位 英文字母
*/


//正则对象
var _initRegExp = {
    chkphone:function(str){
        var reg=new RegExp("^0?(13|15|18|14|17)[0-9]{9}$");
        // var reg = "/^0?(13|15|18|14|17)[0-9]{9}$/";
        return reg.test(str);
    },
    chkEmail: function (str){
		var reg = new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$");
		return reg.test(str);
	},
	chkPassword:function(str){
		// var reg = new RegExp("/^[0-9]{6,18}$/");
		var reg = new RegExp("^[A-Za-z0-9]{6,12}$");
		return reg.test(str);
	},
    chkHZlength:function(str,mi,ma){
	    var slength=str.replace(/[\u0391-\uFFE5]/g, "aa").length;
	    return slength>=mi&&slength<=ma;
	},
	chkUserAccount:function(str){
		// var reg = new RegExp("^\w{8,18}$");
		var reg = /^\w{8,18}$/;
		return reg.test(str);
	}
}

var placeholders={"account":"请输入账号","loginpwd":"请输入密码","dbpwd":"请确认密码"};
// 验证 账号 和 密码
function validInfo(){
	var pass = true;
	var param = "";

	// 验证用户名
	//$.trim() 去除空格
	if($.trim($('#account').val())!=""){
		if(_initRegExp.chkUserAccount($.trim($('#account').val()))){
			param = param + "&userID="+$('#account').val();
		}else{
			pass = false;
			param = "请输入8-18位的字符";
			showtip(true,pass,param);
			return;
		}
	}else{
		pass = false;
		param = "请输入账户";
		showtip(true,pass,param);
		return false;
	}

	// 验证密码

	if($.trim($('#loginpwd').val())!=""){
		if(_initRegExp.chkPassword($.trim($('#loginpwd').val()))){
			param = param + "&password="+$('#loginpwd').val();
		}else{
			pass = false;
			param = "请输入字母数字6-12位密码";
			showtip(true,pass,param);
			return;
		}
	}else{
		pass = false;
		param = "请输入密码";
		showtip(true,pass,param);
		return;
	}
	// 确认密码
	if($.trim($('#dbpwd').val())!=""){
		if(_initRegExp.chkPassword($.trim($('#dbpwd').val()))){
			if($.trim($('#dbpwd').val())==$.trim($('#loginpwd').val())){
				//全部确认通过 2次密码一样 添加 注册 状态 
				param = param + "&status=register";
				console.log(param);
			}else{
				pass = false;
				param = "2次密码输入不一致";
				showtip(true,pass,param);
				return;
			}
		}else{
			pass = false;
			param = "请输入字母数字6-12位确认密码";
			showtip(true,pass,param);
			return;
		}
	}else{
		pass = false;
		param = "请输入确认密码";
		showtip(true,pass,param);
		return;
	}

	if(pass){
		submit(param);
	}
}

// showtips 提示
function showtip(l,t,i){
    if(l){
        $(".s-tsdialog").find("em").removeClass("loading").addClass("loser");
    }else{
        $(".s-tsdialog").find("em").removeClass("loser").addClass("loading");
    }
    $(".s-tsdialog").find("p").text(i);
    $(".s-tsdialog").css("display","block").stop().animate({opacity: 1},3000,function(){
        $(this).css("display","none");
    });

    if(t){
        for(k in placeholders){
        $("#"+k).val("");
        $("#"+k).text(placeholders[k]).show();
        }
    }
}

// 注册
rigister()  
function rigister(){
	$('.submit').on('click',function(){
		validInfo();
		// 出来冒泡
		// return false;
	})
}

// 请求注册接口
function submit(param){
	// 点击提交 正则通过后显示 提交ing...
	showtip(false,false,"正在提交...");
	$.ajax({
		url:'http://datainfo.duapp.com/shopdata/userinfo.php',
		timeout:30000,
		type:'post',
		data:param,
		success:function(data){
			console.log(data);
			var msg = "";
			// switch (data)
			// {
			// 	case 0:
			// 	msg = "用户名重名"
			// 	break;
			// 	case 1:
			// 	msg = "注册成功"
			// 	break;
			// 	case 2:
			// 	msg = "数据库报错"
			// 	break;
			// 	default:;
			// }
			if(data==0){
				msg = "用户名重名"
			}
			else if(data==1){
				msg = "注册成功";
				window.location.href ="login.html?"+param;
			}else if(data==2){
				msg = "数据库报错"
			}
			// console.log(msg)
			if(data!=1){
				showtip(true,true,msg);
			}
		}
	})
}

// $('.z-xgpwd-submit').unbind('keydown').bind('keydown',function(e){
// 	if(e.keyCode == 13){
// 		//绑定enter登录
// 		$('.z-xgpwd-submit').click();
// 	}
// });