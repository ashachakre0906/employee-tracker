const inquirer = require("inquirer");
const mysql = require ('mysql2');
const cTable = require('console.table');
const figlet = require ('figlet');//This method allows you to create ASCII Art from text.


//function to create ASCII Art from text
const show = () => {
  figlet('Employee Manager', (err, data) => {
    if (err) {
     console.log (error);
    }
    console.log (data);
   });
   init();
}

  const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      //MySQL Password
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Welcome you are connected to the employee_db database!`)
);
//Create function init which will initialize the prompt
function init (){
    // show();
    inquirer.prompt({

   type :'list',
   name: 'options',
   message:'Which option would you like to choose ?',
   choices: ['View all departments','View all roles','View all employees', 'Add a department',
   'Add a role','Add an employee','Update an employee role']
    })
  .then ((answer) => {
   console.log(answer);
   switch (answer.options) {
    case 'View all departments':
      viewDepartments();
      break;
    case 'View all roles':
        viewRoles();
     break;
    case 'View all employees':
        viewEmployees();
     break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee':
      updateEmployee();
      break;
    case 'Exit application':
    connection.end();
      break;      
   }

  });

}
// init();
show();
 
function viewDepartments (){
    db.query('SELECT * FROM department', function(err,results ){
       console.table(results);
       init();
    });
    
}
function viewRoles (){
    db.query('SELECT department.name,roles.title AS job_title, roles.id,roles.salary FROM roles INNER JOIN department ON roles.department_id = department.id', function(err, results){
        console.table(results);
        init();
    });
  }

function viewEmployees(){
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, 
    roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employees 
    LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department on role.department_id = department.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id;`, function(err, results){
    console.table(results);
        init();
    });
}


function addDepartment(){
  inquirer.prompt({

    type :'input',
   name: 'options',
   message:'What is the name of the department ?',

    }).then ((answer) => {
      db.query (`INSERT INTO department (name)VALUES${answer.options}`)

    });

}

function addRole (){
  inquirer.prompt([{

   type :'input',
   name: 'name',
   message:'What is the name of the role ?',
  },
  {
    type :'input',
    name: 'salary',
    message:'What is your salary ?'
  }
  ,
  {
    type :'input',
    name: 'department',
    message:'What is your department ?'
  },
]
  
    ).then ((answer) => {
      db.query (`INSERT INTO roles (name)VALUES
      ${answer.name},
      ${answer.salary},
      ${answer.department}`)

    });








// viewDepartments();


//function view roles
//function view all employees
//function to add a department
//


