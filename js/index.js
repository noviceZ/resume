
//相册功能判定条件
var flag = true;

window.onload = function() {
	
	//文字闪烁
	wordsFlashing();
	
	//滚动条滚动到正文
	scrollDocu();
	
	//判断窗口宽度阻止某些操作
	windowWidth();
	
	//弹窗函数
	if(flag){
		popover()
	}
	
}

//定义弹窗函数，获取图片元素和关闭按钮操作        
function popover() {
	//获取弹窗内的img对象，设置成全局变量
	popid = document.getElementById("popid");
	//获取图片元素class
	var imgclick = document.getElementsByClassName("img-click");
	//循环遍历元素，当点击某个图片时，特定的图片响应
	for(var i = 0; i < imgclick.length; i++) {
		
		imgclick[i].onclick = (function(i) {
			
			return function() {
				
				popWindows();
				largeImg(i);
			}
		})(i);
	}
	
	//关闭按钮功能
	var close = document.getElementById("close");
	close.onclick = function() {
		
		var popover = document.getElementById("popover");
		popover.className = popover.className.replace("popover-after","popover-before");
	}
}

//弹窗函数,只需要做一次，所以单独拿出来    
function popWindows(){  
	//获取弹窗
	var popover = document.getElementById("popover");
	//将弹窗弹出(做为固定背景),此时popover弹窗的类的样式为class="popover-after"
	popover.className = popover.className.replace("popover-before","popover-after");
}

//图片弹窗显示函数       
//获取点击到的是哪个图片之后，就将对应图片放大，这里第一张图片的编号是0，count获取到了点击到的哪张图片的id
function largeImg(count) {
	//获取被点击的图片
	var img = document.getElementById(count);
	//获取该图片的src
	var src = img.getAttribute("src");
	//获取该图片的alt
	var alt = img.getAttribute("alt");
	//设置弹窗图片的src
	popid.setAttribute("src", src);
	//设置弹窗图片的alt
	popid.setAttribute("alt", alt);
	
	//获取这个id的值(也就是那个数字用于传递后的计算)
	var imgcount = img.getAttribute("id");
	//将字符串转换成number类型便于计算
	imgcount = parseInt(imgcount);
	
	lrArrow(imgcount);
}

//箭头切换图片的数据传递函数      
function lrArrow(count) {
	//左右箭头
	var left = document.getElementById("left");
	var right = document.getElementById("right");
	
	left.onclick = function() {
		ArrPhotos(count, -1);
	}
	right.onclick = function() {
		ArrPhotos(count, 1);
	}
}

//箭头切换图片函数       
function ArrPhotos(m, n) {
	var countnow = m + n;
	//判断当前值是否小于0或者大于4
	if(countnow < 0) {
		
		countnow = 4;
	}else if(countnow > 4) {
		
		countnow = 0;
	}
	
	largeImg(countnow);        
}


//判断屏幕宽度阻止某些操作函数
function windowWidth() {
	
	//当页面宽度小于768时，阻止相册功能
	if(document.body.clientWidth < 768) {
		
		flag = false;
	}
}


//文字闪烁函数
function wordsFlashing() {
	var mytext = ["兴趣爱好&InterestsAndHobbies", "音乐&music", "尤克里里&ukulele","足球&football",
		"跑步&running", "游戏&games", "阅读&reading"];
	//获取要闪烁的文字对象
	var worfashing = document.getElementById("words");
	//设置定时器，循环显示数组里的文本
	var i = 1;
	setInterval(function() {
		
		if(i >= mytext.length) {
			
			i = 0;
		}
		
//		//设置初始透明度
//		var opacity = 0;
//		//初始的内容递减，因为这个是最开始显示在html的，不是在数组里更换的，
//			//所以最开始的那个不参与这个透明度的变换，需要单独设定
//		
//		//没15ms递增一次，从0-1，再从1-0正好是3s，文字内容更换
//		var stop = setInterval(function(){
//			if(opacity <= 0) {
//				decop = 0.01;
//			}else if(opacity > 1) {
//				decop = -0.01;
//			}
//			opacity += decop;
//			worfashing.style.opacity = opacity;
//		}, 15);
		
		worfashing.innerText = mytext[i];
		i++;
		
	}, 2000);
}

function scrollDocu() {
	//计算home的高度
	var homeheight = document.getElementById("home").clientHeight;
	//计算头像高度
	var headheight = document.getElementById("part-1").getElementsByTagName("img")[0].clientHeight;
	
//	console.log($("body.html").scrollTop())
	
	//点击"开始了解"按钮后滚动条滚动到指定位置
	document.getElementById("go").onclick = function() {
		
		$("body,html").animate({
			scrollTop:homeheight-headheight/2
		}, 1500)
	}
}
