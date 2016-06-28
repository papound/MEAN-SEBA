/**
 * Created by Chanawatn Pound on 02-Jun-16.
 */
module.exports = function(app) {

    //app = express.Router();
    // Get Homepage
    app.get('/', function(req, res){
        res.render('index.ejs');
    });

    /*app.get('/profile', function(req, res){
        res.render('userprofile.ejs');
    });*/

    app.get('/main-profile', function(req, res){
        res.render('mainprofile.ejs');
    });

    app.get('/register', function(req, res){
        res.render('register.ejs');
    });

    app.get('/order', function(req, res){
        res.render('order.ejs');
    });

    app.get('/feedback', function(req, res){
        res.render('feedback.ejs');
    });

    app.get('/dish-profile', function(req, res){
        res.render('dishprofile.ejs');
    });

    app.get('/search', function(req, res){
        res.render('search.ejs');
    });
};
