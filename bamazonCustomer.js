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


// Now we are creating the connection of the user and the function thats will actually be beign done

// So we are going to have out first connection that we ahve made aboveand addiing a .connect(f....(***){
connection.connect(function (err) {
    //We will start off with the defasult if err we are throwing this
    if (err) throw (err);
    // so now if ther is no error since we did throw we can go right into it which in this case is going to be:
    //Our welcome displayb thingy
    console.log("-------------------\nWelcome to the Bamazon Customer Screen\n-------------------");
    customerView();
    customerQuestion();
    //after our welcome thing is displayed we want to run a function that will display the inventory that we have right now - ex: functionname()

    // remember to ...

});
//---------------------------------------


//Making our function that we called rn - putting it in a variable
var customerView = function () {
    var query = connection.query('SELECT item_id, product_name, price FROM products', function (err, result) {
        if (err) console.log(err);

        var table = new Table({
            head: ['ID', 'Product', 'Price'],
            colWidths: [5, 15, 8]
        });

        for (var i = 0; i < result.length; i++) {
            table.push(
                [result[i].item_id, result[i].product_name, "$" + result[i].price]
            )
        }
        console.log(table.toString())
    });

}



// console.log the whole tabel var (so the table we just made basically) and we are making it as string using a string function we found that is toString();
//then we are running a function that will be the prompt thing  that asks the customer a questions that basically makes up the rest of the page so ex thisfucntion(); 

// make a variable for the customers questions and answers here also this is the function used above bc its all going ina certain order remember that
//we are setting a var name to this function
var customerQuestion = function () {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What product would you like to buy? Make sure to to chose based on ID number."
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
        }]
    ).then(function (answer) {
        var query = connection.query('SELECT item_id, price, stock_quantity FROM products', function (err, result) {
            var remaining = result[answer.id - 1].stock_quantity - answer.quantity;
            if (remaining >= 0) {
                var query = connection.query('UPDATE products SET stock_quantity=' + remaining + ' where item_id=' + answer.id)
                console.log("\nSuccess! Your total is " + result[answer.id - 1].price * answer.quantity + "\n");
                customerView();
            }
            else {
                console.log("\nNot enough in stock, come again later.\n");
                customerView();
            }
        })
    })
};

// if result[answer.id]
// Modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.
