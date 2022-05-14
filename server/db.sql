--
-- Table structure for table `names`
--

DROP TABLE IF EXISTS `names`;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `names` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `n` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tr` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `s` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `e` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dnt` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ch` smallint DEFAULT NULL,
  `ca` smallint DEFAULT NULL,
  `h` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE, /* used for joins */
  UNIQUE KEY `h` (`h`),
  UNIQUE KEY `ha` (`h`) USING BTREE /* hash over all fields used for deduplication checks, which is easier than utf8mb with weird characters over multible fields */
) ENGINE=MyISAM AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `sync`
--

DROP TABLE IF EXISTS `sync`;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sync` (
  `t` int unsigned NOT NULL,
  `p` int unsigned NOT NULL,
  `b` enum('b','trash','soc','s4s') NOT NULL,
  `u` int unsigned DEFAULT NULL, /* foreign key id from table names */
  `sus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`b`,`t`,`p`),
  UNIQUE KEY `post` (`b`,`t`,`p`) USING BTREE /* an unique pair of all three fields */
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;


--
-- Table structure for table `s`, UNUSED
--
--
-- DROP TABLE IF EXISTS `s`;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `s` (
--   `t` int unsigned NOT NULL,
--   `p` int unsigned NOT NULL,
--   `b` enum('b','soc','s4s','trash') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
--   `n` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
--   `tr` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
--   `s` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
--   `e` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
--   `dnt` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
--   `ch` smallint DEFAULT NULL,
--   `ca` smallint DEFAULT NULL,
--   UNIQUE KEY `p` (`p`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


/* 
 max int value: 4294967295
 bigint might be better?
 Todo: Add/use trip(tr) instead of adding it to the name
*/
