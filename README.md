# frensync
The userscript to sync additional fields on 4chan.
Depends on 4chanX on 4chan.

Currently working server:
-wide characters in tripcode supported

Currently working client:
-Updates work / tested
-Name lookup in the archives works 100% on single server

Todos client:
-Detect multi instances 
-Implement multi server in the archive lookup (basic work done)
-Merge with NS


The idea is to implement this like Namesync but with a redundant multi master server aswell as posting to the original Namesync.
And have the server side implementation open source so the project doesn't die.

The second goal is to provide a broader interface:
A TripFagFinder like interface to find active threads
An sync functionality in archives
An user selectable privacy option to tell the server how much and how long it should be served because Namesync currently stores it forever.
