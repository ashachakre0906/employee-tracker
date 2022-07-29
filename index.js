const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable }  = require ('console-table-printer');
// const cTable = require("console.table");//display data table in command line
const figlet = require("figlet"); //This method allows you to create ASCII Art from text.

const db = mysql.createConnection(
  
  {
    host: "localhost",
    // MySQL Username
    user: "root",
    port: 3306,
    //MySQL Password
    password: "password",
    database: "employee_db",
  },
  console.log(`Welcome!You are connected TO EMPLOYEE TRACKER database!`)
);

//Connection to the database
db.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${db.threadId}\n`);
  figlet('Employee Tracker',function ( err ,data){
    if (err) {
      console.log ('ASCII not loading !');
    } else {
      console.log(data);
    }
    init();
  });
});
//Create function init which will initialize the prompt
function init() {
  inquirer.prompt({
      type: "list",
      name: "options",
      message: "What would you like to do ?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Role",
        "Add A Department",
        "Add An Employee",
        "Update An Employee role",
      ],
    })
    .then((answer) => {
      console.log(answer);
      switch (answer.options) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add A Department":
          addDepartment();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Update An Employee role":
          updateEmployee();
          break;
        case "Delete a Department":
          deleteDepartment();
        break;
          case "Delete a Role":
            deleteRole();
        break;
        case "Delete an Employee":
            deleteEmployee();
          
        // default:
        //   quit ();
        //   console.log("=================================");
        //   console.log("");
        //   console.log("Thank you for using Employee Tracker Database");
        //   console.log("");
        //   console.log("=================================");
      }
    })
  .catch(err => {
    console.error(err);

  });
}
//quit function

function quit (){
  db.end();
  process.exit();
}

function viewDepartments() {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
    }
    printTable(results);
    init();
  });
}
function viewRoles() {
  db.query(
    `SELECT roles.id, roles.title AS title, department.name AS department,roles.salary FROM roles INNER JOIN department ON roles.department_id = department.id;`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      init();
    }
  );
}

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
      console.table(results);
      init();
    }
  );
}

function addDepartment() {
  inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "What department would you like to add ?",
      choices: ["Engineering", "Quality Assurance","Design","HR","Sales","Finance","Admin"]
    }
    ]).then((answer) => {
      db.query(
        `INSERT INTO department SET ?`,
        {
          name : answer.options
        },
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.table(results);
          console.log(`Added ${answer.options} to the database`);
          init();
        }
      );
    });
}
function addRole() {
  const departmentArray = [];
  db.query ('SELECT department.id, department.name AS Department FROM department', 
  function (err, results){
    if (err){
      console.log(err);
    }    
    results.forEach (function(i)
    {
      const department = {
        name : i.Department,
        value: i.id
      }
      departmentArray.push(department);
    })
    console.log(departmentArray);
    role();
  });  
  function role()
  {
    inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is the name of the role ?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the role ?",
    }
    ,
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belongs to ?",
      choices: departmentArray
    }
  ])
    .then((answer) => {
      console.log(answer.department_id);
      db.query(`INSERT INTO employee_db.roles (title ,salary,department_id) VALUES (? , ? , ?)`,[answer.title, answer.salary,answer.department_id],    
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.table(results);
          console.log(
            `New Role ${answer.title} is successfully added to the database`
          ); 
          init();
        }
      );
    });
  }
  }

//function to add an employee to the database
function addEmployee (){
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Please enter employee's first name?"
    }
    ,
    {
      type: "input",
      name: "last_name",
      message: "Please enter employee's last name?"
    }
    ,
    {
      type: "list",
      name: "role",
      message: "Please choose employee's role?",
      choices: selectRole()
    }
    ,
    {
      type: "list",
      name: "manager",
      message:"Who is employees manager?" ,
      choices: selectManager(),
    }
     
  ]).then ((answers)  => {
    let roleId = answers.role;
    let managerId = answers.manager;
    db.query (`INSERT INTO employee_db.employees SET ?`,
    {
      first_name: answers.first_name,
      last_name: answers.last_name,
      manager_id:managerId,
      role_id:roleId

    },
    function(err , results){
      if (err) {
        console.log(err);
      }
      console.table(results);
      console.log(`Successfully added new employee ${answers.first_name} ${answers.last_name} to the database`)
      init();
  });
});
};


//Function to select role
let roleArr = [];
function selectRole(){
  db.query(`SELECT * FROM roles`, function(err , results) {
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < results.length; i++){
     let data = {
      name : results[i].title,
      value : results [i].id
     }
    roleArr.push(data);
    // console.log(results[i].id);

    }

  })
  return roleArr;
}

//function to select manager()

let managerArray = [];
function selectManager(){
  db.query(`SELECT * FROM employees`, function(err , managerList){
    if (err){
      console.log(err);
    }
    for (let i = 0 ; i < managerList.length; i++){
      let manager = {
        name :managerList[i].first_name + " " + managerList[i].last_name,
        value: managerList[i].id
      }
      managerArray.push(manager)
    }

  });
  return managerArray;

};

//function to update an employee

function updateEmployee(){
// db.query (`SELECT employees.first_name,employees.last_name,roles.title,roles.salary FROM employees
//   JOIN ROLES ON employees.role_id = roles.id`,function(err , results){
//     if (err) throw err
//     console.log(results);
    inquirer.prompt([
    {
      type: 'list',
      name: 'getemployee',
      message: 'Which employee role you want to update ?',
      choices: employeeArray()
    },
    {
      name: 'role',
      type: 'list',
      message: 'Which role do you want to assign to the selected employee?',
      choices: selectRole()
    }
  ]).then ((answers) => {

    let roleId = selectRole().indexOf(answers.role) + 1
    db.query (`UPDATE employees SET WHERE ?`,
    {
      first_name:answers.getemployee
    },
    {
      role_id: roleId
    }
    ,
    function (err , results){
      if (err) throw err;
      console.log('Updated employees role to the database');
      db.query (`SELECT * FROM employees`,( err , results) => {
      if (err) {
      console.log(err);
      init();
      }
      console.table(results);
      init();
    });
    });
    
  })
};
//Function to display list of employees
let employeeArr = [];
function employeeArray(){
  db.query(`SELECT * FROM employees`, function(err , empresults){
    console.log(results);
  if (err) {
    console.log(err);
  }
  for(let i = 0; i < empresults.length; i++ ){
    let empl = {
      name:empresults[i].first_name + " " + empresults[i].last_name,
      value:empresults[i].id
    }

    employeeArr.push(empl)
  }
  return employeeArr;
});
// console.log(employeeArr);
};


//Function to update employee's manager
//function to Delete a department
const deleteDepartment = () => {
  const department = [];
  db.query (`SELECT * FROM DEPARTMENT`, (error , results) => {
    if (error) throw err;
    results.forEach(dept => {
      let departments = {
        name: dept.name,
        value:dept.id
      }
      department.push(departments);
    });
    inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      choices: department,
      message: "Which department do you want to delete?"
    }

    ]).then (answers => {

     db.query( `DELETE FROM DEPARTMENT WHERE ID = ?`[answers.id],function (err , results){

      if (err) {
        console.log(error);
        init();
      }
      console.table(results);
      init();

     });

    });
  
  });

};



//Function to Delete an employee
//Function to Delete a role
//Function to View the total utilized budget of a department



