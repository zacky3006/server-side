const Customer = require("../models/customerModel");

exports.showSignIn = (req, res) => {
    res.render("signin", { error: null });
};

exports.signIn = (req, res) => {
    const { email, password } = req.body;

    Customer.findByEmailAndPassword(email, password, (err, user) => {
        if (err) return res.send("Database error.");
        if (!user) return res.render("signin", { error: "Invalid email or password." });

        res.redirect(`/home?customer_id=${user.customer_id}`);
    });
};

exports.showSignUp = (req, res) => {
    res.render("signup", { error: null });
};

exports.signUp = (req, res) => {
    const { email, password } = req.body;

    Customer.findByEmail(email, (err, user) => {
        if (err) return res.send("Database error.");
        if (user) return res.render("signup", { error: "Email already exists." });

        Customer.create(email, password, (err) => {
            if (err) return res.send("Error creating account.");
            res.redirect("/signin");
        });
    });
};
