const db = require("../database/db");

const Cart = {
    getByCustomer: (customer_id, callback) => {
        const sql = `
            SELECT p.product_id, p.name, p.price, p.image_url, c.quantity
            FROM Cart c
            INNER JOIN Product p ON c.product_id = p.product_id
            WHERE c.customer_id = ?`;
        db.all(sql, [customer_id], callback);
    },

    addOrUpdate: (customer_id, product_id, quantity, callback) => {
        db.get("SELECT * FROM Cart WHERE customer_id=? AND product_id=?", [customer_id, product_id], (err, row) => {
            if (err) return callback(err);

            if (row) {
                const newQuantity = row.quantity + quantity;
                db.run("UPDATE Cart SET quantity=? WHERE customer_id=? AND product_id=?", 
                    [newQuantity, customer_id, product_id], function(err) {
                        callback(err, this ? this.changes : null);
                    });
            } else {
                db.run("INSERT INTO Cart (customer_id, product_id, quantity) VALUES (?, ?, ?)", 
                    [customer_id, product_id, quantity], function(err) {
                        callback(err, this ? this.lastID : null);
                    });
            }
        });
    },

    updateQuantity: (customer_id, product_id, quantity, callback) => {
        db.run("UPDATE Cart SET quantity=? WHERE customer_id=? AND product_id=?", 
            [quantity, customer_id, product_id], function(err) {
                callback(err, this ? this.changes : null);
            });
    },

    remove: (customer_id, product_id, callback) => {
        db.run("DELETE FROM Cart WHERE customer_id=? AND product_id=?", 
            [customer_id, product_id], function(err) {
                callback(err, this ? this.changes : null);
            });
    },

    clear: (customer_id, callback) => {
        db.run("DELETE FROM Cart WHERE customer_id=?", [customer_id], function(err) {
            callback(err, this ? this.changes : null);
        });
    }
};

module.exports = Cart;
