const db = require('../database/db');

const Product = {
    getAll: (callback) => {
        db.all("SELECT * FROM Product", [], callback);
    },

    getById: (product_id, callback) => {
        db.get("SELECT * FROM Product WHERE product_id = ?", [product_id], callback);
    },

    create: (data, callback) => {
        const { name, description, image_url, price, color, gender, categories, category_id } = data;
        const sql = `INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, [name, description, image_url, price, color, gender, categories, category_id], function(err) {
            callback(err, this ? this.lastID : null);
        });
    },

    update: (data, callback) => {
        const { product_id, name, price, description, image_url } = data;
        const sql = "UPDATE Product SET name=?, price=?, description=?, image_url=? WHERE product_id=?";
        db.run(sql, [name, price, description, image_url, product_id], function(err) {
            callback(err, this.changes);
        });
    },

    delete: (product_id, callback) => {
        db.run("DELETE FROM Product WHERE product_id = ?", [product_id], function(err) {
            callback(err, this.changes);
        });
    }
};

module.exports = Product;
