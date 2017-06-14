'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
let Human = require("./models/human-model");
mongoose.connect("mongodb://localhost/humans");
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/libs", express.static(path.join(__dirname, "public")));
// setup engine
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//home page
app.get("/", (req, res) => {
    res.render("index");
});
let humansRouter = new express.Router();
//GET
humansRouter.get("/", (req, res) => {
        Human.find((err, humans) => {
            res.render("humans-list", {
                result: humans
            });
        });
    }).get("/create", (req, res) => {
        res.render("human-create");
    }).get("/:id", (req, res) => {
        Human.findOne({
            _id: req.params.id
        }, (err, humans) => {
            res.render("human-deatails", {
                result: humans
            });
        });
    })
    // POST
    .post("/", (req, res) => {
        let bmi = new Human(req.body);
        bmi.save((err) => {
            res.redirect("/bmi");
        });
    });
//route
app.use("/bmi", humansRouter);
const port = 3003;
app.listen(port, () => {
    console.log(`App running at :${port}`);
});