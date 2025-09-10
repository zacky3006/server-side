const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use("/", authRoutes);
app.use("/", homeRoutes);

// หน้าแรกให้ไป Sign In
app.get("/", (req, res) => res.redirect("/signin"));

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
