/**
 * Created by Chanawatn Pound on 06-Jun-16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Schema defines how the user data will be stored in MongoDB
var UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    },
    email: String,
    password: String,
    birthdate: {
        type: Date,
        default: Date.now
    },
    telephone: {
        type: String,
        default: ""
    },
    height: {
        type: Number,
        default: 100 + Math.floor((Math.random() * 100) + 1)
    },
    weight: {
        type: Number,
        default: 20 + Math.floor((Math.random() * 80) + 1)
    },
    address: {
        type: [],
        default: [{address1: "Address1"}, {address2: "Address2"}, {city: "City"}, {postalcode: "Postal Code"}]
    },
    imageurl: {
        type: String,
        default: ""
    },
    vegetarian: {
        type: Boolean,
        default: ""
    },
    halal: {
        type: Boolean,
        default: ""
    },
    tastePreference: {
        type: [],
        default: null
    },
    tasteDisfavor: {
        type: [],
        default: null
    },
    healthCond: {
        type: [],
        default: null
    },
    noIngredient: {
        type: [],
        default: null
    },
    nutritionPreference: {
        type: [],
        default: null
    },
    nutritionRange: {
        type: [],
        default: [
            {
                maxValue : 2000 + Math.floor((Math.random() * 1000) + 1),
                minValue : 1900 + Math.floor((Math.random() * 100) + 1),
                name : "Calories"
            },
            {
                maxValue: 70,
                minValue: 40,
                name: "Proteins"
            },
            {
                maxValue: 450,
                minValue: 250,
                name: "Carbohydrates"
            },
            {
                maxValue: 70,
                minValue: 60,
                name: "Fats"
            },
            {
                maxValue: 0,
                minValue: 0,
                name: "Cholesterols"
            }
        ]
    },
    cardNumber: {
        type: String,
        default: ""
    },
    validityDate: {
        type: Date,
        default: Date.now
    }
});

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(8, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema, 'user');
//module.exports = mongoose.model('Taste', new mongoose.Schema({ name: String }), 'taste');