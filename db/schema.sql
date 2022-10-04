-- Delete just in case one exists somewhere already:
DROP DATABASE IF EXISTS employee_db;
-- Create an employee database:
CREATE DATABASE employee_db;

-- We want to make sure we use this one we just made:
USE employee_db;

CREATE TABLE department (
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
);