require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

exports.showSignIn = (req, res) => res.render("signin", { error: null });

exports.signIn = (req, res) => {
    const { email, password } = req.body;

    Customer.findByEmail(email, async (err, user) => {
        if (err) return res.send("Database error.");
        if (!user) return res.render("signin", { error: "Email หรือ รหัสผ่านไม่ถูกต้อง" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.render("signin", { error: "Email หรือ รหัสผ่านไม่ถูกต้อง" });

        const token = jwt.sign({ customer_id: user.customer_id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
        res.redirect("/home");
    });
};

exports.showSignUp = (req, res) => res.render("signup", { error: null });

exports.signUp = (req, res) => {
    const { email, password } = req.body;

    Customer.findByEmail(email, async (err, user) => {
        if (err) return res.send("Database error.");
        if (user) return res.render("signup", { error: "อีเมลนี้มีอยู่แล้ว" });

        try {
            const hashed = await bcrypt.hash(password, SALT_ROUNDS);
            Customer.create(email, hashed, (err, lastID) => {
                if (err) return res.send("Error creating account.");
                res.redirect("/signin");
            });
        } catch (e) {
            console.error(e);
            res.send("Server error.");
        }
    });
};

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.redirect("/signin");
};
