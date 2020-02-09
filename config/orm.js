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
  deleteEmployee: function (person) {
    var queryString = "SELECT * FROM employee WHERE employee.id = ??";

    connection.query(queryString, [person.id], function (err, result) {
      if (err) throw err;
      console.log(employee.id + " has been removed!")
    });
  },
  addRole: function (role) {
    var queryString = `INSERT INTO role (title, salary, department) VALUES (??, ??, ??)`;

    connection.query(queryString, [role.title, role.salary, role.department], function (err, result) {
      if (err) throw err;
      console.log(role.titie + " has been added!");
    });
  },
  addEmployee: function (employee) {
    var queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (??, ??, ??, ??)`;

    connection.query(queryString, [employee.firstname, employee.lastname, employee.role, employee.manager.id], function (err, result) {
      if (err) throw err;
      console.log(employee.firstname + " has been added!");
    });
  },
  getID: function (employee) {
    let fullName = employee.split(" ");
    var queryString = `SELECT * FROM employee WHERE employee.first_name = ?? && employee.last_name = ??`
    connection.query(queryString, [fullName[0], fullName[1]], function (err, result) {
      if (err) throw err;
      console.log(employee.firstname + " has been added!");
    });
  }
};

module.exports = orm;