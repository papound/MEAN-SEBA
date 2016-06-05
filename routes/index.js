/**
 * Created by Chanawatn Pound on 02-Jun-16.
 */
//Old Version
// var express = require('express');
// var router = express.Router();
//
// // Get Homepage
// router.get('/', function(req, res){
//     res.render('index');
// });
//
// router.get('/profile', function(req, res){
//     res.render('userprofile');
// });
//
// router.get('/main-profile', function(req, res){
//     res.render('mainprofile');
// });
//
// module.exports = router;
//End Old Version


//New Version

// var bodyParser = require("body-parser");
// var app = express();
// app.use(cors());
// app.use(bodyParser());

module.exports = function(app, passport) {

    //app = express.Router();
    // Get Homepage
    app.get('/', function(req, res){
        res.render('index.ejs');
    });

    app.get('/profile', function(req, res){
        res.render('userprofile.ejs');
    });

    app.get('/main-profile', function(req, res){
        res.render('mainprofile.ejs');
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/main-profile/user/', isLoggedIn, function(req, res) {
        res.render('mainprofile', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // facebook routes
    // twitter routes

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

