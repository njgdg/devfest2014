<?php
$con = mysql_connect("localhost","root","root");
if (!$con){
  die('Could not connect: ' . mysql_error());
}else{
	echo 'Connect successfully!';
}

// Create database
mysql_query("CREATE DATABASE devfest",$con);

// Create table in devfest database
mysql_select_db("devfest", $con);
$sql = "CREATE TABLE persons 
(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(32),
work VARCHAR(32),
phone VARCHAR(32),
job INT,
email VARCHAR(32),
experience INT
)";
mysql_query($sql,$con);

mysql_close($con);

// 报名
function sign_up($name, $work, $phone, $job, $email, $experience){
	echo $name . '-' . $work . '-' . $phone . '-' . $job . '-' . $email . '-' . $experience;
}
?>