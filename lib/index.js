class Work {

    mysql = require('mysql2');
    
    db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'work_db'
        },
        console.log("Connected to db")
    );
    
    departments = [];
    roles = [];
    employees = [];
    
    // Database functions
    
    viewAllDepartments = () => {
        db.query('SELECT * FROM department;', (err, data) => {
            console.log(data);
        })
    }
    
    viewAllRoles = (x) => {
        let dep = x.choice;
        if (x.choice == "All") {
            dep = '*';
        }
        db.query('SELECT ? FROM role', [dep], (err ,data) => {
            console.log(data);
        })
    }
    
    viewAllEmployees = (x) => {
        let dep = x.choice;
        if (x.choice == "All") {
            dep = '*';
        }
        db.query('SELECT ? FROM employee', [dep], (err ,data) => {
            console.log(data);
        })
    }
    
    addDepartment = () => {
    
    }
    
    addRole = () => {
    
    }
    
    addEmployee = () => {
    
    }
    
    updateEmployeeRole = () => {
    
    }

    SwitchCase = (c) => {
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
};


module.exports = Work;