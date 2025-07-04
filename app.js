var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("./middleware/logger");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var studentsRouter = require("./routes/students");

var app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/students", studentsRouter);

module.exports = app;
