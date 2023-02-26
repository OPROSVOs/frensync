<?php
// Outputs the last 5 recent threads
error_reporting (E_ALL ^ E_NOTICE ^ E_WARNING);

include 'FloodProtection.php';
$myname = basename(__FILE__);
$FloodProtection = new FloodProtection($myname, 3, 30);
if($FloodProtection->check($_SERVER['REMOTE_ADDR'])){
    header("HTTP/1.1 429 Too Many Requests");
    exit("HTTP/1.1 429 Too Many Requests");
}

$db = new PDO('mysql:host=localhost;dbname=ns', 'ns', 'ns' );

$sql = "SELECT distinct(s.t), b FROM sync ORDER BY t DESC LIMIT 5;";

$res =$db ->query( $sql);

$out = array();;
foreach($res as $row){	
    array_push($out, $row['b'].'/thread/'.$row['t']);
#	echo '<a href="https://boards.4chan.org/'.$row['b'].'/thread/'.$row['t'].'" target="_new">&gt;&gt;&gt;/'.$row['b'].'/'.$row['t'] . '</a><br>';	
}

echo json_encode($out);

?>
