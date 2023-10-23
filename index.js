// Require necessary dependencies and packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const DatabaseQueries = require('./database.js');

// Create new DataBaseQueries instance
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

// Function for all user prompting and selections
async function userPrompt() {
    const connect = await db.createConnection();
    console.log(`Connected to the employee_db database.`)

    try {
        // Choices available to user in a list
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
                    // 'Delete a department',
                    // 'Delete a role',
                    // 'Delete an employee',
                    // 'View employees by manager',
                    // 'Update an employee manager',
                    // 'View employees by department,
                    // 'View total budget of a department',
                    'Exit',
                ]
            }
        ]);

        // Switch statement conditional to handle user choice
        switch (userRequest.action) {
            // User selects View all departments
            case 'View all departments':
                const departments = await db.viewAllDepartments(connect);
                console.table(departments);
                await userPrompt();
                break;
            // User selects View all roles
            case 'View all roles':
                const roles = await db.viewAllRoles(connect);
                console.table(roles);
                await userPrompt();
                break;
            // User selects View all employees
            case 'View all employees':
                const employees = await db.viewAllEmployees(connect);
                console.table(employees);
                await userPrompt();
                break;
            // User selects Add a department    
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
                console.log(`${dept_name} added successfully!`);
                await userPrompt();
                break;
            // User selects Add a role    
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
                            const isValid = !isNaN(salaryInput) && parseFloat(salaryInput) > 0;
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
                console.log(`${title} added successfully!`);
                await userPrompt();
                break;
            // User selects Add an employee
            case 'Add an employee':
                const roleIDAndTitle = await db.getRoleTitlesAndIDs(connect);
                const roleChoices = roleIDAndTitle.map(roles => ({
                    name: roles.title,
                    value: roles.id
                }));
                const { first_name, last_name, role_id } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: `What is the employee's first name?`,
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true
                            } else {
                                console.log('Please enter a first name');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: `What is the employee's last name?`,
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true
                            } else {
                                console.log('Please enter a last name');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'role_id',
                        message: `What is the employee's role?`,
                        choices: roleChoices
                    }
                ])
                await db.addEmployee(connect, first_name, last_name, role_id);
                console.log(`Employee ${first_name} ${last_name} added successfully!`);
                await userPrompt();
                break;

            // User selects Exit
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







