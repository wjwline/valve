//定义一个主模块
var Yike = angular.module("Yike",["ngRoute","controllers"]);

//首先这个页面是个单页面 那么对$routeProvider进行配置
Yike.config(["$routeProvider",function($routeProvider) {

	$routeProvider.when("/today",{
		templateUrl: "./views/today.html",
		controller: "todayController"
	})
	.when("/older",{
		templateUrl: "./views/older.html",
		controller: "olderController"
	})
	.when("/author",{
		templateUrl: "./views/author.html",
		controller: "authorController"
	})
	.when("/category",{
		templateUrl: "./views/category.html",
		controller: "categoryController"
	})
	.when("/favourite",{
		templateUrl: "./views/favourite.html",
		controller: "favouriteController"
	})
	.when("/settings",{
		templateUrl: "./views/settings.html",
		controller: "settingsController"
	})
	.when("/48",{
		templateUrl: "./views/list.html",
		controller: "listController"
	})
	.otherwise({
		redirectTo: "/today"
	});
}]);

//运行快 对根作用域进行初始化 初始化$rootScope
Yike.run(["$rootScope",function($rootScope) {

	//默认定义为false 默认不显示侧边栏
	$rootScope.collapsed = false;
	//定义一个全局方法实现动画效果
	$rootScope.toggle = function() {
		$rootScope.collapsed = !$rootScope.collapsed;

		//给侧边栏里面的每一个dd添加动画效果
		var navDdArr = document.querySelectorAll(".navs dd");
		//默认为false在关闭状态  点击之后变为true
		if($rootScope.collapsed) {
			for(var i=0,len=navDdArr.length;i<len;i++) {
				navDdArr[i].style.transitionDuration = 0.2 + "s";
				navDdArr[i].style.transitionDelay = i*0.15 + "s";
				navDdArr[i].style.transitionProperty = "all";
				navDdArr[i].style.transform = "translate(0)";
			}
		}
		else {
			for(var len=navDdArr.length-1,j=len;j>=0;j--) {
				navDdArr[j].style.transitionDuration = 0.2 + "s";
				navDdArr[j].style.transitionDelay = (len -j)*0.15 + "s";
				navDdArr[j].style.transform = "translate(-100%)";
			}
		}
		
	}

	$rootScope.goBack = function() {
		history.go(-1);
	}


}]);
