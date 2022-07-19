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
       ('QA Engineer', 8000, 2);
       ('UI/UX Designer', 12000, 3),
       ('Director',11000, 4),
       ('Lead', 6000, 5),
       ('Financial advisor',7000, 6),
       ('Systems Administrator',3000, 7);

INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES ('Bob', 'Billy', 1, NULL),
       ('Andrew', 'Ray', 2, 1),
       ('Sandra', 'Will', 3, NULL),
       ('Vanessa', 'Rodrigues', 4, 2),
       ('Alex', 'Kraux', 5, NULL),
       ('Andres','Paulson',6, 3),
       ('Louis', 'David', 7 , NULL);
       
       
