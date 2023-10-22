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
            const [results] = await connect.query('SELECT * FROM departments');
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve departments');
        };
    };

    async viewAllRoles(connect) {
        try {
            const [results] = await connect.query('SELECT * FROM roles');
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve roles');
        };
    };

    async viewAllEmployees(connect) {
        try {
            const [results] = await connect.query('SELECT * FROM employees');
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve employees');
        };
    };

    async addDepartment(connect, dept_name) {
        try {
            const [results] = await connect.query('INSERT INTO departments (dept_name) VALUES (?)', [dept_name]);
        } catch (error) {
            throw new Error('Failed to add department')
        }
    }

    async addRole(connect, title, salary) {
        try {
            const [results] = await connect.query('INSERT INTO roles (title, salary) VALUES (?, ?)', [title, salary]);
        } catch (error) {
            throw new Error('Failed to add role')
        }
    }
};


module.exports = DatabaseQueries;