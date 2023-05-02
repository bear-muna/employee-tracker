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
    db.query('SELECT employee.first_name, employee.last_name FROM employee;', (err, data) => {
        data.forEach(emp => { employees.push(`${emp.first_name} ${emp.last_name}`) });
        return employees;
    });
    db.query('SELECT title FROM role;', (err, data) => {
        data.forEach(role => { roles.push(role.title) });
        return roles;
    })
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
            }
        ])
    return choice;
}

const updateEmployeeRolePrompt = async () => {
    const choice = await inquirer.prompt([
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

const viewAllRoles = (x) => {
    let id;
    if (x.choice == "All") {
        db.query('SELECT role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id;', (err ,data) => {
            console.log(data);
        })
    }
     else {
        db.query('SELECT id FROM department WHERE name = ?;', [x.choice], (err, data) => {
            id = data[0].id;
            db.query('SELECT role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id WHERE department.id = ?;', [id], (err, data) => {
                console.log(data);
            });
        });
    }
}

const viewAllEmployees = (x) => {
    let id;
    console.log(x);
    if (x.choice == "All") {
        db.query('SELECT employee.first_name, employee.last_name, role.title, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;', (err ,data) => {
            console.log(data);
        })
    } else {
        db.query('SELECT id FROM department WHERE name = ?;', [x.choice], (err, data) => {
            id = data[0].id;
            db.query('SELECT employee.first_name, employee.last_name, role.title, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ?;', [id], (err, data) => {
                console.log(data);
            })
        })
    }
}

const addDepartment = (x) => {
    db.query('INSERT INTO department(name) VALUES(?);', [x.choice], (err, data) => {
        console.log(data);
    });
    db.query('SELECT * FROM department;', (err, data) => {
        console.log(data);
    });
}

const addRole = (x) => {
    let depID;
    db.query('SELECT id FROM department WHERE name = ?;', [x.department], (err, data) => {
        depID = data[0].id;
        db.query('INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?);', [x.title, x.salary, depID], (err, data) => {
            console.log("Successfully created a new role!");
        });
        db.query('SELECT role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id WHERE department.id =?;', [depID], (err, data) => {
            console.log(data);
        })
    });
}

const addEmployee = (x) => {
    console.log(x);
    let id;
    db.query('SELECT id FROM department WHERE name = ?;', [x.department], (err, data) => {
        id = data[0].id;
        db.query('INSERT INTO employee (first_name, last_name) VALUES (?, ?);', [x.firstName, x.lastName], (err, data) => {
            console.log("Successfully added an employee!");
        });
    })
}

const updateEmployeeRole = (x) => {
    let id;
    let nameArray = x.employee.split(" ");
    let firstName = nameArray[0];
    let lastName = nameArray[1];
    db.query('SELECT id FROM role where title = ?;', [x.updateRole], (err, data) => {
        id = data[0].id;
        db.query('UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?;', [id, firstName, lastName], (err, data) => {
            console.log("Successful updated employee's role!");
        })
    })
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
};

runApp();