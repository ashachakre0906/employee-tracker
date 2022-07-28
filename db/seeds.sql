USE employee_db;
INSERT INTO department (name)
VALUES ('Engineering'),
       ('Quality Assurance'),
       ('Design'),
       ('HR'),
       ('Sales'),
       ('Finance'),
       ('Admin');

INSERT INTO roles (title, salary, department_id)
VALUES ('Software Engineer', 100000, 1),
      ('Engineering Manager',225000,1),
	('QA Engineer', 8000, 2),
      ('QA Manager', 9000, 2),
      ('UI/UX Designer', 12000, 3),
	('Interior Designer', 13000, 3),
      ('HR Director',11000, 4),
      ('HR Lead', 8000, 4),
      ('Sales Specialist',5000, 5),
	('Sales Rep',5000, 5),
      ('Financial advisor',8000, 6),
	('Financial Manager',8000, 6),
      ('Systems Administrator', 3000, 7),
      ('Administrative Manager', 6000,7);


INSERT INTO employees (first_name,last_name,role_id,manager_id)
       VALUES
      ('Bob', 'Billy', 1, NULL),
      ('Andrew', 'Ray', 2, 1),
      ('Sandra', 'Will', 2, 2),
      ('Vanessa', 'Rodrigues', 3, 2),
      ('Alex', 'Kraux', 3, 3),
      ('Andres','Paulson',4, 3),
      ('Louis', 'David', 5 , NULL),
	('Vivian', 'Bill', 5 , 3),
      ('Cash' , 'Counter' , 6 , 4),
      ('Hulk' , 'Bold' , 7 ,NULL),
      ('Jessica','Fiesta', 8 , 5),
      ('Lisa', 'Fong', 8 , 5),
      ('Emerald','George',9 ,NULL),
	('Daisy','Moon',9 ,NULL);




--SET GLOBAL FOREIGN_KEY_CHECKS=1

       
       
