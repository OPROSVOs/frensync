/* DB Schema: */
create table s if not exists(
        p INT UNSIGNED NOT NULL PRIMARY KEY,
        t INT UNSIGNED NOT NULL,
        b ENUM('b', 'soc', 's4s', 'trash') NOT NULL,
        n VARCHAR(128) NULL,
        tr VARCHAR(64) NULL,
        s VARCHAR(128) NULL,
        e VARCHAR(128) NULL,
        dnt VARCHAR(2) NULL
);
/* 
 max int value: 4294967295
 bigint might be better?
 Todo: Add/use trip(tr) instead of adding it to the name
*/
