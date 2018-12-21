$(function(){
	//导航，点击显示商品分类
	$(".classify").click(function(){
		$(".classify-container").toggle(1000);
	})
	//悬浮小图显示大图
	$(".good-small").mouseenter(function(){
		$(".good-big").css("display","block");
		$(".good-mask").css("display","block");
	}).mouseleave(function(){
		$(".good-big").css("display","none");
		$(".good-mask").css("display","none");
	})
	$(".good-small").mousemove(function(e){
		var e = e || event;
		var x = e.pageX - $(".good-mirror").offset().left - $(".good-mask").width()/2;
		var y = e.pageY - $(".good-mirror").offset().top - $(".good-mask").height()/2;
		var maxX = $(".good-small").width()-$(".good-mask").width();
		var maxY = $(".good-small").height()-$(".good-mask").height();
		x = Math.max( 0 , Math.min( x , maxX ) );
		y = Math.max( 0 , Math.min( y , maxY ) );
		$(".good-mask").css({
			"left" : x + "px",
			"top" : y + "px",
//			"background-position-x" : -x + "px",
//			"background-position-y" : -y + "px"
			"background-position" : -x + "px -" + y + "px"
		});
		var bigLeft = x * $(".good-bigimg").width() / $(".good-small").width();
		var bigTop = y * $(".good-bigimg").height() / $(".good-small").height();
		$(".good-bigimg").css({
			"left" : -bigLeft + "px",
			"top" : -bigTop + "px"
		})
	})
	//选项卡
	$(".good-links").children().click(function(){
		$(this).find("a").addClass("current").end()
			   .siblings().find("a").removeClass("current");
		$(".good-panels").children().eq( $(this).index() ).css("display","block")
						 .siblings().css("display","none");
	})
	//获取用户信息
	var user = getCookie("phone");
	if(user){
		var strUser = `<li>用户名: ${user}</li>
					<li>|</li>
					<li><a href="#"><i class="icon-phone"></i>手机APP</a></li>
					<li><a href="#"><i class="icon-service"></i>在线客服</a></li>`;
		$(".links_right").html(strUser);
	}
	//根据id获取相应的商品数据
	var param = window.location.href.split("?")[1];
	var filterId = param.split("=")[1];
	//点击后刷新时带上了#号
	var id = parseInt(filterId);
	$.ajax({
		type:"get",
		url:"js/info.json",
		async:true,
		success : function(res){
			var data = res[id];
			$(".good-small").find("img").attr("src",data.image);
			$(".good-mask").css("background",`url(${data.image}) no-repeat`);
			$(".good-mask").css("background-size",`350px 350px`);
			$(".good-bigimg").attr("src",data.image);
			var goodname = data.title + " " + data.subtitle;
			$(".good-info-name").find("span").html(goodname);
			$(".good-info-priceold").find(".good-info-price").html(data.oldprice);
			$(".good-info-pricenew").find(".good-info-price").html(data.price);
			var strDetail = "";
			var arrDetial = data.detail;
			for( var i = 0 ; i < arrDetial.length ; i++ ){
				strDetail += `<li><img src="${arrDetial[i]}"/></li>`;
			}
			$(".panel-image").html(strDetail);
		}
	});
})
