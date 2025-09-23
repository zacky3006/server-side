const Product = require('../models/productModel');

exports.getDetail = async (req, res) => {
    try {
        const product = await Product.getProductById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('product-detail', { product });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
