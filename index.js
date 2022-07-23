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
      message: "Which option would you like to choose ?",
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
          connection.end();
          break;
      }
    });
}
// init();
show();

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
          // console.table(results);
          console.log(`Added ${answer.options} to the database`);
          init();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the role ?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role ?",
      }
    ])

    .then((answer) => {
      db.query(`INSERT INTO roles (name)
      VALUES ${answer.name},
             ${answer.salary}`),
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.table(results);
          console.log(
            `Added ${answer.name},${answer.salary},${answer.department} to the database`
          );
          init();
        };
    });
}



