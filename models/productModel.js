const db = require('../database/db');

exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Product', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

exports.getProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Product WHERE categories = ?', [category], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// ดึงสินค้าโดย ID
exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Product WHERE product_id = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};
