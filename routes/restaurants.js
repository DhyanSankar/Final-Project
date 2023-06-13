const DEBUG = true;

const express = require('express')
const db = require('../db/db_pool_promise');
const fs = require("fs");
const path = require("path");

let restaurantsRouter = express.Router();

// const read_subjects_all_sql = fs.readFileSync(path.join(__dirname, "..",
//     "db", "queries", "crud", "read_subjects_all.sql"),
//     { encoding: "UTF-8" });

// define a route for the restaurant list page
const read_restaurants_all_sql = fs.readFileSync(path.join(__dirname, "..",
    "db", "queries", "crud", "read_restaurants_all.sql"),
    { encoding: "UTF-8" });
restaurantsRouter.get("/", (req, res) => {

    let readRestaurantsPromise = db.execute(read_restaurants_all_sql, [req.oidc.user.sub]);
    // let readSubjectsPromise = db.execute(read_subjects_all_sql, [req.oidc.user.sub]);

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
    let readFoodDetailPromise = db.execute(read_food_from_restaurant_sql, [req.params.id, req.oidc.user.sub]);
    let readReviewsPromise = db.execute(read_review_from_restaurant_sql, [req.params.id, req.oidc.user.sub]);
    Promise.all([readFoodDetailPromise, readReviewsPromise])
    .then(([ [results, fields], [results2, fields2]]) => {
        if (DEBUG) {
            console.log(results);
            console.log(results2);
        }
        if (results.length == 0)
            res.status(404).send(`No restaurant found with id = "${req.params.id}"` ); // NOT FOUND
        else {
            let data = { foodlist: results[0], reviewlist: results2 }; // results is still an array, get first (only) element
            res.render('purchaseItems', data);    
        }
    })
    .catch((error) => {
        if (DEBUG) console.log(error);
        res.status(500).send(error); //Internal Server Error
    });    
});


// // define a route for assignment CREATE
// const create_assignment_sql = fs.readFileSync(path.join(__dirname, "..",
//     "db", "queries", "crud", "insert_assignment.sql"),
//     { encoding: "UTF-8" });

// restaurantsRouter.post("/", (req, res) => {
//     db.execute(create_assignment_sql,
//         [req.body.title, req.body.priority, req.body.subject,
//         req.body.dueDate, req.oidc.user.sub])
//     .then(([results, fields]) => {
//         if (DEBUG) console.log(results);
//         //results.insertId has the primary key (assignmentId) of the newly inserted row.
//         res.redirect(`/assignments/${results.insertId}`);
//     }).catch((error) => {
//         if (DEBUG) console.log(error);
//         res.status(500).send(error); //Internal Server Error
//     });

// });

// define a route for assignment UPDATE
const update_assignment_sql = fs.readFileSync(path.join(__dirname, "..",
    "db", "queries", "crud", "update_assignment.sql"),
    { encoding: "UTF-8" });

restaurantsRouter.post("/:id", (req, res) => {
    db.execute(update_assignment_sql, 
        [req.body.title, req.body.priority, req.body.subject, req.body.dueDate, req.body.description, req.params.id])
    .then(([results, fields]) => {
        if (DEBUG) console.log(results);
        res.redirect(`/assignments/${req.params.id}`);
    }).catch((error) => {
        if (DEBUG) console.log(error);
        res.status(500).send(error); //Internal Server Error
    });
});

// define a route for assignment DELETE
const delete_assignment_sql = fs.readFileSync(path.join(__dirname, "..",
    "db", "queries", "crud", "delete_assignment.sql"),
    { encoding: "UTF-8" });


restaurantsRouter.get("/:id/delete", (req, res) => {
    db.execute(delete_assignment_sql, [req.params.id, req.oidc.user.sub])
    .then(([results, fields]) => {
        if (DEBUG) console.log(results);
        res.redirect(`/assignments`);
    }).catch((error) => {
        if (DEBUG) console.log(error);
        res.status(500).send(error); //Internal Server Error
    });
});

module.exports = restaurantsRouter;