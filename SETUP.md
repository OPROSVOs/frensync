Step by step guide:

Installing **without** any previous setup:
* If you don't have an userscript extension like Greasemonkey or Tapermonkey. Get ViolentMonkey for [(Firefox)](https://addons.mozilla.org/de/firefox/addon/violentmonkey/) or [(Chrome)](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) because ViolentMonkey is not properitary and doesn't use analytics / telemetry. But any userscript extension with the GM API should work.
* Install [4chanX.user.js](https://www.4chan-x.net/builds/4chan-X.user.js) if you don't already have it
* Install [frensync.user.js](https://github.com/OPROSVOs/frensync/raw/main/frensync.user.js) which includes Namesync functionality

Installing **with** previous NS:
* Backup your persona if you had one
* No uBlock or Adblock rule update required if it has been previously set up
* Disable every NS script **OR** extension that ran earlier and check that **only** 4chanX is active
* That earlier version on the m8b16... site is dead - delete it.
* Install [frensync.user.js](https://github.com/OPROSVOs/frensync/raw/main/frensync.user.js) which includes Namesync


Optional steps:
* Optional: install [PersonaPlus](https://pastebin.com/3jHyZwF3) to switch between multible names / tripcodes
* Optional: install [OneeChan](https://github.com/KevinParnell/OneeChan/raw/master/builds/OneeChan.user.js) (works, tested by BCBoi)
* Optional: install [TripfagFinder](https://github.com/bstats/Tripfag-Finder/raw/master/Tripfag-Finder.user.js) (**broken?**)
* Recommended: To get the original Namesync working with Adblockers like uBlock, add this one time to your **My Filter** ruleset:
```
@@||4chan.org^*$csp=default-src 'self' * data: 'unsafe-inline' 'unsafe-eval'
@@||4channel.org^*$csp=default-src 'self' * data: 'unsafe-inline' 'unsafe-eval'
@@|blob:$image,media,domain=4chan.org
@@|blob:$image,media,domain=4channel.org
@@||boards.4chan.org^$csp
@@||boards.4channel.org^$csp
@@||namesync.net$xmlhttprequest,domain=4chan.org
@@||namesync.net$xmlhttprequest,domain=4channel.org 
```
* Optional: get a tripcode with your name which makes stealing your name harder. [Meriken's Tripcode Engine](https://github.com/meriken/merikens-tripcode-engine-v3) is currently the best.
* Head to 4chan and set 4chanX up and Namesync/Frensync with your persona (settings:in the top right) and have fun.

FAQ / Debugging:

Q: There is an NS and FS in the corner OR there are multible NS running
A: You have multible instances running. Remove every Namesync or Frensync userscript AND check your extensions. Then verify its gone and install [frensync.user.js](https://github.com/OPROSVOs/frensync/raw/main/frensync.user.js) once


Q: Somebody gave me a link to an old version and features are missing / its buggy.
A: Delete this userscript, ignore it and start from the top of this document.



Currently no support for:

The standalone browser extension (FF) (CR)

The iOS Webhub
