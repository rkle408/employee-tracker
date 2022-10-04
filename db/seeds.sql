USE employee_db;

INSERT INTO department (id, name)
VALUES
    (001, "Sales"),
    (002, "Engineering"),
    (003, "Finance"),
    (004, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES
    (451, "Sales Lead", 100000, 001),
    (452, "Salesperson", 80000, 001),
    (453, "Lead Engineer", 150000, 002),
    (454, "Software Engineer", 120000, 002),
    (455, "Account Manager", 160000, 003),
    (456, "Accountant", 125000, 003),
    (457, "Legal Team Lead", 250000, 004),
    (458, "Lawyer", 190000, 004);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (804, "Tyler", "Dimich", 451, NULL),
    (805, "Yamilet", "Barcenas", 452, 804),
    (801, "David", "Rickerson", 453, NULL),
    (806, "Maritza", "Diaz", 454, 801),
    (802, "Brianna", "Jordan", 455, NULL),
    (807, "Colin", "Stanhope", 456, 802),
    (803, "Jeffrey", "Wang", 457, NULL),
    (808, "Bryan", "Habet", 458, 803);