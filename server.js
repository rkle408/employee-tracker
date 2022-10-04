// get the mysql2 client
const mysql = require('mysql2');
// Inquirer:
var inquirer = require('inquirer');
// call console.table once somewhere in the beginning of the app
const cTable = require('console.table');
const questions = require('./questions');

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
  //MySQL password:
  password: 'kakashi!',
  database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Ask questions here:
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log(answers);
    });
    // .catch((error) => {
    //     if (error.isTtyError) {
    //       // Prompt couldn't be rendered in the current environment
    //     } else {
    //       // Something else went wrong
    //     }
    // })
};

// // simple query
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45', //Just an example from website
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

// // with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );

// // Console.table:
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

// Call inquirer function:
init();