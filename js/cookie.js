//设置cookie值
function setCookie(key,value,day){
	if( day ){
		var d = new Date();
		d.setDate( d.getDate() + day );
		document.cookie = key + "=" + value + ";expires=" + d;
	}else{
		document.cookie = key + "=" + value;
	}
}
//获取cookie值
function getCookie(key){
	if(document.cookie){
		var str = document.cookie;
		var arr = str.split("; ");
		for( var i = 0 ; i < arr.length ; i++ ){
			var item = arr[i].split("=");
			if( item[0] == key ){
				return item[1];
			}
		}
		//如果没有key返回空字符串
		return "";
	}
	//如果没有document.cookie,返回空字符串
	return "";
}
//删除cookie
function removeCookie(key){
	setCookie(key,"",-1);
}
