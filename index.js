const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const figlet = require("figlet"); //This method allows you to create ASCII Art from text.

//function to create ASCII Art from text
const show = () => {
  figlet("Employee Manager", (err, data) => {
    if (err) {
      console.log(error);
    }
    console.log(data);
  });
  init();
};

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
  console.log(`Welcome you are connected to the employee_db database!`)
);
//Create function init which will initialize the prompt
function init() {
  // show();
  inquirer
    .prompt({
      type: "list",
      name: "options",
      message: "Whatv would you like to do ?",
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
        case "Update An Employee Role":
          updateEmployee();
          break;
        case "Exit application":
          quit ();
          break;
      }
    });
}
// init();
show();
function quit (){
  connection.end();
  process.exit();
}

function viewDepartments() {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
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
  function (err, results)
  {
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
      name: "department",
      message: "Which department does the role belongs to ?",
      choices: departmentArray
    }
  ])

    .then((answer) => {
      db.query(`INSERT INTO employee_db.roles (title ,salary,department_id) VALUES (? , ? , ?)`,[answer.title, answer.salary,answer.department_id],    
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.table(results);
          console.log(
            `Added ${answer.title},${answer.salary},${answer.department_id} to the database`
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
      name: "firstname",
      message: "Please enter employee's first name?"
    }
    ,
    {
      type: "input",
      name: "lastname",
      message: "Please enter employee's last name?"
    }
    ,
    {
      type: "list",
      name: "role",
      message: "Please choose employee's role?",
      choices: selectRole(),  
    }
    ,
    {
      type: "list",
      name: "managerlists",
      message: selectManager(),
    }
     
  ]).then ((answers)  => {
    db.query (`INSERT INTO employees SET ?`,
    {
      firstName: answers.firstname,
      lastname: answers.lastname,
      roleID: answers.role,
      managerId: answers.managerlists
    },
    function(err , results){
      if (err) {
        console.log(error);
      console.table(results);
    }
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

    roleArr.push(results[i].title);

    }

  })
  return roleArr;
}

//function to select manager()

let managerArray = [];
function selectManager(){
  db.query(`SELECT first_name, last_name AS manager from employees`, function(err , results){
    if (err){
      console.log(err);
    }
    for (let i = 0 ; i < results.length; i++){
      managerArray.push(results[i].manager)
    }

  });
  return managerArray;

};

//function to update an employee
