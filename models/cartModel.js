const db = require("../database/db");

const Cart = {
    // ดึงรายการตะกร้าของลูกค้า
    getByCustomerAsync: (customer_id) => {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT p.product_id, p.name, p.price, p.image_url, c.quantity
                FROM Cart c
                INNER JOIN Product p ON c.product_id = p.product_id
                WHERE c.customer_id = ?
            `;
            db.all(sql, [customer_id], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },

    // เพิ่มหรืออัปเดตสินค้าในตะกร้า
    addOrUpdateAsync: (customer_id, product_id, quantity) => {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM Cart WHERE customer_id=? AND product_id=?",
                [customer_id, product_id],
                (err, row) => {
                    if (err) return reject(err);

                    if (row) {
                        const newQuantity = row.quantity + quantity;
                        db.run(
                            "UPDATE Cart SET quantity=? WHERE customer_id=? AND product_id=?",
                            [newQuantity, customer_id, product_id],
                            function(err) {
                                if (err) return reject(err);
                                resolve(this.changes);
                            }
                        );
                    } else {
                        db.run(
                            "INSERT INTO Cart (customer_id, product_id, quantity) VALUES (?, ?, ?)",
                            [customer_id, product_id, quantity],
                            function(err) {
                                if (err) return reject(err);
                                resolve(this.lastID);
                            }
                        );
                    }
                }
            );
        });
    },

    // อัปเดตจำนวนสินค้า
    updateQuantityAsync: (customer_id, product_id, quantity) => {
        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE Cart SET quantity=? WHERE customer_id=? AND product_id=?",
                [quantity, customer_id, product_id],
                function(err) {
                    if (err) return reject(err);
                    resolve(this.changes);
                }
            );
        });
    },

    // ลบสินค้าออกจากตะกร้า
    removeAsync: (customer_id, product_id) => {
        return new Promise((resolve, reject) => {
            db.run(
                "DELETE FROM Cart WHERE customer_id=? AND product_id=?",
                [customer_id, product_id],
                function(err) {
                    if (err) return reject(err);
                    resolve(this.changes);
                }
            );
        });
    },

    // ล้างตะกร้าทั้งหมด
    clearAsync: (customer_id) => {
        return new Promise((resolve, reject) => {
            db.run(
                "DELETE FROM Cart WHERE customer_id=?",
                [customer_id],
                function(err) {
                    if (err) return reject(err);
                    resolve(this.changes);
                }
            );
        });
    }
};

module.exports = Cart;
