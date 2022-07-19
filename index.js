//Required dependencies
const inquirer = require('inquirer');
const express = require ('express');
const cTable = require('console.table');
const figlet = require ('figlet');//This method allows you to create ASCII Art from text.

//Import and require mysql2
const mysql = require ('mysql2');

const PORT = process.env.PORT || 3001;

//Creating an app by invoking express function
const app = express();

//Express Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Create connection to the database
const db = mysql.createConnection(
{
  host: 'localhost',
  // MySQL Username
  user: 'root',
  //MySQL Password
  password: 'password',
  database: 'books_db'
},
console.log(`Connected to the employee_db database.`)
)

figlet('Employee Manager', function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data)
});
//Default response for any other request NOT found

app.use ((req, res) => {
  res.status(404).end();

});

app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);

});