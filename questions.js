// Array of questions for user:
const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'View employees by manager', 'View employees by department', 'View total utilized budget of a department', 'Update an employee role', 'Add a department', 'Add a role', 'Add an employee'],
    }

    // {
    //     type: 'input',
    //     name: 'addRole',
    //     message: 'What is the name of the role?',
    //     when: (answers) => {
    //         if (answers.action === 'Add a role') {
    //             return true;
    //         }
    //     }
    // },
    // {
    //     type: 'input',
    //     name: 'addSalary',
    //     message: 'What is the salary of the role?',
    //     when: (answers) => {
    //         if (answers.action === 'Add a role') {
    //             return true;
    //         }
    //     }
    // },
    // {
    //     type: 'input',
    //     name: 'addRoleDept',
    //     message: 'Which department does the role belong to?',
    //     when: (answers) => {
    //         if (answers.action === 'Add a role') {
    //             return true;
    //         }
    //     }
    // },
    // {
    //     type: 'input',
    //     name: 'addFirstName',
    //     message: "What is the employee's first name?",
    //     when: (answers) => {
    //         if (answers.action === 'Add an employee') {
    //             return true;
    //         }
    //     }
    // },
    // {
    //     type: 'input',
    //     name: 'addLastName',
    //     message: "What is the employee's last name?",
    //     when: (answers) => {
    //         if (answers.action === 'Add an employee') {
    //             return true;
    //         }
    //     }
    // },
    // {
    //     type: 'input',
    //     name: 'addEmpRole',
    //     message: "What is the employee's role?",
    //     when: (answers) => {
    //         if (answers.action === 'Add an employee') {
    //             return true;
    //         }
    //     }
    // },
    // {
    //     type: 'input',
    //     name: 'addManager',
    //     message: "Who is the employee's manager?",
    //     when: (answers) => {
    //         if (answers.action === 'Add an employee') {
    //             return true;
    //         }
    //     }
    // },
];

module.exports = questions;