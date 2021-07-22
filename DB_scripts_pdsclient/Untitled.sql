
-- INSERT INTO users (first_name, last_name, `password`, email) VALUES ('Clay', 'West', 'password', 'cw@gmail.com');
-- INSERT INTO companys (company_name, number_of_employees, `authorization_code`) VALUES ('Bio Marin', 2000, 'BM80PDS');
-- INSERT INTO memberships (subscription, user_id) VALUES ('Emperor Penguin', (SELECT user_id from users WHERE first_name = 'Clay' and last_name = 'West' and email = 'cw@gmail.com'));
-- INSERT INTO user_info (company_id, user_id, membership_id) VALUES ((SELECT company_id from companys where company_name = 'Bio Marin' and `authorization_code` = 'BM80PDS'), (SELECT user_id from users WHERE first_name = 'Clay' and last_name = 'West' and email = 'cw@gmail.com'),
-- (SELECT membership_id from memberships where user_id = (SELECT user_id from users WHERE first_name = 'Clay' and last_name = 'West' and email = 'cw@gmail.com')));

-- INSERT INTO users (first_name, last_name, `password`, email) VALUES ('Gert', 'Denver', 'password','undefined'); 
-- INSERT INTO companys (company_name, number_of_employees, `authorization_code`) VALUES ('undefined', 2000, 'undefined80PDS'); 
-- INSERT INTO memberships (subscription, user_id) VALUES ('volvo', (SELECT user_id from users WHERE first_name = 'Gert' and last_name = 'Denver' and email = 'undefined')); 
-- INSERT INTO user_info (company_id, user_id, membership_id) VALUES ((SELECT company_id from companys where company_name = 'undefined' and `authorization_code` = 'undefined80PDS'), 
-- (SELECT user_id from users WHERE first_name = 'Gert' and last_name = 'Denver' and email = 'undefined'), (SELECT membership_id from memberships where user_id = 
-- (SELECT user_id from users WHERE first_name = 'Gert' and last_name = 'Denver' and email = 'undefined')));

-- SELECT users.first_name, users.last_name, users.email, users.user_id, user_info.company_id, companys.company_name, memberships.subscription
-- FROM (((users
-- INNER JOIN user_info ON 3 = user_info.user_id)
-- INNER JOIN companys ON user_info.company_id = companys.company_id)
-- INNER JOIN memberships ON memberships.membership_id = user_info.membership_id) WHERE users.user_id = 3;


-- Select * from users;
-- SELECT user_id from users WHERE first_name = 'T' and last_name = 'R' and email = 'tr@gmail.com' and password = 'password';
-- SELECT * from user_info where user_id = 7;
-- --  
-- 
-- DROP TABLE user_info;
-- DROP TABLE companies;
-- Drop table memberships;
-- drop table reminders;
-- drop table to_do_list;
-- drop table applications;
-- drop table user_files;
-- drop table files;
-- drop table users;


-- INSERT INTO users (first_name, last_name, `password`, email) VALUES ('Garrett', 'West', 'password','undefined'); INSERT INTO companies (company_name, number_of_employees, `authorization_code`) SELECT 'undefined',2000, 'undefined80PDS' WHERE NOT EXISTS (Select company_name From companies WHERE company_name  ='undefined') LIMIT 1; INSERT INTO memberships (subscription, user_id) VALUES ('Little Penguin', (SELECT user_id from users WHERE first_name = 'Garrett' and last_name = 'West' and email = 'undefined' and password = 'password')); INSERT INTO user_info (company_id, user_id, membership_id) VALUES ((SELECT company_id from companies where company_name = 'undefined' and  authorization_code = 'Deloitte80PDS'), (SELECT user_id from users WHERE first_name = 'Garrett' and last_name = 'West' and email = 'undefined' and password = 'password'), (SELECT membership_id from memberships where user_id = (SELECT user_id from users WHERE first_name = 'Garrett' and last_name = 'West' and email = 'undefined' and password = 'password')));

-- INSERT INTO users (first_name, last_name, `password`, email) SELECT 'Russ', 'West', 'password','undefined' WHERE NOT EXISTS (SELECT user_id from users WHERE first_name = 'Russ' and last_name = 'West' and email = 'undefined' and password = 'password')  LIMIT 1; INSERT INTO companies (company_name, number_of_employees, `authorization_code`) SELECT 'undefined',2000, 'undefined80PDS' WHERE NOT EXISTS (Select company_name From companies WHERE company_name  ='undefined') LIMIT 1; INSERT INTO memberships (subscription, user_id) VALUES ('Little Penguin', (SELECT user_id from users WHERE first_name = 'Russ' and last_name = 'West' and email = 'undefined' and password = 'password')); INSERT INTO user_info (company_id, user_id, membership_id) VALUES ((SELECT company_id from companies where company_name = 'undefined' and  authorization_code = 'undefined80PDS'), (SELECT user_id from users WHERE first_name = 'Russ' and last_name = 'West' and email = 'undefined' and password = 'password'), (SELECT membership_id from memberships where user_id = (SELECT user_id from users WHERE first_name = 'Russ' and last_name = 'West' and email = 'undefined' and password = 'password')));



-- INSERT INTO users (first_name, last_name, `password`, email) SELECT 'Garrett', 'West', 'password','gw@gmail.com' WHERE NOT EXISTS (SELECT user_id from users WHERE first_name = 'Garrett' and last_name = 'West' and email = 'gw@gmail.com' and password = 'password')  LIMIT 1; 
-- INSERT INTO companies (company_name, number_of_employees, `authorization_code`) SELECT 'Deloitte',2000, 'Deloitte80PDS' WHERE NOT EXISTS (Select company_name From companies WHERE company_name  ='Deloitte') LIMIT 1; 
-- INSERT INTO memberships (subscription, user_id) VALUES ('Little Penguin', (SELECT user_id from users WHERE first_name = 'Garrett' and last_name = 'West' and email = 'gw@gmail.com' and password = 'password'));
--  INSERT INTO user_info (company_id, user_id, membership_id) 
--  VALUES ((SELECT company_id from companies where company_name = 'Deloitte' and  authorization_code = 'Deloitte80PDS'), 
--  (SELECT user_id from users WHERE first_name = 'Garrett' and last_name = 'West' and email = 'gw@gmail.com' and password = 'password'), 
--  (SELECT membership_id from memberships where user_id = (SELECT user_id from users WHERE first_name = 'Garrett' and last_name = 'West' and email = 'gw@gmail.com' and password = 'password')));

-- (SELECT company_id from companies where company_name = 'Deloitte' and  authorization_code = 'Deloitte80PDS');

-- select * from companies;
-- select * from users;
-- select * from memberships;-- 
-- INSERT INTO applications (user_id, `application_name`, application_due_date) VALUES (1, 'Glasses Patent','2021-04-20');
-- INSERT INTO applications (user_id, `application_name`, application_due_date) VALUES (1, 'Coffee Cup Patent','2021-04-20');
-- INSERT INTO applications (user_id, `application_name`, application_due_date) VALUES (1, 'Dog Toy Patent','2021-04-28');
-- INSERT INTO applications (user_id, `application_name`, application_due_date) VALUES (1, 'Microsoft tablet new design patent','2021-04-25');
-- INSERT INTO applications (user_id, `application_name`, application_due_date) VALUES (1, 'Mark Cubans Patent','2021-04-19');
-- select * from applications;
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (1,11,'Glasses Design', 'Get design fron client', '2021-04-19');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (1,12,'Submit Patent', 'Need to submit the patent but first need to review the patent and check for errors', '2021-04-21');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (1,13,'Check Status', 'Check the status for Dog Toy Patent as I got a notification of updated status', '2021-04-22');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (1,14,'Email Bill Gates', 'Get design from bill gates for the patent', '2021-04-20');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (1,15,'Lunch with Cuban', 'Lunch to discuss Cubans current patent', '2021-04-20');

-- ALTER TABLE applications ADD  client_name VARCHAR(50);
--   ALTER TABLE applications ADD client_information VARCHAR(2000);
--   ALTER TABLE applications ADD description VARCHAR(2000);
-- DELETE FROM reminders where user_id =1;
-- DELETE FROM applications where user_id = 1;
-- SELECT reminder_title, remind_on from reminders where user_id = 1 ORDER BY remind_on;
-- SELECT `application_name`,  application_due_date from applications where user_id = 1 ORDER BY application_due_date asc LIMIT 5;

-- select * from users where user_id = 1;


-- Select * from reminders;


-- select * from applications;








-- DROP TABLE cases;


-- CREATE TABLE IF NOT EXISTS `pdsclient`.`cases` (
--   `case_id` INT NOT NULL AUTO_INCREMENT,
--   `case_name` VARCHAR(45),
--   `user_id` INT NOT NULL,
--   `number_of_files` INT,
--   `client_name` VARCHAR(50),
--   `client_information` VARCHAR(2000),
--   `description` VARCHAR(2000),
--   PRIMARY KEY (`case_id`),
--   CONSTRAINT `user_id_cases`
--     FOREIGN KEY (`user_id`)
--     REFERENCES `pdsclient`.`users` (`user_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;

-- drop table reminders;
-- drop table timeline;
-- drop table applications;








-- CREATE TABLE IF NOT EXISTS `pdsclient`.`applications` (
--   `application_id` INT NOT NULL AUTO_INCREMENT,
--   `case_id` INT NOT NULL,
--   `application_name` VARCHAR(45),
--   `user_id` INT NOT NULL,
--   `number_of_files` INT,
--   application_due_date DATE,
--   client_name VARCHAR(50),
--   client_information VARCHAR(2000),
--   description VARCHAR(2000),
--   PRIMARY KEY (`application_id`),
--   CONSTRAINT `user_id_applications`
--     FOREIGN KEY (`user_id`)
--     REFERENCES `pdsclient`.`users` (`user_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--     CONSTRAINT `case-id_applications`
--     FOREIGN KEY (`case_id`)
--     REFERENCES `pdsclient`.`cases` (`case_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;




-- INSERT INTO cases (user_id, `case_name`,   `client_name`,`client_information`,`description`) VALUES (1, 'Glasses Patent', 'John Doe', 'Indepent contractor','this is a great design for a glass wear that makes you see better');
-- INSERT INTO cases (user_id , `case_name`,   `client_name`,`client_information`,`description`) VALUES (1, 'Coffee Cup Patent', 'Brian Montana','Indepent contractor',"this is a great design for a coffee cups");
-- INSERT INTO cases (user_id , `case_name`,   `client_name`,`client_information`,`description`) VALUES (1, 'Dog Toy Patent','Clay Test','Indepent contractor',"this is a great design for dog toy");
-- INSERT INTO cases (user_id , `case_name`,   `client_name`,`client_information`,`description`) VALUES (1, 'Microsoft tablet new design patent','Garrett Neustrom', 'Microsoft',"this is a great design for a tablet");
-- INSERT INTO cases (user_id , `case_name`,   `client_name`,`client_information`,`description`) VALUES (1, 'Mark Cubans Patent','Mark Cuban', 'Indepent contractor',"this is a great design for a new car");
-- INSERT INTO applications (user_id, case_id, `application_name`, application_due_date) VALUES (1,1, 'Glasses Patent','2021-04-20');
-- INSERT INTO applications (user_id,case_id,  `application_name`, application_due_date) VALUES (1,2, 'Coffee Cup Patent','2021-04-20');
-- INSERT INTO applications (user_id, case_id, `application_name`, application_due_date) VALUES (1, 3,'Dog Toy Patent','2021-04-28');
-- INSERT INTO applications (user_id, case_id,  `application_name`, application_due_date) VALUES (1, 4,'Microsoft tablet new design patent','2021-04-25');
-- INSERT INTO applications (user_id,case_id, `application_name`, application_due_date) VALUES (1, 5, 'Mark Cubans Patent','2021-04-19');


-- CREATE TABLE IF NOT EXISTS `pdsclient`.`reminders` (
--   `reminder_id` INT NOT NULL AUTO_INCREMENT,
--   `user_id` INT NOT NULL,
--   `application_id` INT,
--    `reminder_title` VARCHAR(45),
--   `reminder` VARCHAR(200),
--   `remind_on` datetime,
--   PRIMARY KEY (`reminder_id`),
--   CONSTRAINT `user_id_reminders`
--     FOREIGN KEY (`user_id`)
--     REFERENCES `pdsclient`.`users` (`user_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--   CONSTRAINT `application_id_reminders`
--     FOREIGN KEY (`application_id`)
--     REFERENCES `pdsclient`.`applications` (`application_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;





-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (1,1,'Glasses Design', 'Get design fron client', '2021-04-19');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (1,2,'Submit Patent', 'Need to submit the patent but first need to review the patent and check for errors', '2021-04-21');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (1,3,'Check Status', 'Check the status for Dog Toy Patent as I got a notification of updated status', '2021-04-22');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (1,4,'Email Bill Gates', 'Get design from bill gates for the patent', '2021-04-20');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (1,5,'Lunch with Cuban', 'Lunch to discuss Cubans current patent', '2021-04-20');

-- SELECT case_id from applications where user_id = 1 ORDER BY application_due_date asc LIMIT 1;
-- SELECT case_name from cases where case_id = (SELECT case_id from applications where user_id = 1 ORDER BY application_due_date asc LIMIT 1);





-- SELECT * from users;
-- select * from applications where user_id = 1;

-- CREATE TABLE IF NOT EXISTS `pdsclient`.`timeline` (
--   `to_do_id` INT NOT NULL AUTO_INCREMENT,
--   `to_do_item` VARCHAR(45),
--   `application_id` INT,
--   `user_id` INT NOT NULL,
--   `completed` BOOLEAN,
--   `complete_by` DATETIME,
--   PRIMARY KEY (`to_do_id`),
--   CONSTRAINT `user_id_to_do_list`
--     FOREIGN KEY (`user_id`)
--     REFERENCES `pdsclient`.`users` (`user_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--   CONSTRAINT `application_id_to_do_list`
--     FOREIGN KEY (`application_id`)
--     REFERENCES `pdsclient`.`applications` (`application_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;






-- SELECT * from cases;
-- SELECT * from applications where case_id = 5;

-- UPDATE companies SET  address = '225 Bush Street 17th Floor San Francisco CA 94104 USA' WHERE company_id = 16;
-- select * from cases;

-- INSERT INTO cases (user_id, `case_name`,   `client_name`,`client_information`,`description`) VALUES (35, 'Glasses Patent', 'John Doe', 'Indepent contractor','this is a great design for a glass wear that makes you see better');
-- INSERT INTO cases (user_id , `case_name`,   `client_name`,`client_information`,`description`) VALUES (35, 'Coffee Cup Patent', 'Brian Montana','Indepent contractor',"this is a great design for a coffee cups");
-- INSERT INTO cases (user_id , `case_name`,   `client_name`,`client_information`,`description`) VALUES (35, 'Dog Toy Patent','Clay Test','Indepent contractor',"this is a great design for dog toy");
-- INSERT INTO cases (user_id , `case_name`,   `client_name`,`client_information`,`description`) VALUES (35, 'Microsoft tablet new design patent','Garrett Bot', 'Microsoft',"this is a great design for a tablet");
-- INSERT INTO cases (user_id , `case_name`,   `client_name`,`client_information`,`description`) VALUES (35, 'Mark Cubans Patent','Mark Cuban', 'Indepent contractor',"this is a great design for a new car");
-- INSERT INTO applications (user_id, case_id, `application_name`, application_due_date) VALUES (35,6, 'Glasses Patent','2021-04-29');
-- INSERT INTO applications (user_id,case_id,  `application_name`, application_due_date) VALUES (35,7, 'Coffee Cup Patent','2021-04-29');
-- INSERT INTO applications (user_id, case_id, `application_name`, application_due_date) VALUES (35, 8,'Dog Toy Patent','2021-04-28');
-- INSERT INTO applications (user_id, case_id,  `application_name`, application_due_date) VALUES (35, 9,'Microsoft tablet new design patent','2021-04-29');
-- INSERT INTO applications (user_id,case_id, `application_name`, application_due_date) VALUES (35, 10, 'Mark Cubans Patent','2021-04-30');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (35,10,'Glasses Design', 'Get design fron client', '2021-04-19');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (35,11,'Submit Patent', 'Need to submit the patent but first need to review the patent and check for errors', '2021-04-21');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (35,12,'Check Status', 'Check the status for Dog Toy Patent as I got a notification of updated status', '2021-04-22');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (35,13,'Email Bill Gates', 'Get design from bill gates for the patent', '2021-04-20');
-- INSERT INTO reminders(user_id, application_id, `reminder_title`,`reminder`, remind_on) VALUES (35,14,'Lunch with Cuban', 'Lunch to discuss Cubans current patent', '2021-04-20');
-- SELECT * from applications;




