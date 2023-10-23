const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

class DatabaseQueries {
    constructor(config) {
        this.config = config;
    };

    async createConnection() {
        return await mysql.createConnection(this.config);
    };

    async viewAllDepartments(connect) {
        try {
            const [results] = await connect.query(`SELECT departments.id AS "Dept ID", dept_name AS "Department Name" FROM departments;`);
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve departments');
        };
    };

    async viewAllRoles(connect) {
        try {
            const [results] = await connect.query(`SELECT roles.id AS "Role ID", roles.title AS "Title", departments.dept_name AS "Dept Name", roles.salary AS Salary FROM roles JOIN departments ON departments.id = roles.department_id;`);
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve roles');
        };
    };

    async viewAllEmployees(connect) {
        try {
            const [results] = await connect.query(`SELECT employees.id AS "Employee ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Title", departments.dept_name AS "Dept Name", roles.salary AS "Salary", employees.manager_id AS "Manager" FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id;`);
            // TODO: Update to show manager name
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve employees');
        };
    };

    async addDepartment(connect, dept_name) {
        try {
            const [results] = await connect.query(`INSERT INTO departments (dept_name) VALUES (?)`, [dept_name]);
        } catch (error) {
            throw new Error('Failed to add department')
        }
    }

    async addRole(connect, title, salary, department_id) {
        try {
            const [results] = await connect.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
        } catch (error) {
            throw new Error('Failed to add role')
        }
    }

    async getDepartmentsAndIDs(connect) {
        try {
            const [results] = await connect.query('SELECT id, dept_name FROM departments')
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve departments and ids');
        }
    };
};


module.exports = DatabaseQueries;