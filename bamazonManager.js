// get mysql
var mysql = require("mysql");
//get inquirer
var inquirer = require("inquirer");
//get the table
var Table = require("cli-table");
//colors
var colors = require("colors");
// Gain your connection by setting it to a variable(connection) and equaling it to mysql.createConnection({})
var connection = mysql.createConnection({
    // In here have the host and the port number you have given it
    host: "localhost",
    port: 3306,
    //Now we have the user whicvh will for now always be the root
    user: "root",
    // password and database name now// all are strings except the number for the port
    password: "",
    database: "bamazon"
    //End it here/
});

//---------------------------------------

// setting our connection ewith the .connect funtion from mysql and dont forgert the defaulot thign if it goes wrtong
connection.connect(function (err) {



    //here thqat one goes
    if (err) throw (err);
    //how do you start the page?
    console.log("-------------------\nWelcome to the Bamazon Manager Screen\n-------------------")
    //something goes here that should start after the intorn guy from above
    managerView();
});
//make said function
var managerView = function () {
    // heres where u find what u are doing first and this is determinded by findsing a place with certain questions.. myabW RESPONSE, LIST, MESSAGE, CHOICE[ ;)
    inquirer.prompt({
        // then efter this we are takijng the answers in
        name: "response",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products For Sale", "Add New Product", "View Low Inventory", "Add To Inventory"]
    })
        .then(function (answer) {
            if (answer.response === "View Products For Sale") {
                //so if the response is the same as the first choice"" 
                var query = connection.query("SELECT * FROM products", function (err, result) {
                    if (err) console.log(err);

                    // do the select query thing and get from whatevs ur grabbing

                    //err guy

                    //make the tab,e with things in it
                    var table = new Table({
                        head: ['ID', 'PRODUCT', 'PRICE', 'QUANTITY'],
                        colWidths: [5, 15, 8, 10]
                    });
                    //create a for loop that is going through our whatevs , it is pushing the things to the table
                    for (var i = 0; i < result.length; i++) {
                        // console lof it dont forget the thign to make it actaully display
                        table.push(
                            [result[i].item_id, result[i].product_name, result[i].price, result[i].stock_quantity]
                        )
                    }
                    console.log(table.toString());
                    managerView();
                }
                )
            }
            else if (answer.response === "View Low Inventory") {
                var query = connection.query("SELECT * FROM products WHERE stock_quantity < 10", function (err, result) {
                    if (err) throw (err);
                    if (result.length > 0) {
                        var table = new Table({
                            head: ['ID', 'PRODUCT', 'QUANTITY'],
                            colWidths: [5, 15, 10]
                        });
                        //create a for loop that is going through our whatevs , it is pushing the things to the table
                        for (var i = 0; i < result.length; i++) {
                            // console lof it dont forget the thign to make it actaully display
                            table.push(
                                [result[i].item_id, result[i].product_name, result[i].stock_quantity]
                            )
                        }
                        console.log(table.toString());
                    } else {
                        console.log("\nNo items with low inventory.\n")
                    }
                    managerView();
                })
            }
            else if (answer.response === "Add To Inventory") {
                inquirer.prompt([{
                    name: "restock",
                    type: "input",
                    message: "What would you like to add to based off ID Number?",
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many?",
                }
                ]).then(function (answer) {
                    var query = connection.query('SELECT * FROM products where item_id=' + answer.restock, function (err, result) {
                        if (err) console.log(err);
                        var currentStock = result[0].stock_quantity;
                        currentStock += parseInt(answer.quantity);
                        var query = connection.query('UPDATE products SET stock_quantity=' + currentStock + ' where item_id=' + answer.restock, function (err, result) {
                            console.log("\nYour inventory total is now " + currentStock);
                            managerView();
                        })

                    })
                })
            }

            else if (answer.response === "Add New Product") {
                inquirer.prompt([{
                    name: "item",
                    type: "input",
                    message: "What new item would you like to add?"
                },
                {
                    name: "department",
                    type: "input",
                    message: "Which department shall we place it in?"
                },
                {
                    name: "price",
                    type: "input",
                    message: "What is the price on this item?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to add?"

                }]).then(function (answer) {

                    var query = connection.query('INSERT INTO products SET ?',
                        {
                            product_name: answer.item,
                            department_name: answer.department,
                            price: answer.price,
                            stock_quantity: answer.quantity
                        }, function (err, res) {
                            if (err) console.log(err);
                            console.log("\nSuccessful! Your item is now added!\n");
                            managerView();
                        }
                    )
                })
            }
        })
}


