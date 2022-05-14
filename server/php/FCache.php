<?php
class FCache
{
 protected $dir;
 protected $data;
 protected $duration;
 protected $autoclean = true;
 protected $name;
 protected $pfx;

// Simple file cache:
// Writes cache files to /tmp/systemd-apache* /tmp/FS-CACHE/ sha256 .dat with plaintext data
// The sha256 is generated from the name of the data which must be unique
// If it matches, it return the data when its within a certain time range
// If the data from the server has been updated, the name to the dataset can be marked as dirty and things will be cleaned

 public function __construct($name = '', $data = null, $duration = 120, $dir = null, $autoclean = true){
         if(null === $dir){$dir = $this->getCacheDir('fs-cache');}
         $this->dir = $dir;
         $this->name = $name;
         $this->pfx = sha1($this->name) . '.dat';
         $this->autoclean = $autoclean;
         $this->data = $data;
         $this->duration = $duration;
 }

// Find if an existing chache exists, create a file and thaw the data if so.
// If data does not exist, ask for fresh data
 public function check(){
    if(!is_dir($this->dir)){mkdir($this->dir, 0755, true);}
    $fn = rtrim($this->dir, \DIRECTORY_SEPARATOR) . \DIRECTORY_SEPARATOR . $this->pfx;
    if(!file_exists($fn)){
     return false;
    }
    $data = @file_get_contents($fn); // This can fail
    if($data !== false && strlen($data) > 0){
       if(time() - filectime($fn) > $this->duration) { //There is data, lets see how stale it is
        if($this->autoclean){
         $this->prune();
        }
       }
       return $data;
    }
    return false;
 }

// Call this when the data is ready to be freezed
 public function store($data = null){
    if(!is_dir($this->dir)){mkdir($this->dir, 0755, true);}
    if(!strlen($data)){return;}
    $fn = rtrim($this->dir, \DIRECTORY_SEPARATOR) . \DIRECTORY_SEPARATOR . $this->pfx;
    $fp = fopen($fn, 'a+');
    $fstat = fstat($fp);
    if (flock($fp, LOCK_EX)) { //lock for other processes, shorten, write, sync and unlock
      ftruncate($fp, 0);
      fwrite($fp, $data);
      fflush($fp);
      flock($fp, LOCK_UN);
    }
    fclose($fp);
 }
 public function dirty(){
    $fn = rtrim($this->dir, \DIRECTORY_SEPARATOR) . \DIRECTORY_SEPARATOR . $this->pfx;
    if(file_exists($fn)){
     @unlink($fn);
    }
 }

// Clean the pool.
 public function prune(){
    $handle = opendir($this->dir);
    while(false!==($entry=readdir($handle))){
        $filename = rtrim($this->dir, \DIRECTORY_SEPARATOR) . \DIRECTORY_SEPARATOR . $entry;
        if(time() - filectime($filename) > $this->duration && substr($entry, -4) === substr($this->pfx, -4)){
            @unlink($filename);
        }
    }
    closedir($handle);
  }

 public function getCacheDir($name = 'fs-cache'){
    $name = strtoupper($name);
    $_ENV['FS_CACHE_DIR'] = ((isset($_ENV['FS_CACHE_DIR'])) ? $_ENV['FS_CACHE_DIR']:sys_get_temp_dir() . \DIRECTORY_SEPARATOR . $name . \DIRECTORY_SEPARATOR);
    return $_ENV['FS_CACHE_DIR'];
 }
}
