<?php  
	//查看php的一些信息  
	// phpinfo();
	// exit();
	
	$today = $_GET["today"];
	// echo $today;
	
	//ssl安全层
	$url = 'https://moment.douban.com/api/stream/date/'.$today.'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

	//file_get_contents() 读取http协议时可以正常  读取https协议时  需要修改php的配置 
	//修改php.ini 里的;extension=php_openssl.dll 前面的分好去掉
	$result = file_get_contents($url);

	echo $result;
?>