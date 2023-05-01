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