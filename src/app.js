require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const { resolve } = require("path");

const app = express();

const sessionConfig = session({
	secret: process.env.SECRET_SESSION,
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 1000 * 60 * 60 * 3, httpOnly: true },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(sessionConfig);
app.use(flash());
app.set("view engine", "ejs");
app.set("views", resolve(__dirname, "views"));
app.use(express.static("public"));

const homeRoutes = require("./routes/homeRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const notFound = require("./middlewares/not-found");
const handleError = require("./middlewares/handle-error");
const globalVariable = require("./middlewares/global");

app.use(globalVariable);
app.use("/", homeRoutes);
app.use("/", userRoutes);
app.use("/orders", orderRoutes);
app.use(handleError);
app.use(notFound);

module.exports = app;
