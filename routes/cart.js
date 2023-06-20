const DEBUG = true;

const express = require('express')
const db = require('../db/db_pool_promise');
const fs = require("fs");
const path = require("path");

let cartRouter = express.Router();


// define a route for the cart list page
const read_cart_all_sql = fs.readFileSync(path.join(__dirname, "..",
    "db", "queries", "crud", "read_all_from_cart.sql"),
    { encoding: "UTF-8" });
cartRouter.get("/", (req, res) => {

    let readCartPromise = db.execute(read_cart_all_sql, [req.oidc.user.sub]);

    Promise.all([readCartPromise])
    .then(([[results, fields]]) => {
        if (DEBUG) {
            console.log(results);
        }
        let data = { cartlist: results}; // results is still an array, get first (only) element
        res.render('cart', data);
    }).catch((error) => {
        if (DEBUG) console.log(error);
        res.status(500).send(error); //Internal Server Error
    });

});

module.exports = cartRouter;