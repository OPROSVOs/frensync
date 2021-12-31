
<?php

// CORS
header('Access-Control-Allow-Origin: https://boards.4chan.org');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: x-requested-with, if-modified-since');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {exit("ok");}


error_reporting (E_ALL ^ E_NOTICE ^ E_WARNING);

include 'FloodProtection.php';
$myname = basename(__FILE__);
$FloodProtection = new FloodProtection($myname, 120, 60);
if($FloodProtection->check($_SERVER['REMOTE_ADDR'])){
    header("HTTP/1.1 429 Too Many Requests");
    #error_log("FloodProtection ".$myname);
    exit("[]");
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
function e($error, $text) {
        rawurlencode($error);
        error_log("php:".$text . " " . $error);
}

// Grab the input and bring it to a safe state
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
$t = test_input($_GET["t"]);
$b = test_input($_GET["b"]);
}

// input range check
if(!isset($t) or strlen($t) > 11000 ){header("HTTP/1.1 406 Not Acceptable");exit("A");}
if(!isset($b) or strlen($b) > 5 ){header("HTTP/1.1 406 Not Acceptable");exit("B");}

$db = new PDO('mysql:host=localhost;dbname=ns', 'ns', 'ns' );

// escape ' to \' to prevent the obvious
$t = $db->quote($t);
$b = $db->quote($b);

$sql = "SELECT * FROM s WHERE t = {$t} AND b = {$b}";

//echo "SQL:   $sql ";
$res =$db ->query( $sql);

$out = array();;
foreach($res as $row){

        $pa;
        $pa["t"]=htmlspecialchars($row["tr"]);
        // that "t" is tripcode and not thread, idiot
        foreach(array("p", "b", "n", "s", "e", "ca", "ch") as $i){
               if(strlen($row[$i])){
                 $pa[$i]=htmlspecialchars($row[$i]);
               }else{
                 $pa[$i]="";
               }
        }
        //$pa["n"]=$pa["n"];

        //special stuff
        if($pa[t]==="!kittensORw"){$pa[t]="!!Erin";}

        array_push($out, $pa);
}

echo json_encode($out);

?>
