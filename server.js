var express = require('express');
var path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require('passport');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var config = require('./config/database');
var User = require('./user');

mongoose.connect(config.database);

// var routes = require('./routes/index');
//https://www.youtube.com/watch?v=Z1ktxiqyiLA

 //Init App
var app = express();
app.use(cors());
app.use(bodyParser());

//For Authentication
// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));

// pass passport for configuration
require('./config/passport')(passport);

var routes = require('./routes/index')(app);

//var for index-8.html

var db_model = mongoose.model('Nutrition', new mongoose.Schema({ name: String }),
    'taste');
//var user_model = mongoose.model('User', new mongoose.Schema({ firstname: String }),'user');

app.get("/list/database", function(req, res) {
    // Locate all the entries using find
    db_model.find( function(err, results) {
        //Getting Results
        res.send(results);
    });
})

app.get("/list/user", function(req, res) {
    // Locate all the entries using find
    //var req_email = req.body.email;
    User.find( function(err, results) {
        //Getting Results
        res.send(results);
        // Close the db
        //db.close();
    });
})

app.post("/add", function (req, res) {
    var taste = db.collection('taste');
    var req_name = req.body.name;
    taste.insert({ name: req_name }, function (err, result) {
        res.send(result);
        console.log("Success");
    })
})

app.post("/list/user", function(req, res) {
    // Locate all the entries using find
    var req_email = req.body.email;
    User.find({email: req_email}, function(err, results) {
        //Getting Results
        res.send(results);
        // Close the db
        //db.close();
    });
})

//View Engine
app.set('views', path.join(__dirname, 'views'));
//app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// bundle our routes
var apiRoutes = express.Router();

// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        // console.log(req.body.username)
        // console.log(req.body.password)
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                console.log(err)
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

// connect the api routes under /api/*
app.use('/api', apiRoutes);


// Set Port
app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function () {
    console.log('Server runs at port: ' + app.get('port'));
});