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

Currently working client:
* Updates work / tested
* Name lookup in the archives works 100% on single server
* Sends/receives both to/from Namesync and the backup in a crude way
* multi server works in the archive
* added name color support

Todos:
* Detect multi instances 
* Implement multi server and merge names
* sp.php: Secure tripcodes (help welcome)
* qp.php: Delete data after some time
* qp.php: Handle multible threads in the t arg for syncing the catalog.



