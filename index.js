const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");
const session = require('express-session');


// middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const productRoutes = require("./routes/detail");
const cartRoutes = require("./routes/cartRoutes");

app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);

app.get("/", (req, res) => res.redirect("/signin"));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
