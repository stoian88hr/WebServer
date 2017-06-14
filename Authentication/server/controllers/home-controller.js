//jshint node:true
"use strict";

module.exports = {
	index: (req, res) => {
		res.render("homes/home");
	},
	about: (req, res) => {
		res.render("homes/about");
	}
};