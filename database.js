const mysql = require('mysql2/promise');

class Database {
    constructor(config) {
        this.config = config;
    }

    async createConnection() {
        return await mysql.createConnection(this.config);
    }

    async viewAllDepartments
}