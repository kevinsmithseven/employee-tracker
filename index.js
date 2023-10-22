const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Database = require('./database.js');

const db = new Database(
    {
        host: 'localhost',
        // MySQL username
        user: 'root',
        // MySQL password
        password: 'rootroot',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

