DROP DATABASE IF EXISTS `ctt_db`;
CREATE DATABASE IF NOT EXISTS `ctt_db`;
USE `ctt_db`;

CREATE USER IF NOT EXISTS 'ctt_user'@'localhost' IDENTIFIED BY 'ctt';

CREATE TABLE IF NOT EXISTS user (
    `id` INT NOT NULL auto_increment PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `token` VARCHAR(50) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transcript (
    `id` INT NOT NULL auto_increment PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `content` TEXT(50) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user (`id`,`name`, `token`) VALUES ('1','Karlo Dela Rosa', 'oiijvaezifuazuifharui17652256526');
INSERT INTO transcript (`id`,`name`, `content`) VALUES ('1','Transcript Mid Est dc', 'Salut, ça va ? Tu va bien et toi ? Oui et moi ? oui !');
