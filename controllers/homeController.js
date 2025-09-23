const Product = require('../models/productModel');

exports.getHome = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        const studioProducts = await Product.getProductsByCategory('studio');
        res.render('home', { products, studioProducts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
