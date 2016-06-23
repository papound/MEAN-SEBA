/**
 * Created by Chanawatn Pound on 21-Jun-16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Schema defines how the user data will be stored in MongoDB
var OrderSchema = new mongoose.Schema({
    dateTime: {
        type: Date,
        default: Date.now
    },
    status : {
        type: String,
        default: "Confirmed"
    },
    totalPrice : {
        type: Number,
        default: null
    },
    orderItems : {
        type: [],
        default: null
    },
    paymentType : {
        type: String,
        default: "Cash"
    },
    paymentStatus : {
        type: Boolean,
        default: false
    },
    customer : {
        type: String,
        default: "a@b.com"
    }
});

module.exports = mongoose.model('Order', OrderSchema, 'order');