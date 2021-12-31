
<?php

// CORS
header('Access-Control-Allow-Origin: https://boards.4chan.org');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: x-requested-with, if-modified-since');
header('Content-type: text/html; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {exit("ok");}

error_reporting (E_ALL ^ E_NOTICE);

include 'FloodProtection.php';
$myname = basename(__FILE__);
$FloodProtection = new FloodProtection($myname, 5, 60); #4 valid requests within 60sec
if($FloodProtection->check($_SERVER['REMOTE_ADDR'])){
    header("HTTP/1.1 429 Too Many Requests");
    #error_log("FloodProtection ".$myname.": (".$_SERVER['REMOTE_ADDR'].")");
    exit("1");
}


function test_input($data) {
  #$data = trim($data);
  #$data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

// Grab the input and bring it to a safe state
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $p = test_input($_POST["p"]);
    $t = test_input($_POST["t"]);
    $b = test_input($_POST["b"]);
    $n = $_POST["n"];
    $s = test_input($_POST["s"]);
    $e = test_input($_POST["e"]);
    $dnt = test_input($_POST["dnt"]);
    $ca = test_input($_POST["ca"]);
    $ch = test_input($_POST["ch"]);
}
else{
    header("HTTP/1.1 405 Method Not Allowed");
    exit("nope");
}
// input range check
if(!isset($p) or !is_numeric($p) or $p < 1 or $p > 4294967295 ){header("HTTP/1.1 406 Not Acceptable");exit("A");}
if(!isset($t) or !is_numeric($t) or $t < 1 or $t > 4294967295 ){header("HTTP/1.1 406 Not Acceptable");exit("B");}
if(!isset($b) or strlen($b) > 5 ){header("HTTP/1.1 406 Not Acceptable");exit("C");}
if(strlen($n) > 256 or strlen($s) > 128 or strlen($e) > 128 or strlen($dnt) > 4){header("HTTP/1.1 406 Not Acceptable");exit("D");}
if(!isset($ca) or $ca <= 0 or $ca > 100 or $ch > 360 or $ch < 0 ){$ca = 0;$ch = 0;}

$name = explode('#', $n, 2);
$trip = "";
if($name[1]){
    $trip = make_tripcode($name[1]);
}

$db = new PDO('mysql:host=localhost;dbname=ns', 'ns', 'ns' );

// escape ' to \' to prevent the obvious
$p = $db->quote($p);
$t = $db->quote($t);
$b = $db->quote($b);
$n = $db->quote(htmlspecialchars($name[0]));
$trip = $db->quote(htmlspecialchars($trip));
$s = $db->quote($s);
$e = $db->quote($e);
$dnt = $db->quote($dnt);
$ca = $db->quote($ca);
$ch = $db->quote($ch);

$sql = "INSERT INTO s (p, t, b, n, tr, s, e, dnt, ca, ch) VALUES ( {$p}, {$t}, {$b}, {$n}, {$trip}, {$s}, {$e}, {$dnt}, {$ca}, {$ch} ); ";
#echo "SQL:   $sql ";
echo $db ->exec($sql);
//if(!($b == "b" or $b == "trash" or $b == "s4s" or $b == "soc")){echo "nope";exit();}



function make_tripcode($pass) {
    if ($pass === NULL || $pass === "") {
        return "";
    }
    $pass = htmlspecialchars($pass); // don't replace apostrophes
    $num_chars = iconv_strlen($pass, "UTF-8");
    $conv = "";
    for ($i = 0; $i < $num_chars; $i++) {
        try {
            $conv .= iconv("UTF-8", "CP932", iconv_substr($pass, $i, 1, "UTF-8"));
        }
        catch (Exception $ex) {
            $conv .= "?";
        }
    }
    $salt = strtr(preg_replace("/[^\.-z]/", ".", substr($conv . "H.", 1, 2)), ":;<=>?@[\\]^_`", "ABCDEFGabcdef");
    $trip = substr(crypt($conv, $salt), -10);
    return "!" . $trip;
}



?>

