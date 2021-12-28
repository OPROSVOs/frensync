# frensync
The userscript to sync additional fields on 4chan.
Depends on 4chanX on 4chan.

The idea is to implement this like Namesync but with a redundant multi master server aswell as posting to the original Namesync.
And have the server side implementation open source so the project doesn't die.

The second goal is to provide a broader interface:
A TripFagFinder like interface to find active threads
An sync functionality in archives
An user selectable privacy option to tell the server how much and how long it should be served because Namesync currently stores it forever.

Installing:
* Backup your persona
* Disable every ns script OR extension that ran earlier; check that only 4chanX is active
* If you don't have an user script extension like Greasemonkey, etc. get ViolentMonkey [(Firefox)](https://addons.mozilla.org/de/firefox/addon/violentmonkey/) or [(Chrome)](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
* Install [frensync.user.js](https://github.com/OPROSVOs/frensync/raw/main/frensync.user.js) which includes Namesync
* Optional: install PersonaPlus
* Optional: install OneeChan (works, tested by BCBoi)
* Optional: install TripfagFinder (broken?)
* No uBlock or Adblock rule update required if it has been previously set up
* For a first setup continue [here](https://susanqt.github.io) after the Namesync section 
* Head to 4chan and set it up with your persona (settings:in the top right)



Currently working server:
* wide characters in tripcode supported

Currently working client:
* Updates work / tested
* Name lookup in the archives works 100% on single server
* Sends/receives both to/from Namesync and the backup in a crude way

Todos client:
* Detect multi instances 
* Implement multi server in the archive lookup (basic work done)
* Do a proper multi server implement.



