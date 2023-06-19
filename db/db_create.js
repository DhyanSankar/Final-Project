const db = require("./db_connection");

/**** Drop existing tables, if any ****/

const drop_cart_table_sql = "DROP TABLE IF EXISTS cart;"

db.execute(drop_cart_table_sql);

const drop_food_table_sql = "DROP TABLE IF EXISTS food;"

db.execute(drop_food_table_sql);

const drop_reviews_table_sql = "DROP TABLE IF EXISTS reviews;"

db.execute(drop_reviews_table_sql);

const drop_restaurants_table_sql = "DROP TABLE IF EXISTS restaurants;"

db.execute(drop_restaurants_table_sql);

/**** Create tables ****/

const create_restaurants_table_sql = `
    CREATE TABLE restaurants (
        restaurant_id INT NOT NULL AUTO_INCREMENT,
        restaurant_name VARCHAR(63) NOT NULL,
        restaurant_food_type VARCHAR(255) NULL,
        restaurant_location VARCHAR(255) NULL,
        PRIMARY KEY (restaurant_id));
`
db.execute(create_restaurants_table_sql);

const create_food_table_sql = `
    CREATE TABLE food (
        food_id INT NOT NULL AUTO_INCREMENT,
        restaurant_id INT NOT NULL,
        food_name VARCHAR(63) NOT NULL,
        food_description VARCHAR(255) NULL,
        food_allergens VARCHAR(63) NULL,
        food_price FLOAT NOT NULL,
        PRIMARY KEY (food_id),
        INDEX foodRestaurant_idx (restaurant_id ASC),
        CONSTRAINT foodRestaurant
            FOREIGN KEY (restaurant_id)
            REFERENCES restaurants (restaurant_id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`
db.execute(create_food_table_sql);

const create_reviews_table_sql = `
    CREATE TABLE reviews (
        review_id INT NOT NULL AUTO_INCREMENT,
        restaurant_id INT NOT NULL,
        user_id INT NOT NULL,
        review_score INT NOT NULL,
        review_description VARCHAR(255) NULL,
        PRIMARY KEY (review_id),
        INDEX reviewRestaurant_idx (restaurant_id ASC),
        CONSTRAINT reviewRestaurant
            FOREIGN KEY (restaurant_id)
            REFERENCES restaurants (restaurant_id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`
db.execute(create_reviews_table_sql);

const create_cart_table_sql = `
    CREATE TABLE cart (
        purchase_id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        food_id INT NOT NULL,
        food_price FLOAT(5) NOT NULL,
        PRIMARY KEY (purchase_id),
        INDEX cartFood_idx (food_id ASC),
        CONSTRAINT cartFood
            FOREIGN KEY (food_id)
            REFERENCES food (food_id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`
db.execute(create_cart_table_sql);

db.end();
