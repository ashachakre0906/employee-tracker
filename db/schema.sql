DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) ,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id)
REFERENCES department(id),
PRIMARY KEY (id)
);
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL ,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id),
    FOREIGN KEY (role_id)
    REFERENCES roles (id),
	  PRIMARY KEY (id)
);
