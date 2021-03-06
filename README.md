# frensync
The userscript to sync additional fields on 4chan.
Depends on 4chanX on 4chan.

The idea is to implement this like Namesync but with a redundant multi master server aswell as posting to the original Namesync.
And having the server side implementation open source so the project doesn't die.
Currently Namesync is down because the server is returning an error and this one is providing a different backend in the meantime and later on.

The second goal is to provide a broader interface:
A TripFagFinder like interface to find active threads
An sync functionality in archives
An user selectable privacy option to tell the server how much and how long it should be served because Namesync currently stores it forever.

Installing:
See [Setup.md](https://github.com/OPROSVOs/frensync/blob/main/SETUP.md) for a complete list.
TL;DR: Disable every ns script, install [frensync.user.js](https://github.com/OPROSVOs/frensync/raw/main/frensync.user.js) which includes Namesync.


Currently working server:
* wide characters in tripcode supported
* flood protection, range check, QoS and Fail2Ban is set
* tripcodes are correctly hashed saved as its own column
* catalog syncing works as well

Currently working client:
* Updates work / tested
* Name lookup in the archives works 100% on single server
* Sends/receives both to/from Namesync and the backup in a crude way
* multi server works in the archive
* added name color support
* fixed the bug where one has to reload to apply the settings
* workarounds for misconfigured ad/script-blockers

Tests:
* Firefox 100 - OK
* Chrome 102 - OK
* Yandex 22.3.4 - OK
* Firefox mobile 66 - OK
* ViolentMonkey - OK
* TamperMonkey - OK (causes permission popups)
* GreaseMonkey  - OK (differences in API but working)
* 4chanX  - OK
* AppchanX - Broken? (Captcha broken, no color support)

Todos:
* Detect multi instances 
* ~~Implement multi server and merge names~~ done
* ~~Test with other servers ([NSredux](https://github.com/iBoonie/namesyncredux))~~ done
* ~~Some settings don't apply without reloading after (read-only, persona), needs testing~~ done
* qp.php rm.php: Delete data after some time
* cleanup tha master server list thing as this is not changing anytime
* validate timestamps with post timestamps
* cleanup


