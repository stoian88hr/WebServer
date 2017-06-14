const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

let schema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    weight: {
        required: true,
        type: Number
    },
    height: {
        required: true,
        type: Number
    },
    result: {
        required: true,
        type: []
    }
});
mongoose.model("HumanDb", schema);
module.exports = mongoose.model("HumanDb");