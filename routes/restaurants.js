const DEBUG = true;

const express = require('express')
const db = require('../db/db_pool_promise');
const fs = require("fs");
const path = require("path");

let restaurantsRouter = express.Router();


// define a route for the restaurant list page
const read_restaurants_all_sql = fs.readFileSync(path.join(__dirname, "..",
    "db", "queries", "crud", "read_restaurants_all.sql"),
    { encoding: "UTF-8" });
restaurantsRouter.get("/", (req, res) => {

    let readRestaurantsPromise = db.execute(read_restaurants_all_sql, [req.oidc.user.sub]);

    Promise.all([readRestaurantsPromise])
    .then(([[results, fields]]) => {
        if (DEBUG) {
            console.log(results);
        }
        let data = { restaurantlist: results}; // results is still an array, get first (only) element
        res.render('restaurants', data);
    }).catch((error) => {
        if (DEBUG) console.log(error);
        res.status(500).send(error); //Internal Server Error
    });

});


// define a route for the restaurant purchase page
const read_food_from_restaurant_sql = fs.readFileSync(path.join(__dirname, "..",
    "db", "queries", "crud", "read_food_from_restaurant.sql"),
    { encoding: "UTF-8" });

const read_review_from_restaurant_sql = fs.readFileSync(path.join(__dirname, "..",
    "db", "queries", "crud", "read_review_from_restaurant.sql"),
    { encoding: "UTF-8" });

restaurantsRouter.get("/:id", (req, res) => {
    let readFoodDetailPromise = db.execute(read_food_from_restaurant_sql, [req.params.id]);
    let readReviewsPromise = db.execute(read_review_from_restaurant_sql, [req.params.id]);
    Promise.all([readFoodDetailPromise, readReviewsPromise])
    .then(([ [results, fields], [results2, fields2]]) => {
        if (DEBUG) {
            console.log(results);
            console.log(results2);
        }
        if (results.length == 0)
            res.status(404).send(`No restaurant found with id = "${req.params.id}"` ); // NOT FOUND
        else {
            let data = { foodlist: results, reviewlist: results2}; // results is still an array, get first (only) element
            res.render('purchaseItems', data);    
        }
    })
    .catch((error) => {
        if (DEBUG) console.log(error);
        res.status(500).send(error); //Internal Server Error
    });    
});

const create_review_sql = fs.readFileSync(path.join(__dirname, "..",
    "db", "queries", "crud", "create_review.sql"),
    { encoding: "UTF-8" });

restaurantsRouter.post("/:id", (req, res) => {
    console.log(req.body.score);
    console.log(req.body.description);
    db.execute(create_review_sql,
        [req.params.id, req.oidc.user.sub, 5, "mid"])
    .then(([results, fields]) => {
        if (DEBUG) console.log(results);
        //results.insertId has the primary key (assignmentId) of the newly inserted row.
        res.redirect(`/restaurants/${req.params.id}`);
    }).catch((error) => {
        if (DEBUG) console.log(error);
        res.status(500).send(error); //Internal Server Error
    });

});


const add_to_cart = fs.readFileSync(path.join(__dirname, "..",
    "db", "queries", "crud", "add_to_cart.sql"),
    { encoding: "UTF-8" });

restaurantsRouter.get("/:id/add", (req, res) => {
    console.log(req.params.id);
    db.execute(add_to_cart, [req.oidc.user.sub, req.params.id])
    .then(([results, fields]) => {
        if (DEBUG) console.log(results);
        res.redirect(`/cart`);
    }).catch((error) => {
        if (DEBUG) console.log(error);
        res.status(500).send(error); //Internal Server Error
    });
});

module.exports = restaurantsRouter;