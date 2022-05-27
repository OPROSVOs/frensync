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

## Setting it up
To set a name, open 4chan and open the FS settings in the top right: ![grafik](https://user-images.githubusercontent.com/19379091/162594758-062a7fc5-bc89-4849-adbb-44d9f2363c8a.png)

Then check the Persona box, enter a name, optionally an email/subject/color and relaod the page:
![grafik](https://user-images.githubusercontent.com/19379091/162594823-58822efc-89ee-41cf-b2b5-d2b4a0f4f925.png)
And if everything works, the name appears in the thread and the counter in the server status in the settings goes up.
If everything works perfect, all three servers increment by one.
If not, double check the adblock / ublock settings in this guide in the optional steps.

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

### The extension throws an error: localstorage get failed / localstorage access denied / ns-error-file-corrupted / NS_ERROR_FAILURE 
When pressing F12 there is NS_ERROR_FAILURE all over in the console.
That means that the extension can't access its own settings to store the name and checkboxes.
This is due to an **corrupted browser profile** which crashes some api calls from the extension.
Either run checkdisk/chkdsk on the drive or delete the broken profile. You also might want to keep an eye on that drive as it might be broken soon.
A quick fix is Settings -> Privacy -> Delete cookies and website data

### Sync works only to one server
Check your adblock / ublock settings and filters.

Make sure you have the upper exceptions in your ruleset.

Try checking the GM_API XHR checkbox, reload and see if it works. 
Then leave it unchecked and reload for further debugging.

### The console shows "... has been blocked permanently by the user" while using TamperMonkey
The console can be accessed by pressing F12. This error results that certain servers are unreachable.
Check the XHR security tab in the script settings. There should be all just * and nothing blocked.

### Things don't work / Kittens are dying
If the extension doesn't work as intended, first check this:
- Only one user script extension (like tampermonkey) is running and working
- In TamperMonkey  Script->Settings->XHR Security where should be just * and nothing is blocked.
- 4chanX is running and working
- There is one FS in the corner, nothing else and its the newest version
- The server status in the control panel shows green ticks, no red cross
- 4chan isn't doing weird things (like sesional things or trolling mods)
- Your settings are correct like the screenshot up in the setup
- Wait 5 minutes, reload and try again posting

If all is fine and you want to help, continue here:

You can open up the dev tools by pressing **F12** and look into the **Console**

When opening the FS settings, you can see a fraction of each server response in the console.
When sending a post there should be no error popping up in the console. Or atleast none from frensync or 4chanX (right side of the error message).

If theres frensync.js or 4chanX.js popping up as an error, i screwed up something. Posting this screenshot to the issues (or *the* thread) would help a lot. Please include the browser + version and user script extension as well for reproducing the error.
A known bug is when OP has a name and theres no post, the background color chack fails gently.

Pressing **F12** closes the dev tools again.
