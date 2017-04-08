var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var database = require("./models");

var PORT =process.env.PORT || 4000;

var app = express();

app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var burgersController = require("./controller/burgersController.js");


database.sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

app.use("/", burgersController);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(PORT, function(){
	console.log("Listening port "+ PORT)
});