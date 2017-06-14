//jshint node:true
"use strict";
let encryption = require("../utilities/encryption");
let User = require("mongoose").model("User");

module.exports = {
  register: (req, res) => {
    res.render("users/register");
  },
  create: (req, res) => {
    let user = req.body;

    let illegalChars = /[\W_]/; // allow only letters and numbers

        if (user.username === "") {
            user.globalError = "You didn't enter a username.\n";
            res.render("users/register", user);
            return false;
        } else if ((user.username.length < 5) || (user.username.length > 15)) {
            user.globalError = "The username is the wrong length.\n";
            res.render("users/register", user);
            return false;
        } else if (user.password === "") {
            user.globalError = "Please insert password";
            res.render("users/register", user);
            return false;
        } else if ((user.password.length < 7) || (user.password.length > 15)) {
            user.globalError = "The password is the wrong length.";
            res.render("users/register", user);
            return false;
        } else if (illegalChars.test(user.password)) {
            user.globalError = "The password contains illegal characters.";
            res.render("users/register", user);
            return false;
        } else if ((user.password.search(/[a-zA-Z]+/) == -1) || (user.password.search(/[0-9]+/) == -1)) {
            user.globalError = "The password must contain at least one numeral.\n";
            res.render("users/register", user);
            return false;
        } else if (user.password !== user.confirmPassword) {
            user.globalError = "Passwords do not match!";
            res.render("users/register", user);
            return false;
    } else {
      user.salt = encryption.generateSalt();
      user.hashedPass = encryption.generateHashedPassword(user.salt, user.password);

      User
        .create(user)
        .then(user => {
          req.logIn(user, (err, user) => {
            if (err) {
              res.render("users/register", { globalError: "Ooops 500" });
              return;
            }

            res.redirect("/");
          });
        });
    }
  },
  login: (req, res) => {
    res.render("users/login");
  },
  authenticate: (req, res) => {
    let inputUser = req.body;

    User
      .findOne({ username: inputUser.username })
      .then(user => {
        if (!user.authenticate(inputUser.password)) {
          res.render("users/login", { globalError: "Invalid username or password" });
        } else {
          req.logIn(user, (err, user) => {
            if (err) {
              res.render("users/login", { globalError: "Ooops 500" });
              return;
            }

            res.redirect("/");
          });
        }
      });
  },
  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  }
};
