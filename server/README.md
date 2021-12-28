This is the server code for hosting.

There is a perl implementation as a scratch. This one lacks wide character/different codepage support.

The php version is the active one.

Setup for any Ubuntu or Debian based GNU-Linux for the php version:
```sh
apt install apache2 php-mbstring php-mysql mysql-server certbot -y
```

Setup for any Ubuntu or Debian based GNU-Linux for the perl version:
```sh
apt install libnet-server-perl libclass-dbi-mysql-perl libdbix-recordset-perl libjson-xs-perl libdbd-mysql-perl -y
```

MYSQL quick setup:
see db.sql

Then set up apache2 and certbot, a2enmod php, a2ensite, etc

/etc/apache2/apache2.conf:
```conf
HostnameLookups Off
<Directory />
        Options FollowSymLinks
        AllowOverride None
        Require all denied
</Directory>
<Directory /srv>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
</Directory>
<FilesMatch "^\.ht">
        Require all denied
</FilesMatch>

#fallback
ServerName CHANGEME
#to remove passwords from the code
SetEnv NS_DB_CONNECTION "ns:user=ns:password=ns"

```

/etc/apache2/sites-available/ns.conf:
```conf
<IfModule mod_ssl.c>
  <VirtualHost *:443>
    ServerName CHANGEME
    ServerAdmin webmaster@localhost
    DocumentRoot /srv/ns
    LogLevel crit
    ErrorLog ${APACHE_LOG_DIR}/apache2.ns.error.log
    SSLEngine on
    SSLCertificateFile      /etc/letsencrypt/live/CHANGEME/fullchain.pem
    SSLCertificateKeyFile   /etc/letsencrypt/live/CHANGEME/privkey.pem
  </VirtualHost>
</IfModule>
```

And thats most of it if the php files are in the correct dir.
