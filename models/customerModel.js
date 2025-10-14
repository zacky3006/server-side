const db = require("../database/db");

const Customer = {
    // สร้างลูกค้าใหม่
    create: (email, password) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Customer (email, password, role) VALUES (?, ?, 'customer')";
            db.run(sql, [email, password], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    // หา customer ด้วย email
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Customer WHERE email = ?";
            db.get(sql, [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    // หา customer ด้วย customer_id
    findById: (customer_id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Customer WHERE customer_id = ?";
            db.get(sql, [customer_id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }
};

module.exports = Customer;
