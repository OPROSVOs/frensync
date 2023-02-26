<?php
// CORS
header('Access-Control-Allow-Origin: https://boards.4chan.org');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: x-requested-with, if-modified-since');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {exit("");}

error_reporting (E_ALL ^ E_NOTICE ^ E_WARNING);

include 'FloodProtection.php';
$myname = basename(__FILE__);
$FloodProtection = new FloodProtection($myname, 160, 60);
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

if($t == 42){$load = sys_getloadavg(); if($load !== false){@header('X-LOAD: '.((floatval($load[2])/4)*100).'%');}}

include 'FCache.php';
#$myname = basename(__FILE__);
$FCache = new FCache("$b-$t");
if(strlen($t) < 20 ){
  $data = $FCache->check();
  if(false!==$data && substr($data, -1) == ']'){
    header("X-Cache: Hit");
    #error_log("Hit $t");
    exit($data);
  }else{
    #error_log("Miss $t");
    header("X-Cache: Miss");
  }
}

$db = new PDO('mysql:host=localhost;dbname=ns', 'ns', 'ns' );

// escape ' to \' to prevent the obvious
$t = $db->quote($t);
$b = $db->quote($b);

$out = array();
$outstr = "";

if(strlen($t)>12){
  //CATALOG QUERY
  // where $t=thread,thread,thread,thread...
  if(strlen($t)>9000){exit("nope");}
  $sql = "SELECT distinct(sync.t) FROM sync where FIND_IN_SET(t,{$t}) and sync.b={$b};";
  $res =$db ->query( $sql);
  foreach($res as $row){
    unset($pa);
    #$pa[""]=$row["t"];
    $pa["p"]=$row["t"];
    $pa["m"]=true; // thread marker in icons
    $pa["s"]=false; // don't empty the subject line
    array_push($out, $pa);
    $outstr = json_encode($out);
    //Don't cache because the t parameter always differs
  }
}else{
    //NAME QUERY
    $sql = "SELECT sync.t,sync.p,sync.u,sync.sus,names.n,names.tr,names.s,names.e,names.ch,names.ca FROM sync RIGHT JOIN names ON sync.u = names.id WHERE sync.b={$b} and sync.t={$t}";    
    $res =$db ->query( $sql);
    foreach($res as $row){
	unset($pa);
	if(strlen($row["tr"])){
	  $pa["t"]=$row["tr"];
        }
        foreach(array("p", "b", "n", "s", "e", "ca", "ch", "sus") as $i){ //ignore 'u' for now
               if(strlen($row[$i])){
		 $pa[$i]=$row[$i];
	       }else{
	         #$pa[$i]="";
	         unset($pa[$i]);
	       }
        }
        #special sauce: 
		
        //old version crowbar
        //matches NameSync4.9.3.1 NameSync4.9.3.2 but not NameSync4.9.3
        //if(strpos($_SERVER['HTTP_X_REQUESTED_WITH'], 'NameSync4.9.3.') !== false){
        //   $pa['s'] =  $pa['s'] . " you have an old version. please upgrade to frensync: https://github.com/OPROSVOs/frensync/blob/main/SETUP.md";
        //}
	array_push($out, $pa);
    }
    $outstr = json_encode($out);
    //Generate cache file
    @$FCache->store($outstr);
}
echo $outstr;
?>
