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

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

db.on('error', console.error);
db.once('open', function () {
    // Create your schemas and models here.
});

// var Product = mongoose.model('Product', {name: String});
var taste_schema = new mongoose.Schema({
    name: String
});

var Taste = mongoose.model('Taste', taste_schema);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/list", function (req, res) {
    //console.dir(req);
    // Find all movies.
    Taste.find(function (err, tastes) {
        if (err) return console.error(err);
        //console.dir(tastes);
        res.send(tastes);
    })
})

app.post("/add", function (req, res) {
    var name = req.body.name;
    var product = new Taste({name: name});
    product.save(function (err) {
        res.send();
    })
})

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

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