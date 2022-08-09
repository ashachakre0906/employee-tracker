-- SET GLOBAL FOREIGN_KEY_CHECKS = 1;
USE employee_db;
SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employees;

--Rename table role to roles
ALTER TABLE role RENAME TO roles;
--Rename table employee to employees
ALTER TABLE employee RENAME TO employees;

-- query to view roles-
SELECT roles.id, roles.title AS title, department.name AS department,roles.salary FROM roles INNER JOIN department ON roles.department_id = department.id;
--query to View all employees
SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.name AS department, 
    roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager 
    FROM employees 
    LEFT JOIN roles on employees.role_id = roles.id 
    LEFT JOIN department on roles.department_id = department.id 
    LEFT JOIN employees manager on manager.id = employees.manager_id
--query to Add a role
SELECT department.id, department.name AS Department FROM department

--query to update employee role
UPDATE employees SET role_id = ? WHERE id = ?

--query to delete department
DELETE FROM department WHERE id = ?

--query to delete a role
DELETE FROM roles WHERE id = ?

--query to delete an employee
DELETE FROM employees WHERE id = ?







