const Product = require('../models/productModel');

exports.getDetail = async (req, res) => {
    try {
        const productId = req.params.id;
        const customer_id = req.query.customer_id || null; // Or get from session/cookie
        const product = await Product.getProductById(productId);
        res.render('detail', { product, customer_id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};