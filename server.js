var express = require('express');
var path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy
var mongo = require("mongodb");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/seba-webapp');
var db = mongoose.connection;

var routes = require('./routes/index');

//https://www.youtube.com/watch?v=Z1ktxiqyiLA

//Init App
var app = express();
app.use(cors());
app.use(bodyParser());

db.on('error', console.error);
db.once('open', function () {
    // Create your schemas and models here.
});

var taste_schema = new mongoose.Schema({
    name: String
});

var Taste = mongoose.model('Taste', taste_schema);

app.get("/list/tastes", function(req, res) {

    var taste_collection = db.collection('Nutrition');

    // Locate all the entries using find
    taste_collection.find().toArray(function(err, results) {
        res.send(results);
        // Let's close the db
        db.close();
    });

})

app.post("/add/tastes", function (req, res) {
    var taste = db.collection('Taste');
    taste.insert({name: "Pound555"}, function (err, result) {
        res.send(result);
        console.log("Success");
    })
})

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', routes);
app.use('/profile', routes);

// Set Port
app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function () {
    console.log('Server runs at port: ' + app.get('port'));
});