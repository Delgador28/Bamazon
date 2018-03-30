var mysql = require("mysql");
// get mysql
var mysql = require("mysql");
//get inquirer
var inquirer = require("inquirer")
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// ==================================================================================

connection.connect(function (err) {



  if (err) throw (err);
  console.log("-------------------\nWelcome to the Supervisor Screen\n-------------------")
  supervisorView();
});

// ==================================================================================

var makeTable = function () {
  connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;
    console.table(res);
    supervisorView();
  });
}

// ==================================================================================




// ==================================================================================

var supervisorView = function () {
  inquirer.prompt(
    {
      name: "response",
      type: "list",
      message: "What would you like to do boss?",
      choices: ["View Product Sales By Department", "Create New Department"]
    })


    .then(function (answer) {
      if (answer.response === "Create New Department") {
        createDepartment();
      } else if (answer.response === "View Product Sales By Department") {
        viewMySales();
      }
    });
}

// ==================================================================================

var createDepartment = function () {
  inquirer.prompt(
    [{
      name: "response",
      type: "input",
      message: "What would you like to call your new department?"
    },
    {
      name: "quantity",
      type: "input",
      message: "What is the overhead cost of this department as of now?"
    }]
  ).then(function (answer) {
    connection.query("INSERT INTO departments SET ?",
      {
        department_name: answer.response,
        over_head_costs: answer.quantity

      },
      function (err) {
        if (err) throw err;
        console.log("DEPARTMENT ADDED")
        makeTable();
      })
  })
}

// ==================================================================================

var viewMySales = function(){
  connection.query(
    "SELECT STUFF.department_id, STUFF.department_name, STUFF.over_head_costs, SUM(STUFF.product_sales) as product_sales, (SUM(STUFF.product_sales) - STUFF.over_head_costs) as total_profit FROM (SELECT departments.department_id, departments.department_name, departments.over_head_costs, IFNULL(products.product_sales, 0) as product_sales FROM products RIGHT JOIN departments ON products.department_name = departments.department_name) as STUFF GROUP BY department_id",
    function(err, res) {
      makeTable();
      supervisorView();
    }
  )
}