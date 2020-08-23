CREATE TABLE `games` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` text,
  `characters` longtext,
  `game` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
