// Require necessary dependencies and packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const DatabaseQueries = require('./database.js');
const titleGraphic = () => console.log(`

.----------------------------------------------------------------.
|                                                                |
|  _____                       _                                 |
| | ____|  _ __ ___    _ __   | |   ___    _   _    ___    ___   |
| |  _|   | '_ \` _ \\  | '_ \\  | |  / _ \\  | | | |  / _ \\  / _ \\  |
| | |___  | | | | | | | |_) | | | | (_) | | |_| | |  __/ |  __/  |
| |_____| |_| |_| |_| | .__/  |_|  \\___/   \\__, |  \\___|  \\___|  |
|                     |_|                  |___/                 |
|  __  __                                                        |
| |  \\/  |   __ _   _ __     __ _    __ _    ___   _ __          |
| | |\\/| |  / _\` | | '_ \\   / _\` |  / _\` |  / _ \\ | '__|         |
| | |  | | | (_| | | | | | | (_| | | (_| | |  __/ | |            |
| |_|  |_|  \\__,_| |_| |_|  \\__,_|  \\__, |  \\___| |_|            |
|                                   |___/                        |
|                                                                |
'----------------------------------------------------------------'

`);

// display title art
titleGraphic();

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
    await db.createConnection();
        
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
                const departments = await db.viewAllDepartments();
                console.table(departments);
                break;
            // User selects View all roles
            case 'View all roles':
                const roles = await db.viewAllRoles();
                console.table(roles);
                break;
            // User selects View all employees
            case 'View all employees':
                const employees = await db.viewAllEmployees();
                console.table(employees);
                break;
            // User selects Add a department    
            case 'Add a department':
                const dept = await inquirer.prompt([
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

                await db.addDepartment(dept);
                console.log(`${dept.dept_name} added successfully!`);
                break;
            // User selects Add a role    
            case 'Add a role':
                const departmentIDs = await db.getDepartmentsAndIDs();
                const departmentChoices = departmentIDs.map(dept => ({
                    name: dept.dept_name,
                    value: dept.id
                }));
                const role = await inquirer.prompt([
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

                await db.addRole(role);
                console.log(`${role.title} added successfully!`);
                break;
            // User selects Add an employee
            case 'Add an employee':
                const roleIDAndTitle = await db.getRoleTitlesAndIDs();
                const roleChoices = roleIDAndTitle.map(roles => ({
                    name: roles.title,
                    value: roles.id
                }));
                const managers = await db.viewAllEmployees();
                const managerChoices = managers.map(manager => {
                    return {
                        name: manager.Employee,
                        value: manager["Employee ID"]
                    }
                })
                const answers = await inquirer.prompt([
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
                    },
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: `Who is the employee's manager?`,
                        choices: managerChoices
                    }
                ])
                await db.addEmployee(answers);
                console.log(`Employee ${answers.first_name} ${answers.last_name} added successfully!`);
                break;
            // User selects Update an employee role
            case 'Update an employee role':
                const allEmployees = await db.viewAllEmployees();
                const employeeChoice = allEmployees.map(employees => ({
                    name: employees.Employee,
                    value: employees["Employee ID"]
                }));
                const rolesForUpdate = await db.viewAllRoles();
                const roleUpdateChoices = rolesForUpdate.map(roles => {
                    return {
                        name: roles['Title'],
                        value: roles['Role ID']
                    }
                })
                const { employeeID, newRoleID } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeID',
                        message: `Which employee's role do you want to change?`,
                        choices: employeeChoice
                    },
                    {
                        type: 'list',
                        name: 'newRoleID',
                        message: `Which role would you like to assign to the selected employee?`,
                        choices: roleUpdateChoices
                    }
                ])
                await db.updateRole(employeeID, newRoleID);
                console.log(`Updated employee's role successfully`);
                break;
            // User selects Exit
            case 'Exit':
                await db.connect.end();
                return;
        }

        await userPrompt();


    } catch (error) {
        console.error('Error:', error.message);
        await db.connect.end();
    };
};

userPrompt();







