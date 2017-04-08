//getting npm packages ready
var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");
var models = require('../models');
var burger = require("../models/Burger.js")


//setting up router for implementation
var router = express.Router();



//Gets all burgers and their devoured status
router.get("/", function(req, res) {
		models.Burger.findAll({}).then(function(burgers){
			// console.log(burgers)
			res.render("index", {burgers: burgers})
		}) 
});

//Adds new burgers to burger table
router.post("/add_burger", function(req, res) {

		models.Burger.create({
			burger_name: req.body.name
			}).then(function(){
			res.redirect("/");
		})
 
});

//When a burger is devoured its id is passed as a param, id is then used to find the burger to be updated as devoured. 
router.put("/:id", function(req, res) {
		
		models.Burger.find({
			where: {id: req.params.id}
		}).then(function(burger){
			burger.update({ devoured: true })
		}).then(function(){
			res.redirect("/")
			// console.log(Burger);	
		})
 
});





//exports router 
module.exports = router;