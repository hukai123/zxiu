var $ = require('./jquery-1.10.1.min');

// 判断当前页面url
getUrlData();
function getUrlData(){
	var src = window.location.href;
	console.log(src.indexOf("&userID="))
	if(src.indexOf("&userID=")!=-1){
		var username = src.split("&userID=")[1].split('&')[0];
	}else{
		alert(123);
		$('#nameinp').focus();
	}
	if(username!=""||username!="undefined"){
		// console.log(true);
		$("#nameinp").val(username);
		$('#passinp').focus();
	}
}


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

var placeholders={"nameinp":"请输入账号","passinp":"请输入密码"};
// 验证 账号 和 密码
function validInfo(){
	var pass = true;
	var param = "";

	// 验证用户名
	if($.trim($('#nameinp').val())!=""){
		if(_initRegExp.chkUserAccount($.trim($('#nameinp').val()))){
			param = param + "&userID="+$('#nameinp').val();
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
	if($.trim($('#passinp').val())!=""){
		if(_initRegExp.chkPassword($.trim($('#passinp').val()))){
			param = param + "&password="+$('#passinp').val()+"&status=login";
			console.log(param);
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
login()  
function login(){
	$('#login').on('click',function(){
		validInfo();
		// 出来冒泡
		// return false;
	})
}

// 请求注册接口
function submit(param){
	// 点击提交 正则通过后显示 提交ing...
	setUserInfoLocal();
	showtip(false,false,"正在提交...");
	$.ajax({
		url:'http://datainfo.duapp.com/shopdata/userinfo.php',
		timeout:30000,
		type:'post',
		data:param,
		success:function(data){
			// console.log(data);
			// var mydata = JSON.parse(data);
			// console.log(mydata[0]);
			var msg = "";
			if(data==0){
				msg = "用户名不存在";
				showtip(true,true,msg);
			}else if(data==2){
				msg = "用户名密码不符"
				showtip(true,true,msg);
			}else{
				data = JSON.parse(data);
				window.location.href ="shouye.html?"+param;
			}
		}
	})
}

// 显示密码
showPwd();
function showPwd(){
	var showPwdFlag = true;
	$("#showpwd").bind('click',function(){
		if(showPwdFlag){
			$("#passinp").attr('type',"text");
		}else{
			$("#passinp").attr('type',"password");
		}
		showPwdFlag = !showPwdFlag;
	})
}

//用户登录信息通过cookies 保存到本地
function setUserInfoLocal(){
	var username = $('#nameinp').val();
	var password = $('#passinp').val();
	// md5加密
	if(username!=""||username!="undefined"){
		// sessionStorage.setItem('username',username);
		localStorage.setItem('username',username);
	}
	if(password!=""||password!="undefined"){
		// sessionStorage.setItem('password',password);
		localStorage.setItem('password',password);
	}
}


// 设置是否自动登录的localStorage
autoLogin()
function autoLogin(){
	var flag = true;
	$('#autologin').bind('click',function(){
		localStorage.setItem('autoLoginFlag',flag);
		flag = !flag;
	})
}


// 自动登录逻辑
autoGoIndex();
function autoGoIndex(){
	var autoFlag = localStorage.getItem('autoLoginFlag');
	console.log(autoFlag);
	if(autoFlag==""||autoFlag=="undefined"){
		return false;
	}
	if(autoFlag){
		var username = localStorage.getItem('username');
		var password = localStorage.getItem('password');
		var param = "&userID="+username+"&password="+password+"&status=login";
		$.ajax({
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			timeout:30000,
			type:'post',
			data:param,
			success:function(data){
				console.log(data);
				var msg = "";
				if(data==0){
					msg = "用户名不存在";
					showtip(true,true,msg);
				}else if(data==2){
					msg = "用户名密码不符"
					showtip(true,true,msg);
				}else{
					data = JSON.parse(data);
					window.location.href ="shouye.html?"+param;
				}
			}
		})
	}
}








