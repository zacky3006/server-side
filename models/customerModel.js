const db = require("../database/db");

exports.findByEmailAndPassword = (email, callback) => {
    db.get("SELECT * FROM Customer WHERE email = ?", [email], callback);
};

exports.findByEmail = (email, callback) => {
    db.get("SELECT * FROM Customer WHERE email = ?", [email], callback);
};

exports.create = (email, password, callback) => {
    db.run("INSERT INTO Customer (email, password) VALUES (?, ?)", [email, password], function(err) {
        callback(err, this ? this.lastID : null);
    });
};
