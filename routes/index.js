/**
 * Created by Chanawatn Pound on 02-Jun-16.
 */
var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
    res.render('index');
});

router.get('/profile', function(req, res){
    res.render('userprofile');
});

router.get('/main-profile', function(req, res){
    res.render('mainprofile');
});

module.exports = router;