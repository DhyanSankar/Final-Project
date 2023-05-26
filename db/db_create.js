const db = require("./db_connection");

/**** Drop existing tables, if any ****/

const drop_restaurants_table_sql = "DROP TABLE IF EXISTS restaurants;"

db.execute(drop_restaurants_table_sql);

/**** Create tables ****/

const create_restaurants_table_sql = `
    CREATE TABLE restaurants (
        restaurant_id INT NOT NULL AUTO_INCREMENT,
        restaurant_name VARCHAR(45) NOT NULL,
        restaurant_food_type VARCHAR(255) NULL,
        restaurant_location VARCHAR(255) NULL,
        PRIMARY KEY (restaurant_id));
`
db.execute(create_restaurants_table_sql);

db.end();
