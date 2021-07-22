-- MySQL Script generated by MySQL Workbench
-- Tue Apr 13 11:30:31 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pdsclient
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pdsclient
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pdsclient` DEFAULT CHARACTER SET utf8 ;
USE `pdsclient` ;

-- -----------------------------------------------------
-- Table `pdsclient`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pdsclient`.`users` (
  `user_id` INT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pdsclient`.`companys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pdsclient`.`companys` (
  `company_id` INT NOT NULL,
  `company_name` VARCHAR(45) NOT NULL,
  `number_of_employees` INT NULL,
  `authoirzation_code` VARCHAR(45) NULL,
  PRIMARY KEY (`company_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pdsclient`.`files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pdsclient`.`files` (
  `file_id` INT NOT NULL,
  `file_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`file_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pdsclient`.`memberships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pdsclient`.`memberships` (
  `membership_id` INT NOT NULL,
  `subscription` INT NOT NULL,
  PRIMARY KEY (`membership_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pdsclient`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pdsclient`.`user_info` (
  `user_id` INT NOT NULL,
  `company_id` INT NOT NULL,
  `membership_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `company_id`, `membership_id`),
  INDEX `company_id_idx` (`company_id` ASC) VISIBLE,
  INDEX `membership_id_idx` (`membership_id` ASC) VISIBLE,
  CONSTRAINT `user_id_user_info`
    FOREIGN KEY (`user_id`)
    REFERENCES `pdsclient`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `company_id_user_info`
    FOREIGN KEY (`company_id`)
    REFERENCES `pdsclient`.`companys` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `membership_id_user_info`
    FOREIGN KEY (`membership_id`)
    REFERENCES `pdsclient`.`memberships` (`membership_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pdsclient`.`user_files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pdsclient`.`user_files` (
  `file_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `file_id`),
  INDEX `file_id_idx` (`file_id` ASC) VISIBLE,
  CONSTRAINT `user_id_user_files`
    FOREIGN KEY (`user_id`)
    REFERENCES `pdsclient`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `file_id_user_files`
    FOREIGN KEY (`file_id`)
    REFERENCES `pdsclient`.`files` (`file_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

