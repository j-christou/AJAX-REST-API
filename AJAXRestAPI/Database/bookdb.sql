create database wddb;
use wddb;

CREATE TABLE `books` (

`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`author` VARCHAR( 25 ) NOT NULL ,
`title` VARCHAR( 40 ) NOT NULL ,
`genre` VARCHAR( 20 ) NOT NULL ,
`price` FLOAT NOT NULL

) ENGINE = MYISAM ;

select * from books;







