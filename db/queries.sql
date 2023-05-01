USE work_db;

SELECT * FROM department;

SELECT role.title, role.salary FROM role JOIN department ON role.department_id = department.id WHERE department.id = 1;

SELECT * FROM employee;