/**
 * Created by Chanawatn Pound on 02-Jun-16.
 */
module.exports = function(app) {

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

    app.get('/register', function(req, res){
        res.render('register.ejs');
    });

};
