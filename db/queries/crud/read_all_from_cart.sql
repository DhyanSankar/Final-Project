SELECT purchase_id, restaurants.restaurant_name, food.food_name, ROUND(food.food_price, 2) as food_price
FROM cart
JOIN food
    ON cart.food_id = food.food_id
JOIN restaurants
    ON restaurants.restaurant_id = food.restaurant_id
WHERE cart.user_id = ?
ORDER BY purchase_id