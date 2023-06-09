// Importing variables from npm packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Connecting to database 
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'work_db'
    },
    console.log("Connected to db")
    );
    
// Variables for functions
let check = false;
const departments = [];
const roles = [];
const employees = [];

// Function to populate arrays with seed values
const populateArray = () => {
    db.query('SELECT name FROM department', (err, data) => {
        data.forEach(dep => { departments.push(dep.name) })
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

// Main Menu Prompt
const initialPrompt = async () => {
    try {
        const choice = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'What would you like to do?',
                    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee role", "Update employee managers","Quit"],
                    name: 'choice'
                }
            ]);
        return choice;     
    } catch (error) {
        console.log(error);
    }
};

// Prompt to view roles from given or all departments
const viewAllRolesPrompt = async () => {
    try {
        const choice = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'Choose which department',
                    choices: [...departments, 'All'],
                    name: 'choice'
                }
            ])
        return choice;
    } catch (error) {
        console.log(error);
    }
}

// Prompt to view employees from given or all departments
const viewAllEmployeesPrompt = async () => {
    try {
        const choice = await inquirer.prompt([
            {
                type: 'list',
                message: 'Choose which department',
                choices: [...departments, 'All'],
                name: 'choice'
            }
        ])
        return choice;
    } catch (error) {
        console.log(error);
    }
}

// Prompt used to add department into database
const addDepartmentPrompt = async () => {
    try {
        const choice = await inquirer.prompt([
            {
                type: 'input',
                message: 'What department would you like to add?',
                name: 'choice'
            }
        ])
        return choice;
    } catch (error) {
        console.log(error);
    }
}

// Prompt to add a role within a department
const addRolePrompt = async () => {
    try {
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
    } catch (error) {
        console.log(error);
    }
}

// Prompt to add an employee
const addEmployeePrompt = async () => {
    try {
        const choice = await inquirer.prompt([
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
    } catch (error) {
        console.log(error);
    }
}

// Prompt to give an employee a role
const updateEmployeeRolePrompt = async () => {
    try {
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
    } catch (error) {
        console.log(error);   
    }
}

// Function taking mySQL database and viewing department(s)
const viewAllDepartments = () => {
    db.query('SELECT * FROM department;', (err, data) => {
        console.table('\nAll Departments', data);
    })
}

// Function to view role of given department(s)
const viewAllRoles = (x) => {
    let id;
    if (x.choice == "All") {
        db.query('SELECT role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id;', (err ,data) => {
            console.table('\nAll Roles',data);
        })
    }
     else {
        db.query('SELECT id FROM department WHERE name = ?;', [x.choice], (err, data) => {
            id = data[0].id;
            db.query('SELECT role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id WHERE department.id = ?;', [id], (err, data) => {
                console.table(`\nRoles from ${x.choice}`, data);
            });
        });
    }
}

// Function to view employees of department(s)
const viewAllEmployees = (x) => {
    let id;
    console.log(x);
    if (x.choice == "All") {
        db.query('SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;', (err ,data) => {
            console.table(`\nAll Employees`, data);
        })
    } else {
        db.query('SELECT id FROM department WHERE name = ?;', [x.choice], (err, data) => {
            id = data[0].id;
            db.query('SELECT employee.first_name, employee.last_name, role.title, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ?;', [id], (err, data) => {
                console.table(`\nEmployees from ${x.choice}`, data);
            })
        })
    }
}

// Function to add department
const addDepartment = (x) => {
    db.query('INSERT INTO department(name) VALUES(?);', [x.choice], (err, data) => {
    });
    db.query('SELECT * FROM department;', (err, data) => {
        console.table(`\nAll Departments`, data);
    });
    
    // Must update departments array
    populateArray();
}

// Function to add a role into a department
const addRole = (x) => {
    let depID;
    db.query('SELECT id FROM department WHERE name = ?;', [x.department], (err, data) => {
        depID = data[0].id;
        db.query('INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?);', [x.title, x.salary, depID], (err, data) => {
            console.log("Successfully created a new role!");
        });
        db.query('SELECT role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id WHERE department.id =?;', [depID], (err, data) => {
            console.table(`\nRoles from ${x.department}`, data);
        })
        populateArray();
    });
}

// Function to add an employee
const addEmployee = (x) => {
    db.query('INSERT INTO employee (first_name, last_name) VALUES (?, ?);', [x.firstName, x.lastName], (err, data) => {
        console.log("Successfully added an employee!");
        populateArray();
    });
}

// Function to update employee role
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
        populateArray();
    })
}

// Prompt to update employees to have a manager
const updateEmployeeManagersPrompt = async () => {
    try {
       const choice = await inquirer.prompt([
        {
            type: 'list',
            message: 'Select an employee you wish you update',
            choices: [...employees],
            name: 'employee'
        }
        ]);
        return choice; 
    } catch (error) {
        console.log(error);
    }   
}

// Function to give employees a manager
const updateEmployeeManagers = (x) => {
    let depID;
    let empID;
    let manID;
    let nameArray = x.employee.split(" ");
    let firstName = nameArray[0];
    let lastName = nameArray[1];
    db.query('SELECT employee.id ,employee.first_name, employee.last_name, employee.manager_id, role.department_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE employee.first_name = ? AND employee.last_name = ?;', [firstName, lastName], (err, data) => {
        depID = data[0].department_id;
        empID = data[0].id;
        db.query('SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ?;', [depID], (err, data) => {
            if (data.length > 1) {
                for (let i = 0; i < data.length; i++) {
                    if (empID !== data[i].manager_id) {
                        if (data[i].manager_id !== null) {
                            manID = data[i].manager_id;
                            break;
                        } else if (data[i].id !== empID) {
                            manID = data[i].id;
                            break;
                        }
                    }
                }
                db.query('UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?;', [manID, firstName, lastName], (err, data) => {
                    return console.log("Successfully updated employee!");
                })
            } else {
                return console.log("Must have more than one employee to have a manager.");
            }
            
        })
    })
    
}

// Switch case to handle answer from main menu
const SwitchCase = async (c) => {
    try {
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

            case 'UPDATE EMPLOYEE MANAGERS':
                const g = await updateEmployeeManagersPrompt();
                updateEmployeeManagers(g);
                break;
    
            case 'QUIT':
                check = true;
                return check;
        }
    } catch (error) {
        console.log(error);
    }
};

// Main function to handle async functions
// Recursive function
const runApp = async () => {
    try {
        populateArray();
        const choice = await initialPrompt();
        const switchCheck = await SwitchCase(choice);
        if (switchCheck) {
            process.exit(0);
        } else {
            runApp();
        }
    } catch (err) {
        console.log(err);
    }
};

runApp();