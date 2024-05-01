var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { Authenticate } = require("./routes/AuthenticationRoute");
const { router } = require("./routes/AuthenticationRoute");
const Budget = require("./routes/BudgetRoute");
var app = express();

//cors setting
app.use(cors());
//db
mongoose
  .connect(
    "mongodb+srv://skesari:jZHG0vvRnR7lGyeL@cluster0.twcijtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.get('/',(req,res)=>{
  res.send({ message: 'Personal Budget Is Working Now.'})
})
app.use("/personalbudget/UserValidation", router);
app.use("/personalbudget/BudgetManager", Authenticate, Budget);


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
