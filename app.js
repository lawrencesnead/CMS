var inquirer = require("inquirer");
var cTable = require("console.table");
var orm = require("./config/orm")



const start = async function () {
    await inquirer
        .prompt([{
            type: "rawlist",
            name: "action",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees by Deparment", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role"]
        },])
        .then(function () {
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

const selectAllEmployees = async function() {
    return await orm.selectAllEmployees(function (result) {
        let data = result;
        console.log(data);
        return data;
    });
}

const selectAllRoles = async function () {
    return await orm.selectAllRoles(function (result) {
        let data = result;
        console.log(data);
        return data;
    });
}

const addEmployee = async function () {
    let choices = await selectAllEmployees();
    let roles = await selectAllRoles();
    await inquirer
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
            type: "rawlist",
            name: "role",
            message: "What is the employee's role?",
            choices: roles
        },
        {
            type: "rawlist",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: choices 
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

const addDepartment = async function () {
    await inquirer
        .prompt({
            type: "input",
            name: "name",
            message: "What is the new department name?"
        },
        
        )
        .then(function (answers) {
            orm.addDepartment(answers.name);
        });
};

const removeDepartment = async function () {
    let choices = await selectAllDepartments();
    await inquirer
        .prompt([{
            type: "list",
            name: "department",
            message: "Which department would you like to remove?",
            choices: choices
        },
        ])
    .then(orm.deleteDepartment(answers.department))
};

const removeEmployee = async function () {
    let choices = await selectAllEmployees();
    await inquirer
        .prompt([{
            type: "list",
            name: "employee",
            message: "Which employee would you like to remove?",
            choices: choices
        },
        ])
    .then(orm.deleteEmployee(answers.employee))
};

const removeRole = async function () {
    let choices = await selectAllRoles();
    await inquirer
        .prompt([{
            type: "list",
            name: "role",
            message: "Which role would you like to remove?",
            choices: choices
        },
        ])
    .then(orm.deleteRole(answers.role))
};

const updateEmployeeRole = async function () {
    let choices = selectAllEmployees();
    let roles = selectAllRoles();
    await inquirer
        .prompt([{
            type: "rawlist",
            name: "employee",
            message: "Which employee would you like to update the role for?",
            choices: choices
        },
        {
            type: "rawlist",
            name: "role",
            message: "Which role should it be updated to?",
            choices: roles
        },
        ])
    .then(orm.updateEmployeeRole(answers))
};

const updateEmployeeManager = async function () {
    let choices = selectAllEmployees();
    await inquirer
        .prompt([{
            type: "rawlist",
            name: "employee",
            message: "Which employee would you like to update the manager for?",
            choices: choices
        },
        {
            type: "rawlist",
            name: "manager",
            message: "Who is their new manager?",
            choices: choices
        },
        ])
    .then(orm.updateEmployeeManager(answers))
};

const addRole = async function () {
    let departments = await orm.selectAllDepartments();
    await inquirer
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
            type: "rawlist",
            name: "department",
            message: "Which department does this role belong to?",
            choices: departments
        },
        ])
    .then(orm.addRole(answers))
};

const viewAllEmployees = function () {
    
    console.table(["Employees", orm.selectAllEmployees(function (result) {
        let data = result;
        console.log(data);
        return data;
    }
    )]);
};

const viewAllRoles = function () {
    
    console.table(["Roles", orm.selectAllRoles(function (result) {
        let data = result;
        console.log(data);
        return data;
    }
    )]);
};

const viewAllDepartments = function () {
    
    console.table(["Departments", orm.selectAllDepartments(function (result) {
        let data = result;
        console.log(data);
        return data;
    }
    )]);
};

start();

removeEmployee();