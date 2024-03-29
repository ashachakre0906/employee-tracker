# employee-tracker
Challenge is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.These interfaces are called content management systems (CMS) which allows non-developers to easily view and interact with information stored in databases.

## [Solution URL](https://github.com/ashachakre0906/employee-tracker)

## Application DEMO

https://user-images.githubusercontent.com/101746882/183608403-4edd3817-c2b1-4f2b-8d4c-35688c7706df.mp4


[Screencastify link](https://watch.screencastify.com/v/ghrKO2GLVk2NqIsLT3e4)

## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business.
```
### Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```
### Code Examples & Screenshots

<img src ="images/ASCII.png">
<img src ="images/ViewRoles.png">

### function to view employees
```
function viewEmployees() {
  db.query(
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.name AS department, 
    roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager 
    FROM employees 
    LEFT JOIN roles on employees.role_id = roles.id 
    LEFT JOIN department on roles.department_id = department.id 
    LEFT JOIN employees manager on manager.id = employees.manager_id;`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      printTable(results);
      init();
    }
  );
}
```

### Required Dependencies

* Uses the Inquirer package 
 - `npm install --save inquirer`

* Uses the MySQL2 package which connects to a MySQL database.
- `npm install --save mysql2`

* Uses the console.table package which prints MySQL rows to the console
- `npm install console-table`
* Initialize mysql shell by entering command in your terminal `mysql -u root -p` and execute  `source db/schema.sql` which will create the database.
* We need to seed the database by executing `source db/seeds.sql`

* `node index.js` command required to invoke the application from the command line.

* Refer to the documentation:

[npm documentation on MySQL2](https://www.npmjs.com/package/mysql2#installation)

## License
This project is license under [MIT](https://choosealicense.com/licenses/mit/)
## Technologies Used

![Javascript Badge](https://img.shields.io/badge/Javascript-blue.svg)
![Node.js Badge](https://img.shields.io/badge/Node-yellow.svg)
![Inquirer Badge](https://img.shields.io/badge/Inquirer-orange.svg)
![MySQL2 Badge](https://img.shields.io/badge/MySQL2-magenta.svg)

## Questions
Please reach out to me:<br>
Email Address: chourpagar.asha@gmail.com <br>
Github Repo URL:[GitHub](https://github.com/ashachakre0906)



