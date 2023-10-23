// Require necessary dependencies and packages - using promisify version of MySQL
const mysql = require('mysql2/promise');
// Define constructor class for database queries
class DatabaseQueries {
    constructor(config) {
        this.config = config;
    };

    async createConnection() {
        return await mysql.createConnection(this.config);
    };
    // db query for viewing all departments
    async viewAllDepartments(connect) {
        try {
            const [results] = await connect.query(`SELECT departments.id AS "Dept ID", dept_name AS "Department Name" FROM departments;`);
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve departments');
        };
    };
    // db query for viewing all roles
    async viewAllRoles(connect) {
        try {
            const [results] = await connect.query(`SELECT roles.id AS "Role ID", roles.title AS "Title", departments.dept_name AS "Dept Name", roles.salary AS Salary FROM roles JOIN departments ON departments.id = roles.department_id;`);
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve roles');
        };
    };
    // db query for viewing all employees
    async viewAllEmployees(connect) {
        try {
            const [results] = await connect.query(`SELECT employees.id AS "Employee ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Title", departments.dept_name AS "Dept Name", roles.salary AS "Salary", employees.manager_id AS "Manager" FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id;`);
            // TODO: Update to show manager name
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve employees');
        };
    };
    // db query for adding a department
    async addDepartment(connect, dept_name) {
        try {
            const [results] = await connect.query(`INSERT INTO departments (dept_name) VALUES (?)`, [dept_name]);
        } catch (error) {
            throw new Error('Failed to add department')
        }
    }
    // db query for adding a role
    async addRole(connect, title, salary, department_id) {
        try {
            const [results] = await connect.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department_id]);
        } catch (error) {
            throw new Error('Failed to add role')
        }
    }
    // db query for getting department names and IDs in support of adding a role
    async getDepartmentsAndIDs(connect) {
        try {
            const [results] = await connect.query(`SELECT id, dept_name FROM departments`)
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve departments and ids');
        }
    }
    // db query for adding an employee
    // TODO update with manager ID
    async addEmployee(connect, first_name, last_name, role_id) {
        try {
            const [results] = await connect.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)`, [first_name, last_name, role_id]);
        } catch (error) {
            throw new Error('Failed to add employee')
        }
    }

    // db query for getting roles id and titles in support of adding an employee
    async getRoleTitlesAndIDs(connect) {
        try {
            const [results] = await connect.query(`SELECT ID, title FROM roles`)
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve role titles and ids')
        }
    }
    // db query for getting managers from employees table
};


module.exports = DatabaseQueries;