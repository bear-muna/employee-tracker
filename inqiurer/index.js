// const mysql = require('mysql2');
const inquirer = require('inquirer');

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'password',
//         database: 'work_db'
//     },
//     console.log("Connected to db")
// );

// Starter Prompt
const RunApp = async () => {
    const choice = await inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee role", "Quit"],
                name: 'choice'
            }
        ]);
    console.log(choice);
};

const SwitchCase = (c) => {
    switch (c.choice.toUpperCase()) {

        case 'VIEW ALL DEPARTMENTS':
            viewAllDepartments();
            break;

        case 'VIEW ALL ROLES':
            viewAllRoles();
            break;

        case 'VIEW ALL EMPLOYEES':
            viewAllEmployees();
            break;

        case 'ADD A DEPARTMENT':
            addDepartment();
            break;

        case 'ADD A ROLE':
            addRole();
            break;

        case 'ADD AN EMPLOYEE':
            addEmployee();
            break;

        case 'UPDATE EMPLOYEE ROLE':
            updateEmployeeRole();
            break;

        case 'QUIT':
            break;
    }
};
// View all departments

// View all roles

// View all employees

// Add a department

// Add a role

// Add an employee

// Update employee role

RunApp();