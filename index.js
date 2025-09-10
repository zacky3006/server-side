const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");

// middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use("/", authRoutes);
app.use("/", homeRoutes);

app.get("/", (req, res) => res.redirect("/signin"));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
