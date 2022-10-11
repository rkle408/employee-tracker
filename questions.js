// Array of questions for user:
const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'View employees by manager', 'View employees by department', 'View total utilized budget of a department', 'Update an employee role', 'Add a department', 'Add a role', 'Add an employee'],
    }
];

module.exports = questions;