/* DB Schema: */

DROP TABLE IF EXISTS `s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `s` (
  `t` int unsigned NOT NULL,
  `p` int unsigned NOT NULL,
  `b` enum('b','soc','s4s','trash') NOT NULL,
  `n` varchar(128) DEFAULT NULL,
  `tr` varchar(24) DEFAULT NULL,
  `s` varchar(128) DEFAULT NULL,
  `e` varchar(128) DEFAULT NULL,
  `dnt` varchar(1) DEFAULT NULL,
  `ch` smallint DEFAULT NULL,
  `ca` smallint DEFAULT NULL,
  PRIMARY KEY (`t`),
  UNIQUE (`p`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

/* 
 max int value: 4294967295
 bigint might be better?
 Todo: Add/use trip(tr) instead of adding it to the name
*/
