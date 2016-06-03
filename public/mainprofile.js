/**
 * Created by Pimprapai on 03-06-16.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/seba-webapp');
var db = mongoose.connection;

var db_model = mongoose.model('Nutrition', new mongoose.Schema({ _id: Number, name: String }),
    'taste');

var user_module = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages']);

user_module.controller('MailCtrl', function ($scope) {
    $scope.email = function () {
        db
    };
})