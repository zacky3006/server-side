const db = require("../database/db");

exports.findByEmailAndPassword = (email, password, callback) => {
    db.get("SELECT * FROM Customer WHERE email = ? AND password = ?", [email, password], callback);
};

exports.findByEmail = (email, callback) => {
    db.get("SELECT * FROM Customer WHERE email = ?", [email], callback);
};

exports.create = (email, password, callback) => {
    db.run("INSERT INTO Customer (email, password) VALUES (?, ?)", [email, password], callback);
};
