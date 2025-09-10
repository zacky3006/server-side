const Product = require("../models/productModel");

exports.showHome = (req, res) => {
    const customer_id = req.query.customer_id;
    if (!customer_id) return res.send("Customer ID is required.");

    Product.getMaleProducts((err, products) => {
        if (err) return res.send("Database error.");

        Product.getStudioProducts((err, studioProducts) => {
            if (err) return res.send("Database error.");

            Product.getFavorites(customer_id, (err, favoriteRows) => {
                if (err) return res.send("Database error.");

                const favoriteSet = new Set(favoriteRows.map(r => r.product_id));

                products.forEach(p => p.is_favorite = favoriteSet.has(p.product_id));
                studioProducts.forEach(p => p.is_favorite = favoriteSet.has(p.product_id));

                res.render("home", { products, studioProducts, customer_id });
            });
        });
    });
};
