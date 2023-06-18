SELECT 
    food_name, food_description, food_allergens, food_price
FROM food
JOIN restaurants
    ON food.restaurant_id = restaurants.restaurant_id
WHERE food.restaurant_id = ?
ORDER BY food_name DESC