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
);


async function userPrompt() {
    const connect = await db.createConnection();
    console.log(`Connected to the employee_db database.`)

    try {
        const userRequest = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'View employees by manager',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Delete a department',
                    'Delete a role',
                    'Delete an employee',
                    'Exit',
                ]
            }
        ]);

        switch (userRequest.action) {
            case 'View all departments':
                const departments = await db.viewAllDepartments(connect);
                console.table(departments);
                break;
            case 'Exit':
                await connect.end();
                break;
            // ... handle other cases
        }
    } catch (error) {
        console.error('Error:', error.message);
        await connect.end();
    };
};

userPrompt();







