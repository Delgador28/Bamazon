
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
-- ORIGINAL TABLE --
CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (100) NOT NULL,
    department_name VARCHAR
    (100),
    price DECIMAL
    (10,2) DEFAULT 0,
    stock_quantity INT
    (10) DEFAULT 0,
    primary key
    (item_id)
);
 
    CREATE TABLE departments
    (
        department_id INT NOT NULL
        AUTO_INCREMENT,
        department_name VARCHAR
        (100) NOT NULL,
         over_head_costs INT
        (100) NOT NULL,
        PRIMARY KEY
        (department_id)

);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity)
        VALUES
            ("Palm Tree", "Gardening", 120, 115),
            ("Pajama Pants", "Clothing", 10, 20),
            ("Greek Yogurt", "Food", 7, 200),
            ("Dog Food", "Pet Care", 20, 100),
            ("Aspirin", "Health", 17, 300),
            ("Couch", "Furniture", 200, 10),
            ("Cheerios", "Food", 3, 300),
            ("Chips", "Food", 1, 10000)
       
       
        -- INSERT INTO departments
        --     (department_name, over_head_costs)
        -- VALUES
        --     ("Gardening", 282828),
        --     ("Clothing", 21000),
        --     ("Food", 30000),
        --     ("Pet Care", 40000),
        --     ("Health", 50000),
        --     ("Furniture", 100000)


