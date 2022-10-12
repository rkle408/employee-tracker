// get the mysql2 client
const mysql = require('mysql2');
// Inquirer:
var inquirer = require('inquirer');
// call console.table once somewhere in the beginning of the app
const cTable = require('console.table');
const questions = require('./questions');
const password = require('./config');

console.log(`\n
######## ##     ## ########  ##        #######  ##    ## ######## ######## 
##       ###   ### ##     ## ##       ##     ##  ##  ##  ##       ##       
##       #### #### ##     ## ##       ##     ##   ####   ##       ##       
######   ## ### ## ########  ##       ##     ##    ##    ######   ######   
##       ##     ## ##        ##       ##     ##    ##    ##       ##       
##       ##     ## ##        ##       ##     ##    ##    ##       ##       
######## ##     ## ##        ########  #######     ##    ######## ######## \n
##     ##    ###    ##    ##    ###     ######   ######## ########  
###   ###   ## ##   ###   ##   ## ##   ##    ##  ##       ##     ## 
#### ####  ##   ##  ####  ##  ##   ##  ##        ##       ##     ## 
## ### ## ##     ## ## ## ## ##     ## ##   #### ######   ########  
##     ## ######### ##  #### ######### ##    ##  ##       ##   ##   
##     ## ##     ## ##   ### ##     ## ##    ##  ##       ##    ##  
##     ## ##     ## ##    ## ##     ##  ######   ######## ##     ## 
\n`);


// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  //MySQL username:
  user: 'root',
  //MySQL password (saved in another file in gitignore for privacy):
  password: password,
  database: 'employee_db'
  },

  console.log(`You are now connected to the employee database.\n`)
);

// Ask questions here:
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            // Need to do switch case here
            console.log(answers);
            switch (answers.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                
                case 'View all roles':
                    viewRoles();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'View employees by manager':
                    viewByManager();
                    break;
                
                case 'View employees by department':
                    viewByDepartment();
                    break;

                case 'View total utilized budget of a department':
                    deptBudget();
                    break;

                case 'Update an employee role':
                    updateEmployee();
                    break;

                case 'Add a department':
                    addDept();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                // default: 
                //     add(answers.action)
            }
    });
};

// Need to make functions to execute showing data and saving data
function viewDepartments() {
    let query = `SELECT id, department.name AS Department 
    FROM department`;
    connection.query(query, function(err, res) {
        console.log('\n');
        console.table(res);
        init();
    });
};

function viewRoles() {
    let query = `SELECT role.id, role.title, department.name AS department, role.salary 
    FROM role 
    JOIN department ON role.department_id = department.id`;
    connection.query(query, function(err, res) {
        console.log('\n');
        console.table(res);
        init();
    });
};

function viewEmployees() {
    let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    ORDER BY employee.id`;
    connection.query(query, function(err, res) {
        console.log('\n');
        console.table(res);
        init();
    });
};

function viewByManager() {
    let query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary
    FROM employee
    JOIN employee manager ON manager.id = employee.manager_id
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    ORDER BY manager`;
    connection.query(query, function(err, res) {
        console.log('\n');
        console.table(res);
        init();
    });
};

function viewByDepartment() {
    let query = `SELECT department.name AS department, employee.id, employee.first_name, employee.last_name, role.title,  role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN employee manager ON manager.id = employee.manager_id
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        ORDER BY department`;
        connection.query(query, function(err, res) {
            console.log('\n');
            console.table(res);
            init();
        });
};

function deptBudget() {
    let query = `SELECT department.name AS Department, SUM(role.salary) AS Budget
    FROM role 
    JOIN department ON role.department_id = department.id
    GROUP BY department.id`;
    connection.query(query, function(err, res) {
        console.log('\n');
        console.table(res);
        init();
    });
};

function addDept() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addDept',
                message: 'What is the name of the department?',
            }
        ])
        .then((answer) => {
            console.log(answer);
            let query = 'INSERT INTO department (name) VALUES (?);'
            connection.query(query, answer.addDept, function(err, res) {
                console.log("\n");
                console.log("Successfully added new department!");
            })
            viewDepartments();
            init();
        })
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addRole',
                message: 'What is the title of the role?',
            },
            {
                type: 'input',
                name: 'addSal',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'addDept',
                message: 'What is the dept number of the role?',
                choices: [001, 002, 003, 004, 005]
            },
        ])
        .then((answer) => {
            let query = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?);'
            connection.query(query, [answer.addRole, answer.addSal, answer.addDept], function(err, res) {
                // console.log(res);
                console.log("\n");
                console.log("Successfully added new role!");
            })
            viewRoles();
            init();
        })
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addFirstName',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'addLastName',
                message: "What is the employee's last name?",
            },
            {
                type: 'list',
                name: 'addEmpRole',
                message: "What is the employee's role?",
                choices: [451, 452, 453, 454, 455, 456, 457, 458],
            },
        ])
        .then((answer) => {
            //console.log(answer);
            let query = 'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?);'
            connection.query(query, [answer.addFirstName, answer.addLastName, answer.addEmpRole], function(err, res) {
                console.log("\n");
                console.log("Successfully updated employee role!");
            })
            viewEmployees();
            init();
        })
};

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'updateEmp',
                message: 'Which employee do you want to update?',
                choices: [801, 802, 803, 804, 805, 806, 807, 808]
            },
            {
                type: 'list',
                name: 'updateNewRole',
                message: 'What is the new role?',
                choices: [451, 452, 453, 454, 455, 456, 457, 458],
            },
        ])
        .then((answer) => {
            let query = 'UPDATE role SET title WHERE id = (?, ?);'
            connection.query(query, [answer.updateEmp, answer.updateNewRole], function(err, res) {
                console.log(res);
                console.log("\n");
                console.log("Successfully added new role!");
            })
            viewEmployees();
            init();
        })
}

// // CAN Use function that can do multiple jobs to execute to minimize code
// function add(type) {
//     let questions;
//     // Run the 3 adds
//     switch (type) {
//         case 'Add a department':
//             questions = departmentQuestion
//         case 'Add a role':
//             questions = roleQuestions
//         case 'Add an employee':
//             questions = employeeQuestions
//     }
//     inquirer.prompt(questions)
// }

// Will likely move adding actions here and remove from questions.js

// Call inquirer function:

init();