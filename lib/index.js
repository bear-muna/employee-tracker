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

let departments = [];
let roles = [];
let employees = [];

// Database functions

const viewAllDepartments = () => {
    db.query('SELECT * FROM department;', (err, data) => {
        console.log(data);
    })
}

const viewAllRoles = () => {

}

const viewAllEmployees = () => {

}

const addDepartment = () => {

}

const addRole = () => {

}

const addEmployee = () => {

}

const updateEmployeeRole = () => {

}