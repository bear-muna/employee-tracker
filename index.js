const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'work_db'
    },
    console.log("Connected to db")
);

// Need a function that will populate the array from the database and pass it along 
const departments = [];
const roles = [];
const employees = [];

const populateArray = () => {
    db.query('SELECT name FROM department', (err, data) => {
        data.forEach(dep => { departments.push(dep.name) })
        console.log(departments);
        return departments;
    });
}

const initialPrompt = async () => {
    const choice = await inquirer.prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee role", "Quit"],
                name: 'choice'
            }
        ]);
    return choice;
};
    
const viewAllDepartmentsPrompt = () => {

}

const viewAllRolesPrompt = async () => {
    const choice = await inquirer.prompt([
            {
                type: 'list',
                message: 'Choose which department',
                choices: [...departments, 'All'],
                name: 'choice'
            }
        ])
}

const viewAllEmployeesPrompt = async () => {
    const choice = await inquirer.prompt([
            {
                type: 'list',
                message: 'Choose which department',
                choices: [...departments, 'All'],
                name: 'choice'
            }
        ])
}

const addDepartmentPrompt = async () => {
    const choice = await inquirer.prompt([
            {
                type: 'input',
                message: 'What department would you like to add?',
                name: 'choice'
            }
        ])
}

const addRolePrompt = async () => {
    const choice = await inquirer.prompt([
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

const addEmployeePrompt = async () => {
    const choice = await inquirer.prompt([
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

const updateEmployeeRolePrompt = async () => {
    const choice = await inquirer.prompt([
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

const viewAllDepartments = () => {
    db.query('SELECT * FROM department;', (err, data) => {
        console.log(data);
    })
}

const viewAllRoles = (x) => {
    let dep = x.choice;
    if (x.choice == "All") {
        dep = '*';
    }
    db.query('SELECT ? FROM role', [dep], (err ,data) => {
        console.log(data);
    })
}

const viewAllEmployees = (x) => {
    let dep = x.choice;
    if (x.choice == "All") {
        dep = '*';
    }
    db.query('SELECT ? FROM employee', [dep], (err ,data) => {
        console.log(data);
    })
}

const addDepartment = () => {

}

const addRole = () => {

}

const addEmployee = () => {

}

const updateEmployeeRole = () => {

}

const SwitchCase = async (c) => {
    switch (c.choice.toUpperCase()) {

        case 'VIEW ALL DEPARTMENTS':
            viewAllDepartments();
            break;

        case 'VIEW ALL ROLES':
            const a = await viewAllRolesPrompt();
            viewAllRoles(a);
            break;

        case 'VIEW ALL EMPLOYEES':
            const b = await viewAllEmployeesPrompt();
            viewAllEmployees(b);
            break;

        case 'ADD A DEPARTMENT':
            const c = await addDepartmentPrompt();
            addDepartment(c);
            break;

        case 'ADD A ROLE':
            const d = await addRolePrompt();
            addRole(d);
            break;

        case 'ADD AN EMPLOYEE':
            const e = await addEmployeePrompt();
            addEmployee(e);
            break;

        case 'UPDATE EMPLOYEE ROLE':
            const f = await updateEmployeeRolePrompt();
            updateEmployeeRole(f);
            break;

        case 'QUIT':
            break;
    }
};

const runApp = async () => {
    populateArray();
    const choice = await initialPrompt();
    const switchCheck = await SwitchCase(choice);
    runApp();    
};

runApp();