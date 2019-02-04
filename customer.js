var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");

//connect to mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    displayItems();
});

//display table from database and start thr prompted questions
function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["Item ID", "Product Name", "Department", "Price", "Quantity"]
        });
        //display items from table
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].itemID, res[i].productName, res[i].departmentName, res[i].price, res[i].stockQuantity])
        }
        console.log(table.toString());
        promptQuestions();
    });
}

//prompts for the customer to enter items and quantity
function promptQuestions(length) {
    inquirer
    .prompt([
        {
            name: "item_id",
            message: "Enter the Item ID of the product you would like to purchase:"
        }
    ])
    .then(function(answer) {
        var purchaseId = answer.item_id;
        inquirer
        .prompt([
            {
                name: "quantity",
                message: "How many do you want to purchase?"
            }
        ])
        //if the entry is not valid and run the displayItems again
        .then(function(answer) {
            if (purchaseId > length + 1 || isNaN(purchaseId) || isNaN(answer.quantity)){
                console.log("Input invalid!");
                displayItems();
            }
            //check and update the quantity of product
            else {
                connection.query("SELECT stockQuantity, price FROM products WHERE itemID = ?", [purchaseId],
                    function (err, res) {
                        if (err) throw err;
                        if (answer.quantity > res[0].stockQuantity) {
                            console.log("Non sufficient quantity!");
                        }
                        else {
                            var updateQuantity = res[0].stockQuantity - parseFloat(answer.quantity);
                            connection.query("UPDATE products SET ? WHERE ?",
                                [
                                    {
                                    stockQuantity: updateQuantity
                                    },
                                    {
                                    itemID: purchaseId
                                    }
                                ],
                                function (err, res) {
                                    if (err) throw err;
                                }
                            );
                            //total purchase of items
                            var totalPurchase = res[0].price * answer.quantity;
                            console.log("Your total amount of purchase is: " + totalPurchase.toFixed(2));
                        }
                        displayItems();
                    }
                );
            }
        });
    });
}