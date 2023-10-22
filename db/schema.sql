DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- Create departments table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

-- Create roles table with reference to department id as foreign key
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

-- Create employees table with reference to role id as foreign key
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL, -- Clearing role reference if role is deleted
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL   -- Clearing manager reference if manager is deleted
);