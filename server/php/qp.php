
<?php

// CORS
header('Access-Control-Allow-Origin: https://boards.4chan.org');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: x-requested-with, if-modified-since');

error_reporting (E_ALL ^ E_NOTICE ^ E_WARNING);

function test_input($data) {
  #$data = trim($data);
  #$data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
function e($error, $text) {
        rawurlencode($error);
        error_log("php:".$text . " " . $error);
}

// Grab the input and bring it to a safe state
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$t = test_input($_POST["t"]);
$b = test_input($_POST["b"]);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
$t = test_input($_GET["t"]);
$b = test_input($_GET["b"]);
}

$db = new PDO('mysql:host=localhost;dbname=ns', 'ns', 'nope' );

// escape ' to \' to prevent the obvious
$t = $db->quote($t);
$b = $db->quote($b);

$sql = "SELECT * FROM s WHERE t = {$t} AND b = {$b}";

//echo "SQL:   $sql ";
$res =$db ->query( $sql);

$out = array();;
foreach($res as $row){

        $pa;
        // that "t" is tripcode and not thread, idiot
        foreach(array("p", "b", "n", "s", "e") as $i){
               if(strlen($row[$i])){
                 $pa[$i]=htmlspecialchars($row[$i]);
               }else{
                 $pa[$i]="";
               }
        }
        array_push($out, $pa);
}
echo json_encode($out);
?>
