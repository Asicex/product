$(function(){
	//自动聚焦
	$(".login-user").focus();
	//验证
	function validate(){
		var cookieUser = getCookie("phone");
		var cookiePwd = getCookie("pwd");
		var user = $(".login-user").val();
		var pwd = $(".login-pwd").val();
		if( user == cookieUser && pwd == cookiePwd ){
			alert("登录成功");
			location.href = "index.html";
		}else{
			alert("用户名或密码错误");
		}
	}
	$(".login-submit").click(function(){
		validate();
	})
})
