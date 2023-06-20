SELECT 
    food.restaurant_id, food_id, food_name, food_description, food_allergens, ROUND(food_price, 2) as food_price
FROM food
JOIN restaurants
    ON food.restaurant_id = restaurants.restaurant_id
WHERE food.restaurant_id = ?
ORDER BY food_name DESC