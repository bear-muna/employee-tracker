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

const populateDepArray = () => {
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
    return choice;
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
    return choice;
}

const addDepartmentPrompt = async () => {
    const choice = await inquirer.prompt([
            {
                type: 'input',
                message: 'What department would you like to add?',
                name: 'choice'
            }
        ])
    return choice;
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
    return choice;
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
    return choice;
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
    return choice;
}

const viewAllDepartments = () => {
    db.query('SELECT * FROM department;', (err, data) => {
        console.log(data);
    })
}

// TODO: BUG trying to give 'id' a numeric value
const viewAllRoles = (x) => {
    let dep = x.choice;
    let id;
    if (x.choice == "All") {
        db.query('SELECT title, salary FROM role;', (err ,data) => {
            console.log(data);
        })
        return;
    }
    //  else {
    //     db.query('SELECT id FROM department WHERE name = ?;', [dep], (err, data) => {
    //         return id = parseInt(data[0].id);
    //     });
    //     db.query('SELECT role.title, role.salary FROM role JOIN department ON role.department_id = department.id WHERE department.id = ?;', [id], (err, data) => {
    //         console.log(data);
    //         console.log("Return");
    //     });
    // }
}

// TODO: Create to specify which department
const viewAllEmployees = (x) => {
    let dep = x.choice;
    let id;
    if (x.choice == "All") {
        db.query('SELECT employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;', (err ,data) => {
            console.log(data);
        })
        return;
    }
}

// TODO: Need to make tables look good
const addDepartment = (x) => {
    let dep = x.choice;
    console.log(x);
    db.query('INSERT INTO department(name) VALUES(?);', [dep], (err, data) => {
        console.log(data);
    });
    db.query('SELECT * FROM department;', (err, data) => {
        console.log(data);
    })
}

const addRole = (x) => {

}

const addEmployee = (x) => {

}

const updateEmployeeRole = (x) => {

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
    populateDepArray();
    const choice = await initialPrompt();
    const switchCheck = await SwitchCase(choice);
};

runApp();