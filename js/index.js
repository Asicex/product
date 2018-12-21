/*$(function(){
	var index = 0;
	function autoPlay(){
		index++;
		$(".guess-wrap").animate( {"left":-293*index} , 3000 , function(){
			if( index == 4 ){
				setTimeout(function(){
					$(".guess-wrap").animate( {"left":0} , 1000 );
					index = 0;
					autoPlay();
				},1000)
			}else{
				autoPlay();
			}
		} )
	}
	autoPlay();
})*/

$(function(){
	//轮播
	var index = 0;
	var timer = setInterval( autoPlay , 2000 );
	function autoPlay(){
		index++;
		if( index == 5 ){
			$(".guess-wrap").animate( {"left":0} , 1000 );
			index = 0;
		}
		$(".guess-wrap").animate( {"left":-293*index} , 1000 );
	}
	//悬浮停止
	$(".guess-slide").mouseenter(function(){
		clearInterval(timer);
	}).mouseleave(function(){
		timer = setInterval( autoPlay , 2000 );
	})
	//手动点击
	$(".guess-prev").click(function(){
		index--;
		if( index == -1 ){
			index = 0;
		}
		$(".guess-wrap").animate( {"left":-293*index} , 1000 );
	})
	$(".guess-next").click(function(){
		index++;
		if( index == 5 ){
			index = 4;
		}
		$(".guess-wrap").animate( {"left":-293*index} , 1000 );
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
	//循环创建商品页面结构
	var good = `
				<li class="product-item">
					<a href="###" class="product-link">
						<img src="img/pro1.jpg" alt="" />
						<h4>MEMEBOX 美美箱 </h4>
						<h3>甜蜜抱枕</h3>
					</a>
					<div class="product-shop">
						<div class="fix">
							<div class="price-box">
								<span>¥39.00</span>
								<div class="market-price">
									<span>¥79.00</span>
									<p>立省 ¥40.00</p>
								</div>
							</div>
							<button>加入购物车</button>
						</div>
					</div>
				</li>
				`;
	var strLi = "";
	for( var i = 0 ; i < 6 ; i++ ){
		strLi += good;
	}
	$(".product-list").html(strLi);
	//ajax获取接口数据
	$.ajax({
		type : "get",
		url : "js/info.json",
		async : true,
		success: function(res){
//			console.log(res)
			var arr = res;
			var $items = $(".product-item");
			for( var i = 0 ; i < arr.length ; i++ ){
				$items.eq(i).find("img").attr("src",arr[i].image);
				$items.eq(i).find("h4").html(arr[i].title);
				$items.eq(i).find("h3").html(arr[i].subtitle);
				$items.eq(i).find(".price-box").children("span").html(arr[i].price);
				$items.eq(i).find(".market-price").children("span").html(arr[i].oldprice);
				$items.eq(i).find(".market-price").children("p").html(arr[i].discount);
			}
		}
	});
	//点击商品进入相应的详情页
	$(".product-list").on( "click" , "li" , function(){
		var id = $(this).index();
		location.href = "detail.html?id="+id;
	} )
})
