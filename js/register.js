$(function(){
	//自动聚焦
	$(".form-phone").focus();
	//验证手机号，密码
	function validatePhone(){
		var valPhone = $(".form-phone").val();
		var regPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
		if(!regPhone.test(valPhone)){
			$(".form-phone").css("border-color","#f00");
			return false;
		}else{
			$(".form-phone").css("border-color","#aaa");
		}
		return true;
	}
	function validatePwd(){
		var valPassword = $(".form-password").val();
		var regPassword = /^.{6,16}$/;
		if(!regPassword.test(valPassword)){
			$(".form-password").css("border-color","#f00");
			return false;
		}else{
			$(".form-password").css("border-color","#aaa");
		}
		return true;
	}
	$(".form-phone").blur(function(){
		validatePhone();
	})
	$(".form-password").blur(function(){
		validatePwd();
	})
	$(".form-submit").click(function(){
		var flag = validatePhone() && validatePwd();
		if( flag ){
			setCookie( "phone" , $(".form-phone").val() );
			setCookie( "pwd" , $(".form-password").val() );
			alert("注册成功");
			//为什么写login.html,而不是../login.html
			//是去找相应的HTML文件，然后再去按路径查找
			location.href = "login.html";
		}
	})
})
