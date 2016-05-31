var express = require('express');
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser());
var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function () {
    // Create your schemas and models here.
});

mongoose.connect('mongodb://localhost/seba-webapp');

// var Product = mongoose.model('Product', {name: String});
var taste_schema = new mongoose.Schema({
    name: String
});

var Taste = mongoose.model('Taste', taste_schema);

app.use(express.static('public'));

app.get("/list", function (req, res) {
    //console.dir(req);
    // Find all movies.
    Taste.find(function (err, tastes) {
        if (err) return console.error(err);
        console.dir(tastes);
        res.send(tastes);
    })
})


app.post("/add", function (req, res) {
    var name = req.body.name;
    var product = new Product({name: name});
    product.save(function (err) {
        res.send();
    })
})

app.listen(4000, function () {
    console.log("Server runs at port: 4000")
});