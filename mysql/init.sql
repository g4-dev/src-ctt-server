CREATE DATABASE IF NOT EXISTS `ctt_db`;
USE `ctt_db`;

CREATE USER IF NOT EXISTS 'ctt_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ctt';
GRANT CREATE, DROP, SELECT, INSERT, UPDATE, DELETE ON `ctt_db`.* TO 'ctt_user'@'localhost';
