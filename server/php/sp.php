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
$FloodProtection = new FloodProtection($myname, 5, 60); #the 4 valid requests within 60sec (preflieght+post) assume /trash/ and /b/ at the same time + 1 retry
if($FloodProtection->check($_SERVER['REMOTE_ADDR'])){
    header("HTTP/1.1 429 Too Many Requests");
    #error_log("FloodProtection ".$myname.": (".$_SERVER['REMOTE_ADDR'].")");
    exit("1");
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

// Grab the input and bring it to a safe state
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $p = test_input($_POST["p"]);
    $b = test_input($_POST["b"]);
    $t = $_POST["t"];
    $n = $_POST["n"];
    $s = $_POST["s"];
    $e = $_POST["e"];
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

include 'FCache.php';
$fc = new FCache("$b-$t");

list($name, $trip) = trip($n);

//todo add ip
//todo: add date

$clir = $_SERVER['HTTP_X_REQUESTED_WITH'];
if(!isset($clir)){header("HTTP/1.1 406 Not Acceptable");exit("E");} 

$db = new PDO('mysql:host=localhost;dbname=ns', 'ns', 'ns' );

// escape ' to \' to prevent the obvious
$p = $db->quote($p);
$t = $db->quote($t);
$b = $db->quote($b);
$n = $db->quote($name);
$trip = $db->quote($trip);
$s   = $db->quote($s);
$e   = $db->quote($e);
$dnt = $db->quote($dnt);
$ca  = $db->quote($ca);
$ch  = $db->quote($ch);
$cli  = $db->quote($cli);
$iph = $db->quote($iph);

// get first half of the ip to get a bit more entropy for very short names for the hash
$ip = "";
if(strlen("$n $trip $s $e") < 6){
  $ip = $_SERVER['REMOTE_ADDR'];
  $ip = substr($ip, 0, floor(strlen($ip)/3));
}

// dedup: prepare a hash of the user relevant data
$ha = hash('sha256', "$n $trip $s $e $dnt $ca $ch $ip");
$ha = $db->quote($ha);

// insert the user info
// the hash is unique so a duplicate will fail
$sql = "INSERT IGNORE INTO names (n, tr, s, e, dnt, ca, ch, h) VALUES ( {$n}, {$trip}, {$s}, {$e}, {$dnt}, {$ca}, {$ch}, {$ha} );";
$ret = @$db ->exec($sql);

$uid = $db->query("SELECT `id` FROM `names` WHERE `h`={$ha} LIMIT 1");
$user = "null";
foreach ($uid as $row) {
  if($row['id'] > 0){
    $user = $row['id'];
  }
}
$user = $db->quote($user);

// map the user to the board-thread-post data
$sql = "INSERT INTO sync (p, t, b, u) VALUES ( {$p}, {$t}, {$b}, {$user} ); ";
$ret = $db ->exec($sql);
echo $ret;

@$fc->dirty();




function trip($name)
{
    // Return name if non-valid trip
    if (!preg_match('/^([^#]+)?(##|#)(.+)$/', $name, $match))
    {
        return array($name, null);
    }

    $name = $match[1];
    $secure = $match[2];
    $trip = $match[3];
    
    if (strcmp($secure, '##') == 0)
    {
        // special sauce: secure trip exceptions baked in here
        if ($trip == '~~~~~~~~~~~~~~~~~~~~~~~~~'){
          return array($name, "!!~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        }
        
        // This is the same on NSR
        $salt = md5($name . getenv('SECURE_SALT') . $trip);
        $trip = '!!' . substr(crypt($trip, $salt), -10);
    } else {
        // UTF-8 > SJIS
        $trip = mb_convert_encoding($trip, 'Shift_JIS', 'UTF-8');
        $salt = substr($trip . 'H..', 1, 2);
        $salt = preg_replace('/[^.-z]/', '.', $salt);
        $salt = strtr($salt, ':;<=>?@[\]^_`', 'ABCDEFGabcdef');
        $trip = '!' . substr(crypt($trip, $salt), -10);
    }

    return array($name, $trip);
}

/* 
 * Old implementation - this had issues with secure trips and special utf8
 *
function make_tripcode($name, $secure, $trip) {
    if($trip === "") {
        return "";
    }


    if (strcmp($secure, '##') == 0)
    {
        // This will never be a 1:1 with 4chan, so whatever
        $salt = md5($name . "please-change-me" . $trip);
        $trip = '!' . substr(crypt($trip, $salt), -10);
    } else {
        // UTF-8 > SJIS
        $trip = mb_convert_encoding($trip, 'Shift_JIS', 'UTF-8');
        $salt = substr($trip . 'H..', 1, 2);
        $salt = preg_replace('/[^.-z]/', '.', $salt);
        $salt = strtr($salt, ':;<=>?@[\]^_`', 'ABCDEFGabcdef');
        $trip = substr(crypt($trip, $salt), -10);
    }
    #$pass = htmlspecialchars($pass); // don't replace apostrophes
    #$num_chars = iconv_strlen($pass, "UTF-8");
    #$conv = "";
    #for ($i = 0; $i < $num_chars; $i++) {
    #    try {
    #        $conv .= iconv("UTF-8", "CP932", iconv_substr($pass, $i, 1, "UTF-8"));
    #    }
    #    catch (Exception $ex) {
    #        $conv .= "?";
    #    }
    #}
    #$salt = strtr(preg_replace("/[^\.-z]/", ".", substr($conv . "H.", 1, 2)), ":;<=>?@[\\]^_`", "ABCDEFGabcdef");
    #$trip = substr(crypt($conv, $salt), -10);
    return "!" . $trip;
}
*/
?>
