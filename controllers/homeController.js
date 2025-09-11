const Product = require("../models/productModel");

exports.showHome = (req, res) => {

    const customer_id = req.user ? req.user.customer_id : null;
    if (!customer_id) return res.redirect("/signin");

    Product.getMaleProducts((err, products) => {
        if (err) return res.send("Database error.");

        Product.getStudioProducts((err, studioProducts) => {
            if (err) return res.send("Database error.");


                res.render("home", { products, studioProducts, customer_id });
            });
        });
    };
