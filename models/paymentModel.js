const db = require("../database/db");

exports.clearCart = (customer_id, callback) => {
    const sql = "DELETE FROM Cart WHERE customer_id = ?";
    db.run(sql, [customer_id], (err) => {
        if (err) callback(err);
        else callback(null);
    });
};