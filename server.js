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
var db = mongoose.connection;
var User = require('./user');
var bcrypt = require('bcryptjs');

//mongoose.connect('mongodb://localhost/seba-webapp');


mongoose.connect(config.database);

// var routes = require('./routes/index');
//https://www.youtube.com/watch?v=Z1ktxiqyiLA

//Init App
var app = express();
app.use(cors());
app.use(bodyParser({limit: '50mb'}));

//For Authentication
// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));

// pass passport for configuration
require('./config/passport')(passport);

var routes = require('./routes/index')(app);

//var for index-8.html

var db_model = mongoose.model('Taste', new mongoose.Schema({name: String}), 'taste');
//var user_model = mongoose.model('User', new mongoose.Schema({ firstname: String }),'user');

app.get("/list/database", function (req, res) {
    // Locate all the entries using find
    db_model.find(function (err, results) {
        //Getting Results
        res.send(results);
    });
})

app.get("/list/user", function (req, res) {
    // Locate all the entries using find
    //var req_email = req.body.email;
    User.find(function (err, results) {
        //Getting Results
        res.send(results);
        // Close the db
        //db.close();
    });
})

app.post("/add", function (req, res) {
    var taste = db.collection('taste');
    var req_name = req.body.name;
    taste.insert({name: req_name}, function (err, result) {
        res.send(result);
        console.log("Success");
    })
})

app.post("/list/user", function (req, res) {
    // Locate all the entries using find
    var req_email = req.body.email;
    User.find({email: req_email}, function (err, results) {
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

// create a new user account (POST http://localhost:8080/api/register)
apiRoutes.post('/register', function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        // console.log(req.body.username)
        // console.log(req.body.password)
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            telephone: req.body.telephone,
            address: [{address1: req.body.address1}, {address2: req.body.address2}, {city: req.body.city}, {postalcode: req.body.postalcode}]
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                console.log(err)
                return res.json({success: false, msg: 'Username already exists.'});
            }
            return res.json({success: true, msg: 'Successful created new user.'});

        });
    }
});

apiRoutes.post('/update/profile', function (req, res) {

    //console.log(req.body)

    var salt = bcrypt.genSaltSync(8);
    var pass_hashed = bcrypt.hashSync(req.body.password, salt);

    //console.log(pass_hashed)

    var user_collection = db.collection('user')
    user_collection.update({email: req.body.email}, {
        
        $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: pass_hashed,
            birthdate: req.body.birthdate,
            height: req.body.height,
            weight: req.body.weight,
            imageurl: req.body.imageurl,
            profilePicture: {
                data: req.body.profilePicture,
                contentType: "image/jpeg"
            },
            vegetarian: req.body.vegetarian,
            halal: req.body.halal,
            address: [
                {
                    address1: req.body.address1
                },
                {
                    address2: req.body.address2
                },
                {
                    city: req.body.city
                },
                {
                    postalcode: req.body.postalcode
                }
            ],
            cardNumber: req.body.cardNumber,
            cvc: req.body.cvc,
            validityDate: req.body.validityDate,
            nutritionRange: [
                {
                    name: "Calories",
                    minValue: req.body.nutritionRange[0].minValue,
                    maxValue: req.body.nutritionRange[0].maxValue
                },
                {
                    name: "Proteins",
                    minValue: req.body.nutritionRange[1].minValue,
                    maxValue: req.body.nutritionRange[1].maxValue
                },
                {
                    name: "Carbohydrates",
                    minValue: req.body.nutritionRange[2].minValue,
                    maxValue: req.body.nutritionRange[2].maxValue
                },
                {
                    name: "Fats",
                    minValue: req.body.nutritionRange[3].minValue,
                    maxValue: req.body.nutritionRange[3].maxValue
                },
                {
                    name: "Cholesterols",
                    minValue: req.body.nutritionRange[4].minValue,
                    maxValue: req.body.nutritionRange[4].maxValue
                }
            ]
        }
    }, function(err){
        if (err) {
            console.log("Error!")
            res.json({success: false, msg: 'Error created new user.'});
        } else {
            console.log("Success!")
            res.json({success: true, msg: 'Successfully created new user.'});
        }
    })
})
;

apiRoutes.post('/authenticate', function (req, res) {
    console.log(req.body.email)
    console.log(req.body.password)
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    res.send({success: "true", token: 'JWT ' + token, firstname: ""+user.firstname });
                    //localStorage.token = "JWT "+token;
                } else {
                    res.send({success: "false", msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

apiRoutes.get('/memberinfo', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            email: decoded.email
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, msg: 'Welcome to Chef@Home! ' + user.email + '!'});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

apiRoutes.get('/main-profile', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            email: decoded.email
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, msg: 'Welcome to Chef@Home! ' + user.firstname + '!'});
                // res.render('mainprofile.ejs');
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

// Protect dashboard route with JWT
apiRoutes.get('/dashboard', passport.authenticate('jwt', {session: false}), function (req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

// connect the api routes under /api/*
app.use('/api', apiRoutes);


// Set Port
app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function () {
    console.log('Server runs at port: ' + app.get('port'));
});