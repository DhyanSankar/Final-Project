const db = require("./db_connection");
/**** Read the restaurants table ****/

const select_restaurants_sql = "SELECT * FROM restaurants";

db.execute(select_restaurants_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'restaurants' contents:")
        console.log(results);
    }
);

const select_food_sql = "SELECT * FROM food";

db.execute(select_food_sql,
    (error, results) => {
        if (error)
            throw error;

        console.log("Table 'food' contents:");
        console.log(results);
    }
);

const select_cart_sql = "SELECT * FROM cart";

db.execute(select_cart_sql,
    (error, results) => {
        if (error)
            throw error;
            
        console.log("Table 'cart' contents:");
        console.log(results);
    }
);

const select_reviews_sql = "SELECT * FROM reviews";

db.execute(select_reviews_sql,
    (error, results) => {
        if (error)
            throw error;
            
        console.log("Table 'reviews' contents:");
        console.log(results);
    }
);