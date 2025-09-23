const db = require("../database/db");

const Customer = {
    create: (email, password, callback) => {
        const sql = "INSERT INTO Customer (email, password) VALUES (?, ?)";
        db.run(sql, [email, password], function (err) {
            callback(err, this ? this.lastID : null);
        });
    },

    findByEmail: (email, callback) => {
        const sql = "SELECT * FROM Customer WHERE email = ?";
        db.get(sql, [email], (err, row) => {
            callback(err, row);
        });
    },

    findById: (customer_id, callback) => {
        const sql = "SELECT * FROM Customer WHERE customer_id = ?";
        db.get(sql, [customer_id], (err, row) => {
            callback(err, row);
        });
    }
};

module.exports = Customer;
