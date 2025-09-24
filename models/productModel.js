const db = require("../database/db");

const Product = {
    getAllAsync: () => {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT product_id, name, description, image_url, price, color, gender, categories, category_id
                FROM Product
            `;
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },

    getByIdAsync: (product_id) => {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT product_id, name, description, image_url, price, color, gender, categories, category_id
                FROM Product
                WHERE product_id = ?
            `;
            db.get(sql, [product_id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    },

    create: (data) => {
        return new Promise((resolve, reject) => {
            const { name, description, image_url, price, color, gender, categories, category_id } = data;
            const sql = `
                INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            db.run(sql, [name, description, image_url, price, color, gender, categories, category_id], function(err) {
                if (err) return reject(err);
                resolve(this.lastID);
            });
        });
    },

    update: (data) => {
        return new Promise((resolve, reject) => {
            const { product_id, name, description, image_url, price, color, gender, categories, category_id } = data;
            const sql = `
                UPDATE Product
                SET name=?, description=?, image_url=?, price=?, color=?, gender=?, categories=?, category_id=?
                WHERE product_id=?
            `;
            db.run(sql, [name, description, image_url, price, color, gender, categories, category_id, product_id], function(err) {
                if (err) return reject(err);
                resolve(this.changes);
            });
        });
    },

    delete: (product_id) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM Product WHERE product_id = ?`;
            db.run(sql, [product_id], function(err) {
                if (err) return reject(err);
                resolve(this.changes);
            });
        });
    }
};

module.exports = Product;
