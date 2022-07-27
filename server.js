const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const routes = require("./routers");
const passport = require("passport");
const expressSession = require("express-session")({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }, //1 hour
});
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//store section
app.use(expressSession);

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/views"));

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

//connect to database
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", function () {
    // we're connected!
    console.log("database connected");
});

//get routes
app.use(routes);

/**
 * set chalk theme
 * use an object so we can add more if needed
 */
const chalkTheme = {
    error: chalk.underline.red.bold,
    errorTitle: chalk.black.bgRedBright,
};

// Error handler middleware
// This must be placed after routes
app.use((error, req, res, next) => {
    console.log(chalkTheme.error("Error Handling Middleware called"));
    console.log(chalkTheme.errorTitle("Path: "), chalkTheme.error(req.path));
    console.log(
        chalkTheme.errorTitle("Error: "),
        chalkTheme.error(error.message)
    );
    console.log(error.stack);

    res.status(error.status || 500).json({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
});

app.listen(PORT, () => {
    console.log(`Server start at PORT ${PORT}`);
});
