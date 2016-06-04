/**
 * Created by Chanawatn Pound on 02-Jun-16.
 */
var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
    res.render('index');
});

//Get Edit Profile Page
router.get('/profile', function(req, res){
    res.render('userprofile');
});

// Get Registration Page
router.get('/register', function(req, res){
    res.render('newuser');
});

module.exports = router;