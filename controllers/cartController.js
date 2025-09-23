

exports.getCart = (req, res) => {
    const customer_id = req.query.customer_id || req.session.customer_id || null;
    res.render('shopping-bag', {
        cartItems: req.session.cart || [],
        customer_id
    });
};

exports.addToCart = (req, res) => {
    const { product_id, name, price, image_url } = req.body;
    if (!req.session.cart) req.session.cart = [];

    const existing = req.session.cart.find(item => item.product_id === product_id);
    if (existing) {
        existing.quantity += 1;
    } else {
        req.session.cart.push({ product_id, name, price, image_url, quantity: 1 });
    }
    res.redirect('/cart');
};

exports.removeFromCart = (req, res) => {
    const productId = req.params.id;
    req.session.cart = req.session.cart.filter(item => item.product_id !== productId);
    res.redirect('/cart');
};
