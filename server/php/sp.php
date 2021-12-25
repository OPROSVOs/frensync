<?php

// CORS
header('Access-Control-Allow-Origin: https://boards.4chan.org');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: x-requested-with, if-modified-since');
header('Content-type: text/html; charset=utf-8');

error_reporting (E_ALL ^ E_NOTICE);

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
$p = test_input($_POST["p"]);
$t = test_input($_POST["t"]);
$b = test_input($_POST["b"]);
$n = $_POST["n"];
$s = test_input($_POST["s"]);
$e = test_input($_POST["e"]);
$dnt = test_input($_POST["dnt"]);
}
// input range check
if(!isset($p) or !is_numeric($p) or $p < 1 or $p > 4294967295 or !isset($t) or !is_numeric($t) or $t < 1 or $t > 4294967295 ){exit();}
if(!isset($b) or strlen($b) > 5 or strlen($n) > 256 or strlen($s) > 128 or strlen($e) > 128 or strlen($dnt) > 4){exit();}

$name = explode('#', $n, 2);
if($name[1]){

        $salt = mb_substr($name[1] , 1) . "H"; // changed to mb_ because the normal substr breaks multibyte substring
        // the php version of the perl implementation: tr/\x3A-\x40\x5B-\x60\x00-\x2D\x7B-\xFF/A-Ga-f./
        // does the \x3A-\x40\x5B-\x60 part:
        $salt = str_replace(str_split(':;<=>?@[\]^_`'), str_split('ABCDEFGabcdef'), $salt); // replace 0x3a (:) with A, replace 0x3b (;) with B and so on
        // does explict the \x00-\x2D\x7B-\xFF => ,part:
        $salt = preg_replace('/[^\.\/0123456789\:\;\<\=\>\?\@ABCDEFGHIJKLMNOPQRSTUVWXYZ\[\\\]\^\_\`abcdefghijklmnopqrstuvwxyz]/', '.', $salt); //replace everything else with a .  UNTESTED!
        $name[0] .= "!" . substr(crypt($name[1], $salt), -10);
}

$fname = "tmp/ns-$b-$t.json";
$db = new PDO('mysql:host=localhost;dbname=ns', 'ns', 'nope' );

// escape ' to \' to prevent the obvious
$p = $db->quote($p);
$t = $db->quote($t);
$b = $db->quote($b);
$n = $db->quote(htmlspecialchars($name[0]));
$s = $db->quote($s);
$e = $db->quote($e);
$dnt = $db->quote($dnt);

$sql = "INSERT INTO s (p, t, b, n, s, e, dnt) VALUES ( {$p}, {$t}, {$b}, {$n}, {$s}, {$e}, {$dnt} ); ";
echo "SQL:   $sql ";
echo $db ->exec($sql);

?>
