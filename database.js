const mysql = require('mysql2/promise');

class Database {
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
        }   catch (error) {
            throw new Error('Failed to retrieve departments');
        };
    };

    async viewAllRoles(connect) {
        try {
            const [results] = await connect.query('SELECT * FROM roles');
            return results;
        }   catch (error) {
            throw new Error('Failed to retrieve roles');
        };
    };

    async viewAllEmployees(connect) {
        try {
            const [results] = await connect.query('SELECT * FROM employees');
            return results;
        }   catch (error) {
            throw new Error('Failed to retrieve employees');
        };
    };
};


module.exports = Database;