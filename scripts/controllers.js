//定义一个用来管理控制器的模块 作为主模块的依赖
var controllers = angular.module("controllers",[]);

//定义一个控制today.html视图的控制器
controllers.controller("todayController",["$scope","$http","$filter","$rootScope",function($scope,$http,$filter,$rootScope) {
	//动态获取数据添加到today.html上 然后再展示到index.html的视图上
	//给每一个加标题
	$rootScope.title = "今日一刻";
	$rootScope.loaded = false;
	$rootScope.index = 0;

	$rootScope.header = true;
	var today = $filter("date")(new Date(),"yyyy-MM-dd");
	$http({
		url: "./api/today.php",
		method: "GET",
		params: {today: today}
	}).then(function successCallback(info) {
		$rootScope.loaded = true;
		$scope.date = info.data.date;
		$scope.posts = info.data.posts;
	})
}]);

//定义一个控制older.html视图的控制器
controllers.controller("olderController",["$scope","$http","$rootScope",function($scope,$http,$rootScope) {
	$rootScope.title = "往期内容";
	$rootScope.loaded = false;
	$rootScope.index = 1;

	$rootScope.header = true;
	$http({
		url: "./api/older.php" //解决跨域问题 通过服务器做一个代理
	}).then(function successCallback(info) {
		$rootScope.loaded = true;
		$scope.date = info.data.date;
		$scope.posts = info.data.posts;
	})

	//获取被卷去的距离
	function scroll() {
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	}
	//获取可视区域的高度
	function client() {
		if(window.innerHeight) {
			return window.innerHeight;
		}
		else if(document.compatMode == "CSS1Compat") {
			return document.documentElement.clientHeight;
		}
		else {
			return document.body.clientHeight;
		}
	}

	window.addEventListener("scroll",function() {
		if(Math.ceil(scroll()+client()) >= Math.floor(document.body.offsetHeight)) {
			$http({
				url: "./api/older.php" //解决跨域问题 通过服务器做一个代理
			}).then(function successCallback(info) {
				$scope.posts = $scope.posts.concat(info.data.posts);
				console.log($scope.posts);
			})
		}
	})

}]);


//定义一个控制author.html视图的控制器
controllers.controller("authorController",["$scope","$http","$rootScope",function($scope,$http,$rootScope) {
	$rootScope.title = "热门作者";
	$rootScope.loaded = false;
	$rootScope.index = 2;

	$rootScope.header = true;
	$http({
		url: "./api/author.php"
	}).then(function successCallback(info) {
		$rootScope.loaded = true;
		$scope.recAuthors = info.data.recAuthor.authors;
		$scope.allAuthors = info.data.allAuthor.authors;
	})
}]);

//定义一个控制category.html视图的控制器
controllers.controller("categoryController",["$scope","$http","$rootScope",function($scope,$http,$rootScope) {
	$rootScope.title = "栏目浏览";
	$rootScope.loaded = false;
	$rootScope.index = 3;

	$rootScope.header = true;
	$http({
		url: "./api/category.php"
	}).then(function successCallback(info) {
		console.log(info);
		$rootScope.loaded = true;
		$scope.columns = info.data.columns;
	})
}]);

//定义一个控制favourite.html试图的控制器
controllers.controller("favouriteController",["$rootScope",function($rootScope) {
	$rootScope.title = "我的喜欢";
	$rootScope.loaded = true;
	$rootScope.index = 4;

	$rootScope.header = true;
}]);



//定义一个控制settings.html视图的控制器 settings为静态页不需要控制器去服务器要数据
controllers.controller("settingsController",["$rootScope",function($rootScope) {
	$rootScope.title = "设置";
	$rootScope.loaded = true;
	$rootScope.index = 5;

	$rootScope.header = true;
}]);

//定义一个控制list.html视图的控制器 
controllers.controller("listController",["$rootScope",function($rootScope) {
	$rootScope.loaded = true;
	$rootScope.header = false;
}]);


//定义一个控制侧边栏视图的控制器
controllers.controller("navController",["$scope",function($scope) {

	$scope.navs = [
		{href: "#!/today",icon: "icon-home",text: "今日一刻"},
		{href: "#!/older",icon: "icon-file-empty",text: "往期内容"},
		{href: "#!/author",icon: "icon-pencil",text: "热门作者"},
		{href: "#!/category",icon: "icon-menu",text: "栏目浏览"},
		{href: "#!/favourite",icon: "icon-heart",text: "我的喜欢"},
		{href: "#!/settings",icon: "icon-cog",text: "设置"}
		// {href: "",icon: "",text: ""}
	]

}])