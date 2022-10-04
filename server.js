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
  console.log(`Connected to the employee_db database.`)
);

// Ask questions here:
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            // Need to do switch case here
            connection.query()
            console.log(answers);
    });
};

// Need to make functions to execute showing data and saving data
// function viewDepartments()
// function viewRoles()
// function viewEmployees()

// Will likely move adding actions here and remove from questions.js

// Call inquirer function:
init();