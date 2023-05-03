USE work_db;

SELECT employee.first_name, employee.last_name, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.name = 'Engineering';

select * from employee join role on employee.role_id = role.id join department on role.department_id = department.id where department.id ;

SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = 1;

SELECT employee.id ,employee.first_name, employee.last_name, employee.manager_id, role.department_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE employee.first_name = "EJ" AND employee.last_name = "Muna";