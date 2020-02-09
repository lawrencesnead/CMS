const inquirer = require("inquirer");
const cTable = require("console.table");
const orm = require("./config/orm")
var connection = require("./config/connection");



const start = function () {
    inquirer
        .prompt([{
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees by Deparment", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role"]
        }
        ])
        .then(function (answers) {
            
            switch (answers.action) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View All Employees by Department":
                    break;
                case "View All Employees by Manager":
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Remove Role":
                    removeRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Remove Department":
                    removeDepartment();
                    break;
                default:
                    console.log("Invalid selection!")
            }
        });
};

const selectAllEmployees = function () {
    return orm.selectAllEmployees(function (result) {
        let data = result;
        return data;
    });
};

const selectAllRoles = function () {
    return orm.selectAllRoles(function (result) {
        return result;
    });
};

const selectAllDepartments = function () {
    return orm.selectAllDepartments(function (result) {
        let data = result;
        return data;
    });
};

const addEmployee = function () {
    let choices = selectAllEmployees();
    let roles = selectAllRoles();
    inquirer
        .prompt([{
            type: "input",
            name: "firstname",
            message: "What is the first name?"
        },
        {
            type: "input",
            name: "lastname",
            message: "What is the last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: [roles]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: [choices]
        },
        ])
        .then(function (answers) {
            let employee = {
                "first_name": answers.firstname, "last_name": answers.lastnamew,
                "manager_id": answers.manager.id, "role_id": answers.role.id 
            };

            orm.addEmployee(employee);
        });
};

const addDepartment = function () {
    inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is the new department name?"
        },  
    ])
        .then(function (answers) {
            orm.addDepartment(answers.name);
        });
};

const removeDepartment = function () {
    let choices = selectAllDepartments();
    inquirer
        .prompt([{
            type: "list",
            name: "department",
            message: "Which department would you like to remove?",
            choices: [choices]
        },
    ])
        .then(function (answers) {
            orm.deleteDepartment(answers.department);
        })
};

const removeEmployee = function () {
    let choices = selectAllEmployees();
    inquirer
        .prompt([{
            type: "list",
            name: "employee",
            message: "Which employee would you like to remove?",
            choices: [choices]
        },
    ])
        .then(function (answers) {
            orm.deleteEmployee(answers.employee);
        })
};

const removeRole = function () {
    let choices = selectAllRoles();
    inquirer
        .prompt([{
            type: "list",
            name: "role",
            message: "Which role would you like to remove?",
            choices: [choices]
        },
        ])
        .then(function (answers) {
            orm.deleteRole(answers.role);
        })
};

const updateEmployeeRole = function () {
    let choices = selectAllEmployees();
    let roles = selectAllRoles();
    inquirer
        .prompt([{
            type: "list",
            name: "employee",
            message: "Which employee would you like to update the role for?",
            choices: [choices]
        },
        {
            type: "list",
            name: "role",
            message: "Which role should it be updated to?",
            choices: [roles]
        },
        ])
        .then(function (answers) {
            orm.updateEmployeeRole(answers);
        })
};

const updateEmployeeManager = function () {
    let choices = selectAllEmployees();
    inquirer
        .prompt([{
            type: "list",
            name: "employee",
            message: "Which employee would you like to update the manager for?",
            choices: [choices]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is their new manager?",
            choices: [choices]
        },
        ])
        .then(function (answers) {
            orm.updateEmployeeManager(answers);
        })
};

const addRole = function () {
    let departments = selectAllDepartments();
    inquirer
        .prompt([{
            type: "input",
            name: "role",
            message: "What role would you like to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary?"
        },
        {
            type: "list",
            name: "department",
            message: "Which department does this role belong to?",
            choices: departments
        },
        ])
        .then(function (answers) {
            orm.addRole(answers);
        })
};

const viewAllEmployees = function () {
    var queryString = "SELECT * FROM employee";

    connection.query(queryString, function (err, result) {
      if (err) throw err;
        let employees = result;
        console.table(employees);
    });
    
    //console.table(["Employees", employees]);
};

const viewAllRoles = function () {
    var queryString = "SELECT * FROM employee";

    connection.query(queryString, function (err, result) {
      if (err) throw err;
        let roles = result;
        console.table(roles);
    });
};

const viewAllDepartments = function () {
    var queryString = "SELECT * FROM department";

    connection.query(queryString, function (err, result) {
      if (err) throw err;
        let departments = result;
        console.table(["Departments", departments]);
    });

    
};

start();
