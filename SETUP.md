# Step by step guide:

## Installing **without** any previous setup:
* If you don't have an userscript extension like Greasemonkey or Tapermonkey. Get ViolentMonkey for [(Firefox)](https://addons.mozilla.org/de/firefox/addon/violentmonkey/) or [(Chrome)](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) because ViolentMonkey is not properitary and doesn't use analytics / telemetry. But any userscript extension with the GM API should work.
* Install [4chanX.user.js](https://www.4chan-x.net/builds/4chan-X.user.js) if you don't already have it
* Install [frensync.user.js](https://github.com/OPROSVOs/frensync/raw/main/frensync.user.js) which includes Namesync functionality

## Installing **with** previous NS:
* Backup your persona if you had one
* No uBlock or Adblock rule update required if it has been previously set up
* Disable every NS script **OR** extension that ran earlier and check that **only** 4chanX is active
* Install [frensync.user.js](https://github.com/OPROSVOs/frensync/raw/main/frensync.user.js) which includes Namesync

## Recommended: AdBlock exception (Since the domains got flagged on some list)
To get the original Namesync working with Adblockers like uBlock, add this one time to your **My Filter** ruleset:
```
! 4chan-X exception for embeds and preview images
@@||4chan.org^*$csp=default-src 'self' * data: 'unsafe-inline' 'unsafe-eval'
@@||4channel.org^*$csp=default-src 'self' * data: 'unsafe-inline' 'unsafe-eval'
@@|blob:$image,media,domain=4chan.org
@@|blob:$image,media,domain=4channel.org
@@||boards.4chan.org^$csp
@@||boards.4channel.org^$csp
! NS exception 
@@||namesync.net$xmlhttprequest,domain=4chan.org
@@||namesync.net$xmlhttprequest,domain=4channel.org 
! TFF-K exception
@@||t-f.xyz$xmlhttprequest,domain=4chan.org
@@||erinsteph.com$xmlhttprequest,domain=4chan.org
@@||erinsteph.com$xmlhttprequest,domain=4channel.org
```
## Optional steps:
* install [PersonaPlus](https://github.com/ErinSteph/PersonaPlus) to switch between multible names / tripcodes
* install [OneeChan](https://github.com/KevinParnell/OneeChan/raw/master/builds/OneeChan.user.js) (works, tested by BCBoi)
* install [TripfagFinder-K](https://github.com/ErinSteph/Tripfag-Finder-K) (the abandoned original one is here: [TFF](https://github.com/bstats/Tripfag-Finder)) to find threads with namefags
* For mobile: For lightweight mobile support, check out [CuteSync](https://github.com/ErinSteph/Cute-Sync) which doesn't rely on 4chanX
* get a tripcode with your name which makes stealing your name harder. [Meriken's Tripcode Engine](https://github.com/meriken/merikens-tripcode-engine-v3) is currently the best.

Head to 4chan and set 4chanX up and Namesync/Frensync with your persona (settings:in the top right) and have fun.

## Currently no support for:

The standalone browser extension (FF) (CR)

The iOS Webhub

Use the [original NS](https://milkytiptoe.github.io/Name-Sync/) or [CuteSync](https://github.com/ErinSteph/Cute-Sync) for that.

## FAQ / Debugging:

### There is an NS and FS in the corner OR there are multible NS running.
You have multible instances running. Remove every Namesync or Frensync userscript AND check your extensions. Then verify its gone and install [frensync.user.js](https://github.com/OPROSVOs/frensync/raw/main/frensync.user.js) once

### What is a tripcode?
TLDR: A way around using an account with user/pass.

Basically the output of an hash / one way math function so scammy people have a harder time inpersonating you. After your name add a # followed by some secret 10 characters. These will not be displayed but will generate a different text. It is difficult to get your secret 10 characters from that output and hinders people just writing your name into their fields to impersonate you. 
For better visibility / fun that generated output can partly have some letters of your choice in it. See [Meriken's Tripcode Engine](https://github.com/meriken/merikens-tripcode-engine-v3)
