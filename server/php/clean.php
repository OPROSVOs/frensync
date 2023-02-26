<?php

error_reporting (E_ALL ^ E_NOTICE ^ E_WARNING);

/*
in cron:
0 0 * * * www-data /usr/bin/curl -m 120 -s -k https://127.0.0.1/namesync/clean.php &>/dev/null
done via webrequest to clean out other stuff in apache aswell
*/

error_log("Database cleanup: Starting");

$ip=$_SERVER['REMOTE_ADDR'];
if($ip != "localhost" && $ip != "127.0.0.1" ){
  exit("$ip is not allowed");
}

$db = new PDO('mysql:host=localhost;dbname=ns', 'ns', 'ns' );

// limit the sync table to
$active_posts = 5000;

$sql = "SELECT count(b) FROM sync;";
$res = $db ->query( $sql);

$count = 0;
foreach($res as $row){$count = $row[0];}
if($count < 250){exit("count too low");}
if($count > 20000){error_log("Database cleanup: Sync table is filling up quick (flood?)");}

$todelete = $count - $active_posts;
$todelete = intdiv($todelete, 2); //no hard limit
if($todelete < 0) {$todelete = 0;}
if($todelete > 0){
  //caution: this is assuming single board!
  $sql = "DELETE FROM sync ORDER BY p ASC LIMIT $todelete;";
  $db ->query( $sql);
}

// clean names table
// finds a sync post or deletes the name
// going the long way so its easy to debug

$sql = "SELECT id FROM names;"; //no distinct needed
$res = $db ->query($sql);
$num_names = 0;
$num_names_deleted = 0;
foreach($res as $row){
  $uid = $row['id'];
  if($uid > 0){
    $num_names++;
    $isql  = "SELECT u FROM sync WHERE u = '$uid' limit 1;";
    $ires = $db ->query( $isql);
    $sid = 0;
    foreach($ires as $irow){$sid = $irow['u'];}
    if($sid != $uid){
      $isql = "DELETE FROM names WHERE id = '$uid';";
      $db ->query( $isql);
      $num_names_deleted++;
    }
  }
}

//todo: clean FS Cache

error_log("Database cleanup: SyncDeleted: $todelete NamesDeleted: $num_names_deleted  ActiveNames: $num_names ");

?>
