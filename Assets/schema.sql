

-- Drops the db if it already exists --
DROP DATABASE IF EXISTS employee_db;
-- Create the database db and specified it for use.
CREATE DATABASE employee_db;

USE employee_db;

-- Create the tables.
CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) ,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INT,
  PRIMARY KEY (id)
);

