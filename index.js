const inquirer = require("inquirer");
const mysql = require ('mysql2');
const cTable = require('console.table');
const figlet = require ('figlet');//This method allows you to create ASCII Art from text.
// const Choices = require("inquirer/lib/objects/choices");

//function to create ASCII Art from text
figlet('Employee Manager', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
  });
//Create function init which will initialize the prompt
function init (){
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
     case 'Add a department'
   }

  });

}
//function to view all departments
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
 
function viewDepartments (){
    db.query('SELECT * FROM department', function(err,results ){
       console.table(results);
    });
    
}
function viewRoles (){
    db.query('SELECT * FROM roles ', function(err, results){
        console.table(results);
    });
}
function viewEmployees(){
    db.query('SELECT * FROM employees', function(err, results){
        console.table(results);
    });
}


// viewDepartments();
init();


//function view roles
//function view all employees
//function to add a department
//