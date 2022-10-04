// Array of questions for user:
const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    },
    {
        type: 'input',
        name: 'addDept',
        message: 'What is the name of the department?',
        when: (answers) => {
            if (answers.action === 'Add a department') {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'addRole',
        message: 'What is the name of the role?',
        when: (answers) => {
            if (answers.action === 'Add a role') {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'addSalary',
        message: 'What is the salary of the role?',
        when: (answers) => {
            if (answers.action === 'Add a role') {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'addRoleDept',
        message: 'Which department does the role belong to?',
        when: (answers) => {
            if (answers.action === 'Add a role') {
                return true;
            }
        }
    },
];

module.exports = questions;