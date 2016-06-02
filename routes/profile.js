/**
 * Created by Chanawatn Pound on 02-Jun-16.
 */
var express = require('express');
var router = express.Router();

// User
router.get('/profile', function(req, res){
    res.render('userprofile');
});

module.exports = router;