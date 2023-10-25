// Require necessary dependencies and packages - using promisify version of MySQL
const mysql = require('mysql2/promise');
// Define constructor class for database queries
class DatabaseQueries {
    constructor(config) {
        this.config = config;
        this.connect;
    };

    async createConnection() {
        this.connect = await mysql.createConnection(this.config);
    };
    // db query for viewing all departments
    async viewAllDepartments() {
        try {
            const [results] = await this.connect.query(`SELECT departments.id AS "Dept ID", dept_name AS "Department Name" FROM departments;`);
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve departments');
        };
    };
    // db query for viewing all roles
    async viewAllRoles() {
        try {
            const [results] = await this.connect.query(`SELECT roles.id AS "Role ID", roles.title AS "Title", departments.dept_name AS "Dept Name", roles.salary AS Salary FROM roles JOIN departments ON departments.id = roles.department_id;`);
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve roles');
        };
    };
    // db query for viewing all employees
    async viewAllEmployees() {
        try {
            const [results] = await this.connect.query(`SELECT employees.id AS "Employee ID", CONCAT(employees.first_name, " ", employees.last_name) AS "Employee", roles.title AS "Title", departments.dept_name AS "Dept Name",roles.salary AS "Salary", CONCAT(manager.first_name, " ", manager.last_name) AS "Manager" FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS manager ON employees.manager_id = manager.id;`);
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve employees');
        };
    };
    // db query for adding a department
    async addDepartment(dept) {
        try {
            const [results] = await this.connect.query(`INSERT INTO departments SET ?`, dept);
        } catch (error) {
            throw new Error('Failed to add department')
        }
    }
    // db query for adding a role
    async addRole(role) {
        try {
            const [results] = await this.connect.query(`INSERT INTO roles SET ?`, role);
        } catch (error) {
            throw new Error('Failed to add role')
        }
    }
    // db query for getting department names and IDs in support of adding a role
    async getDepartmentsAndIDs() {
        try {
            const [results] = await this.connect.query(`SELECT id, dept_name FROM departments`)
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve departments and ids');
        }
    }
    // db query for adding an employee
    async addEmployee(employee) {
        try {
            const [results] = await this.connect.query(`INSERT INTO employees SET ?`, employee);
            return true;
        } catch (error) {
            throw new Error('Failed to add employee')
        }
    }

    // db query for getting roles id and titles in support of adding an employee
    async getRoleTitlesAndIDs() {
        try {
            const [results] = await this.connect.query(`SELECT id, title FROM roles`)
            return results;
        } catch (error) {
            throw new Error('Failed to retrieve role titles and ids')
        }
    }
    // db query for updating an employee role
    async updateRole(employeeID, newRoleID) {
        try {
            const [results] = await this.connect.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [newRoleID, employeeID])
        } catch (error) {
            throw new Error('Failed to update employee role')
        }
    }


};


module.exports = DatabaseQueries;