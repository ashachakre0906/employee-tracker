USE employee_db;
INSERT INTO department (name)
VALUES ('Engineering'),
       ('Quality Assurance'),
       ('Design'),
       ('HR'),
       ('Sales'),
       ('Finance'),
       ('Admin');
 

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 100000, 1),
       ('QA Engineer', 8000, 1),
       ('Engineering Manager',225000,1),
       ('UI/UX Designer', 12000, 2),
       ('Director',11000, 2),
       ('Lead', 6000, 3),
       ('Financial advisor',7000, 3),
       ('Systems Administrator',3000, 4);

INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES  ('Bob', 'Billy', 1, NULL),
        ('Andrew', 'Ray', 2, 1),
       ('Sandra', 'Will', 3, NULL),
       ('Vanessa', 'Rodrigues', 4, 2),
      ('Alex', 'Kraux', 3, 3),
      ('Andres','Paulson',2, 3),
      ('Louis', 'David', 2 , NULL);




--        SET GLOBAL FOREIGN_KEY_CHECKS=1

       
       
