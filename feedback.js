/**
 * Created by Jatupat Chaiprasert on 20-Jun-16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var FeedbackSchema = new mongoose.Schema({
    customer: {
        type: String,
        default: ""
    },
    suggestion:{
        type: String,
        default: ""
    },
    option:{
        type: String,
        default: ""
    },
    message:{
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema, 'feedback');
//module.exports = mongoose.model('Taste', new mongoose.Schema({ name: String }), 'taste');