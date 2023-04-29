USE work_db;

INSERT INTO department (name)
VALUES
("Engineering"),
("Finance"),
("Sales"),
("Legal"),
("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES
("Junior Engineer", 80000, 1),
("Senior Engineer", 100000, 1),
("Lead Engineer", 125000, 1),
("Junior Financial Advisor", 100000, 2),
("Lead Financial Advisor", 125000, 2),
("Junior Sales Associate", 70000, 3),
("Lead Sales Associate", 100000, 3),
("Junior Legal Associate", 125000, 4),
("Lead Legal Associate", 160000, 4),
("Junior Marketing Advisor", 140000, 5),
("Lead Marketing Advisor", 170000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("John", "Smith", 2),
("EJ", "Muna", 3),
("Sally", "Sue", 4),
("Lauren", "Hill", 5),
("Jake", "Shmake", 10);

UPDATE employee SET manager_id = 2 WHERE id = 1;
UPDATE employee SET manager_id = 4 WHERE id = 3;
