const inquirer = require("inquirer");
const mysql = require ('mysql2');
const cTable = require('console.table');
// const Choices = require("inquirer/lib/objects/choices");
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
      case'View all departments':
      viewDepartments();

      

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
    console.log(`Connected to the employee_db database.`)
);
function viewDepartments (){
    db.query('SELECT * FROM department', function(err,results ){
       console.log(results) ;
    })
    
}
// viewDepartments();
init();


//function view roles
//function view all employees
//function to add a department
//