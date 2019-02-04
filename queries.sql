CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
	itemID INTEGER(11) AUTO_INCREMENT NOT NULL,
	productName VARCHAR(30) NOT NULL,
    departmentName VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NULL,
    stockQuantity INT(15),
    PRIMARY KEY (itemID)
);

USE bamazon_db;
INSERT INTO products (productName,departmentName,price,stockQuantity)
VALUES ("iPhone X", "Cellphones" , 750.00 , 20);
INSERT INTO products (productName,departmentName,price,stockQuantity)
VALUES ("Macbook Pro", "Laptops" , 1500.00 , 25);
INSERT INTO products (productName,departmentName,price,stockQuantity)
VALUES ("Ipad Pro", "Tablets" , 525.00 , 50);
INSERT INTO products (productName,departmentName,price,stockQuantity)
VALUES ("Xbox One", "Game Console" , 325.00 , 100);
INSERT INTO products (productName,departmentName,price,stockQuantity)
VALUES ("Playstation 4", "Game Console" , 400.00 , 90);
INSERT INTO products (productName,departmentName,price,stockQuantity)
VALUES ("Sony CH700", "Headphones" , 150.00 , 150);
INSERT INTO products (productName,departmentName,price,stockQuantity)
VALUES ("Jordan XI", "Shoes" , 175.00 , 30);
INSERT INTO products (productName,departmentName,price,stockQuantity)
VALUES ("Nike Basketball", "Sport Equipment" , 75.00 , 100);
INSERT INTO products (productName,departmentName,price,stockQuantity)
VALUES ("Gucci", "Shoes" , 270.00 , 25);
INSERT INTO products (productName,departmentName,price,stockQuantity)
VALUES ("Boxing Gloves", "Sport Equipment" , 50.00 , 250);
SELECT * FROM products;