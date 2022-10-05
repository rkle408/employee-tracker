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

                case 'Add a department':
                    addDept();
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