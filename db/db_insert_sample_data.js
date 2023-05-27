const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_cart_table_sql = "DELETE FROM cart;"

db.execute(delete_cart_table_sql);

const delete_food_table_sql = "DELETE FROM food;"

db.execute(delete_food_table_sql);

const delete_reviews_table_sql = "DELETE FROM reviews;"

db.execute(delete_reviews_table_sql);

const delete_restaurants_table_sql = "DELETE FROM restaurants;"

db.execute(delete_restaurants_table_sql);

const insert_restaurants_sql = `
    INSERT INTO restaurants
    (restaurant_id,  restaurant_name, restaurant_food_type, restaurant_location)
    VALUES
    (?, ?, ?, ?);
`

db.execute(insert_restaurants_sql, [1, 'Restaurant #1', 'Italian', '206 Crest Drive, Paramus, NJ']);

db.execute(insert_restaurants_sql, [2, 'Restaurant #2', 'Breads', '14 Truman Court, Closter, NJ']);

db.execute(insert_restaurants_sql, [3, 'Restaurant #3', 'Ice Cream', '555 Marion Street, Teaneck, NJ']);

const insert_food_sql = `
    INSERT INTO food
    (food_id, restaurant_id, food_name, food_description, food_allergens)
    VALUES
    (?, ?, ?, ?, ?);
    `

db.execute(insert_food_sql, [1, 1, 'pizza', 'what\'s better than a pie? a pie WITH CHEESE', 'cheese']);

db.execute(insert_food_sql, [2, 1, 'pasta', 'tastes a little like spaghetti', 'wheat']);

db.execute(insert_food_sql, [3, 1, 'spaghetti', 'tastes a little like pasta', 'wheat']);

db.execute(insert_food_sql, [4, 2, 'white bread', 'crafted and designed to feed geese', 'wheat']);

db.execute(insert_food_sql, [5, 2, 'wheat bread', 'for people who want to think they\'re heathier than the rest', 'wheat']);

db.execute(insert_food_sql, [6, 2, 'baguette', 'loooong bread', 'wheat']);

db.execute(insert_food_sql, [7, 3, 'strawberry ice cream', 'ice cream but it tastes liek strawberries', 'strawberry']);

db.execute(insert_food_sql, [8, 3, 'CHOCOLATE ice cream', 'ice cream but it tastes liek CHOCOLATE', 'chocolate']);
    
db.execute(insert_food_sql, [9, 3, 'vanilla ice cream sandwich', 'ice cream smodged between 2 pieces of chocolate thingies', 'milk']);

const insert_reviews_sql = `
    INSERT INTO reviews
    (review_id, restaurant_id, user_id, review_score, review_description)
    VALUES
    (?, ?, ?, ?, ?);
    `

db.execute(insert_reviews_sql, [1, 1, 1, 10, 'food is GREAT']);

db.execute(insert_reviews_sql, [2, 2, 2, 7, 'food is GOOD']);

db.execute(insert_reviews_sql, [3, 3, 3, 3, 'food is GARBAGE']);

const insert_cart_sql = `
    INSERT INTO cart
    (purchase_id, user_id, food_id)
    VALUES
    (?, ?, ?);
    `
    db.execute(insert_cart_sql, [1, 1, 1]);
    db.execute(insert_reviews_sql, [1, 1, 1, 10, 'food is GREAT']);
    
    db.execute(insert_cart_sql, [2, 1, 2]);

    db.execute(insert_cart_sql, [3, 2, 3]);
    db.execute(insert_reviews_sql, [2, 2, 2, 7, 'food is GOOD']);

    db.execute(insert_reviews_sql, [3, 3, 3, 3, 'food is GARBAGE']);
