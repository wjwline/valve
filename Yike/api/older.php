<?php  

	//php中获取时间戳
	$time = time();
	// $today = date("Y-m-d",$time);
	
	//php中将时间戳函数转换成相应格式  strtotime可以相应的对时间进行加减 strtotime("-1day",$time)
	$yesterday = date("Y-m-d",strtotime("-1day",$time));

	$url = 'https://moment.douban.com/api/stream/date/'.$yesterday.'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

	$result = file_get_contents($url);
	echo $result;

?>