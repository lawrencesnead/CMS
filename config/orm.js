var connection = require("../config/connection.js");

var orm = {

  selectWhere: function (focus, tableInput, colToSearch, valOfCol) {
    var queryString = "SELECT ?? FROM ?? WHERE ?? = ??";

    connection.query(queryString, [focus, tableInput, colToSearch, valOfCol], function (err, result) {
      if (err) throw err;
      return result;
    });
  },

  selectAllRoles: function (selection) {
    var queryString = "SELECT * FROM role";

    connection.query(queryString, function (err, result) {
      if (err) throw err;
      selection(result);
    });
  },

  selectAllDepartments: function (selection) {
    var queryString = "SELECT * FROM department";

    connection.query(queryString, function (err, result) {
      if (err) throw err;
      selection(result);
    });
  },

  selectAllEmployees: function (selection) {
    var queryString = "SELECT * FROM employee";

    connection.query(queryString, function (err, result) {
      if (err) throw err;
      selection(result);
    });
  },
  
  addEmployee: function (employee) {
    var queryString = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (??, ??, ??, ??)";

    connection.query(queryString, [employee.first_name, employee.last_name, employee.role_id, employee.manager_id], function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " employee has been added here!");
    });
  },

  deleteEmployee: function (person) {
    var queryString = "DELETE FROM employee WHERE id = ??";

    connection.query(queryString, [person.id], function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " has been removed!")
    });
  },

  deleteRole: function (role) {
    var queryString = "DELETE FROM role WHERE id = ??";

    connection.query(queryString, [role.id], function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " has been removed!")
    });
  },

  deleteDepartment: function (data) {
    var queryString = "DELETE FROM department WHERE id = ??";

    connection.query(queryString, [data.id], function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " has been removed!")
    });
  },
  
  updateEmployeeRole: function (data) {
    var queryString = `UPDATE employee SET role_id = ?? WHERE id = ??`;

    connection.query(queryString, [data.role.id, data.employee.id], function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " has been updated!");
    });
  },

  updateEmployeeManager: function (data) {
    var queryString = `UPDATE employee SET manager_id = ?? WHERE id = ??`;

    connection.query(queryString, [data.manager.id, data.employee.id], function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " has been updated!");
    });
  },
  
  addEmployeeRole: function (data) {
    var queryString = `INSERT INTO role (title, salary, department) VALUES (??, ??, ??)`;

    connection.query(queryString, [data.role, data.salary, data.department.id], function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " role has been added!");
    });
  },

  addDepartment: function (department) {
    var queryString = `INSERT INTO department (name) VALUES (??)`;

    connection.query(queryString, [department], function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " deparment has been added!");
    });
  },
  
 
};

module.exports = orm;