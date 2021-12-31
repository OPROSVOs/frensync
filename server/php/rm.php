<?php

// CORS
header('Access-Control-Allow-Origin: https://boards.4chan.org');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: x-requested-with, if-modified-since');
header('Content-type: text/html; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {exit("ok");}


error_reporting (E_ALL ^ E_NOTICE);

// Flood Protection
include 'FloodProtection.php';
$myname = basename(__FILE__);
$FloodProtection = new FloodProtection($myname, 10, 60); #the 9 valid requests within 60sec (preflieght+post) assume /trash/ and /b/ at the same time + 1 retry
if($FloodProtection->check($_SERVER['REMOTE_ADDR'])){
    header("HTTP/1.1 429 Too Many Requests");
    //error_log("FloodProtection ".$myname.": (".$_SERVER['REMOTE_ADDR'].")");
    exit("[]");
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

#if ($_SERVER['REQUEST_METHOD'] === 'GET') {
#$p = test_input($_GET["p"]);
#$t = test_input($_GET["t"]);
#$b = test_input($_GET["b"]);
#}

// Grab the input and bring it to a safe state
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $p = test_input($_POST["p"]);
    $t = test_input($_POST["t"]);
    $b = test_input($_POST["b"]);
}else{
    header("HTTP/1.1 405 Method Not Allowed");
    exit("nope");
}

// input range check
if(!isset($p) or !is_numeric($p) or $p < 1 or $p > 4294967295 ){header("HTTP/1.1 406 Not Acceptable");exit("A");}
if(!isset($t) or !is_numeric($t) or $t < 1 or $t > 4294967295 ){header("HTTP/1.1 406 Not Acceptable");exit("B");}
if(!isset($b) or strlen($b) > 5 ){header("HTTP/1.1 406 Not Acceptable");exit("C");}

$db = new PDO('mysql:host=localhost;dbname=ns', 'ns', 'ns' );

// escape ' to \' to prevent the obvious
$p = $db->quote($p);
$t = $db->quote($t);
$b = $db->quote($b);


$sql = "DELETE FROM s WHERE (p = {$p} AND t = {$t} AND b = {$b}) LIMIT 1; ";
#echo "SQL:   $sql ";
echo $db ->exec($sql);
//if(!($b == "b" or $b == "trash" or $b == "s4s" or $b == "soc")){echo "nope";exit();}


?>
