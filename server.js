// get the mysql2 client
const mysql = require('mysql2');
// Inquirer:
var inquirer = require('inquirer');
// call console.table once somewhere in the beginning of the app
const cTable = require('console.table');

// Need a PORT
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  //MySQL username:
  user: 'root',
  //MySQL password:
  password: '',
  database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Ask questions here:
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

// simple query
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45', //Just an example from website
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// with placeholder
connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function(err, results) {
    console.log(results);
  }
);

// Console.table:
console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
  