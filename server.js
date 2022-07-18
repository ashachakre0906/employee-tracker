const inquirer = require('inquirer');
const express = require ('exprerss');
const cTable = require('console.table');
//Import and require mysql2
const mysql = require ('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//Express Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());