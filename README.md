# frensync
The userscript to sync additional fields and a tripcode to forced anon boards on 4chan, depends on 4chanX.

This has been done to keep it alive when the original Namesync was down for a longer time on Dec2021 and had hiccups while also keeping it open source and adding quality of life features.  
Right now it is send and received over two servers and the original NS at the same time so outages should be minimal.

There are simple and extended name colors to easily differentiate users.  
Synced threads are marked in the catalog.  
Adblock issues can be solved with a GM_XHR bypass.  
Names and trips show up in archived threads on third party sites.  
And the duration the data is saved is limited from days up to a month depending on usage. NS saves forever.

## Install:
See [Setup.md](https://github.com/OPROSVOs/frensync/blob/main/SETUP.md) for a complete list.  
TL;DR: Have a userscript extension, disable old scripts, add adblock exceptions, have [4chanX.user.js](https://www.4chan-x.net/builds/4chan-X.user.js) installed, install [frensync.user.js](https://github.com/OPROSVOs/frensync/raw/main/frensync.user.js)


## Tests, last working version:
* Firefox 122 - OK
* Chrome 121 - OK
* Yandex 22.3.4 - OK
* Firefox mobile 66 - OK
* Safari 11.2 - OK
* ViolentMonkey 2.15 - OK
* TamperMonkey 5.0.1 - OK (causes permission popups)
* GreaseMonkey  4.12.0 - OK (differences in API but working)
* 4chanX 1.14.22 - OK
* AppchanX - Broken (Captcha broken, no color support)

## Todos:
* cleanup extended color code
* Detect multi instances / Pebkac errors
* ~~Implement multi server and merge names~~ done
* ~~Test with other servers ([NSredux](https://github.com/iBoonie/namesyncredux))~~ done
* ~~Some settings don't apply without reloading after (read-only, persona), needs testing~~ done
* qp.php rm.php: Delete data after some time
* cleanup the master server list as this is not changing anytime

## Links & Shoutouts:
The Original [Namesync Github](https://github.com/milkytiptoe/Name-Sync/) / [Namesync Website](https://milkytiptoe.github.io/Name-Sync/), thanks nokosage for keeping it alive     
[Namesync Redux Github](https://github.com/iBoonie/namesync-redux-flatfile) for hosting the second server, [old ver](https://github.com/iBoonie/namesyncredux)   
[4chanX Github](https://github.com/ccd0/4chan-x) / [4chanX Website](https://www.4chan-x.net/) for adding all those awesome features  
[CuteSync](https://github.com/ErinSteph/Cute-Sync) the minimal standalone version best suited for mobile  

### Deprecated: 

[AppchanX Github](https://github.com/zixaphir/appchan-x)  
[Tripfag-Finder](https://github.com/bstats/Tripfag-Finder)  
other forks of 4chanX  

### Useful scripts / things

[PersonaPlus](https://github.com/ErinSteph/PersonaPlus) when one name isnt cutting it  
[4chanFilterNuker](https://github.com/nokosage/4chan-Filter-Nuker/tree/master) to completely remove filtered posts (when the spam gets too much)  

[TripfagFinder K](https://github.com/ErinSteph/Tripfag-Finder-K) since the original Tripfag-Finder is gone  
[NS Fancifier](https://github.com/specialeddy/namesync-fancifier) adds a box and fancy font to the name, [moar](https://specialeddy.github.io/archive)  

### Tripcode related:
[Merikens Tripcode Engine v3](https://github.com/meriken/merikens-tripcode-engine-v3) is the fastest way of using the gpu to find partial tripcodes   
**Tripcode Explorer**, Offline. The ancient japanese implementation for finding trips, had lots of infos
[Tripcode Tester](https://nonegiven.github.io/tripcode) for testing a tripcode  

### Thanks

4chan for staying alive and bringing back names    
Jak for the name, iBonnie for solving the unicode problem with the tripcode calculation.  
(You) for supporting each other and keeping the threads alive  
