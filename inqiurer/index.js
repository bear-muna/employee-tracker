class p {
    
    inquirer = require('inquirer');
    
    // Need a function that will populate the array from the database and pass it along 
    departments = [];
    roles = [];
    employees = [];
    
    // Starter Prompt
    RunApp = async () => {
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
    
    viewAllDepartmentsPrompt = () => {
    
    }
    
    viewAllRolesPrompt = async () => {
        const choice = await inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Choose which department',
                    choices: [...departments, 'All'],
                    name: 'choice'
                }
            ])
    }
    
    viewAllEmployeesPrompt = async () => {
        const choice = await inquirer 
            .prompt([
                {
                    type: 'list',
                    message: 'Choose which department',
                    choices: [...departments, 'All'],
                    name: 'choice'
                }
            ])
    }
    
    addDepartmentPrompt = async () => {
        const choice = await inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What department would you like to add?',
                    name: 'choice'
                }
            ])
    }
    
    addRolePrompt = async () => {
        const choice = await inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'What department would you like to add a role to?',
                    choices: [...departments],
                    name: 'department'
                },
                {
                    type: 'input',
                    message: 'What is the title of the role?',
                    name: 'title'
                },
                {
                    type: 'input',
                    message: 'What is the salary of the role?',
                    name: 'salary'
                }
            ])
    }
    
    addEmployeePrompt = async () => {
        const choice = await inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'What department would you like to add an employee to?',
                    choices: [...departments],
                    name: 'department'
                },
                {
                    type: 'input',
                    message: "What is the employee's first name?",
                    name: 'firstName'
                },
                {
                    type: 'input',
                    message: "What is the employee's last name?",
                    name: 'lastName'
                },
                {
                    type: 'input',
                    message: "What is the employee's role?",
                    name: 'role'
                }
            ])
    }
    
    updateEmployeeRolePrompt = async () => {
        const choice = await inquirer
            .prompt([
                {
                    type: 'list',
                    message: "What department is the employee in?",
                    choices: [...departments],
                    name: 'department'
                },
                {
                    type: 'list',
                    message: "Choose the employee",
                    choices: [...employees],
                    name: 'employee'
                },
                {
                    type: 'list',
                    message: "Choose what role to update to",
                    choices: [...roles],
                    name: 'updateRole'
                }
            ])
    }
}

module.exports = p;

// View all departments

// View all roles

// View all employees

// Add a department

// Add a role

// Add an employee

// Update employee role

RunApp();