const inquirer = require('inquirer');
const cTable = require('console.table');
const DatabaseQueries = require('./database.js');

const db = new DatabaseQueries(
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
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Delete a department',
                    'Delete a role',
                    'Delete an employee',
                    'View employees by manager',
                    'Update an employee manager',
                    'View total budget of a department',
                    'Exit',
                ]
            }
        ]);

        switch (userRequest.action) {
            case 'View all departments':
                const departments = await db.viewAllDepartments(connect);
                console.table(departments);
                await userPrompt();
                break;
            case 'View all roles':
                const roles = await db.viewAllRoles(connect);
                console.table(roles);
                await userPrompt();
                break;
            case 'View all employees':
                const employees = await db.viewAllEmployees(connect);
                console.table(employees);
                await userPrompt();
                break;
            case 'Add a department':
                const { dept_name } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'dept_name',
                        message: 'Enter the name of the new department',
                        validate: deptInput => {
                            if (deptInput) {
                                return true;
                            } else {
                                console.log('Please enter a department name');
                                return false;
                            }
                        }
                    }
                ]);

                await db.addDepartment(connect, dept_name);
                console.log('Department added successfully!');
                await userPrompt();
                break;
                case 'Add a role':
                    const departmentIDs = await db.getDepartmentsAndIDs(connect);
                    const departmentChoices = departmentIDs.map(dept => ({
                        name: dept.dept_name,
                        value: dept.id
                    }));
                    const { title, salary, department_id } = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'title',
                            message: 'Enter the name of the new role',
                            validate: roleInput => {
                                if (roleInput) {
                                    return true;
                                } else {
                                    console.log('Please enter a role name');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Please enter the salary for this new role',
                            validate: salaryInput => {
                                const isValid = !isNaN(salaryInput) && parseFloat(salaryInput) >0;
                                if (isValid) {
                                    return true;
                                } else {
                                    console.log('Please enter a valid salary');
                                    return false;
                                }
                            }   
                        },
                        {
                            type: 'list',
                            name: 'department_id',
                            message: 'Please select which department this role belongs to',
                            choices: departmentChoices
                        }
                    ]);
    
                    await db.addRole(connect, title, salary, department_id);
                    console.log('Role added successfully!');
                    await userPrompt();
                    break;    
            case 'Exit':
                await connect.end();
                break;
        }
    } catch (error) {
        console.error('Error:', error.message);
        await connect.end();
    };
};

userPrompt();







