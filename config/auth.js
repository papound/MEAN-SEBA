// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '850042957038-3l9423np2uqruaplafluttpmengct984.apps.googleusercontent.com',
        'clientSecret'  : 'aRIa9uoBj-JJMEJhYN9D8_3y',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};