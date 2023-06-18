SELECT restaurant_id, restaurant_name, restaurant_location, restaurant_id
FROM restaurants
JOIN food
    ON restaurants.restaurant_id = food.restaurant_id
WHERE food.restaurant_id = restaurants.restaurant_id
ORDER BY restaurant_id ASC
