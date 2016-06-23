/**
 * Created by Jaupat Ch on 12-Jun-16.
 */
var app2 = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages']);

var url = "http://localhost:4000";

app2.factory('getFeedbackDishData', ['$http', function ($http) {
    //Create request for User data then send it to other Controller
    //More info http://stackoverflow.com/questions/33843861/why-is-this-factory-returning-a-state-object-instead-of-response-data
    var this_email = "";
    if (localStorage.loginChefAtHomeEmail) {
        this_email = localStorage.loginChefAtHomeEmail;
    } else {
        window.location.href = "http://localhost:4000/"
    }
    return $http.post(url + "/list/feedback_dish")
        .then(function (response) {
            //console.log("hello world");
            //console.log(response.data);
            return response.data;
        });
}]);

var suggestlist1 = [
    "Suggestion for menu",
    "Suggestion for ingredients",
    "Delivery",
    "Service",
    "Food quality",
    "Others"
];

var suggestlist2 = [["Type", "Ingredients"],
    ["Type"],
    [
        "Damaged Package",
        "Delay",
        "Quantity"
    ],
    ["Accuracy of service",
        "Complicate ordering method"
    ],
    ["Product Qualtiy",
        "Not suitable for the menu"],
    ["None"]
];

// (function() {
//
//     'use strict';
//
//     app2.directive('starRating', starRating);
//
//     function starRating() {
//         return {
//             restrict: 'EA',
//             template: '<ul class="star-rating" ng-class="{readonly: readonly}">' +
//             '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
//             '    <i class="fa fa-star"></i>' + // or &#9733
//             '  </li>' +
//             '</ul>',
//             scope: {
//                 ratingValue: '=ngModel',
//                 max: '=?', // optional (default is 5)
//                 onRatingSelect: '&?',
//                 readonly: '=?'
//             },
//             link: function (scope, element, attributes) {
//                 if (scope.max == undefined) {
//                     scope.max = 5;
//                 }
//                 function updateStars() {
//                     scope.stars = [];
//                     for (var i = 0; i < scope.max; i++) {
//                         scope.stars.push({
//                             filled: i < scope.ratingValue
//                         });
//                     }
//                 };
//                 scope.toggle = function (index) {
//                     if (scope.readonly == undefined || scope.readonly === false) {
//                         scope.ratingValue = index + 1;
//                         scope.onRatingSelect({
//                             rating: index + 1
//                         });
//                     }
//                 };
//                 scope.$watch('ratingValue', function (oldValue, newValue) {
//                     if (newValue) {
//                         updateStars();
//                     }
//                 });
//             }
//         };
//     }
// })();

(function(){

    'use strict';

    app2
        .controller('RatingController', RatingController)
        .directive('starRating', starRating);

    var rate = "";

    function RatingController() {
        this.rating1 = 5;
        rate = this.rating1
        this.rating2 = 2;
        this.isReadonly = true;
        this.rateFunction = function(rating) {
            console.log('Rating selected: ' + rating);
        };
    }

    app2.service('sendRatingData', function () {
        var _rate_service = rate

        this.rate_service = _rate_service
    })

    function starRating() {
        return {
            restrict: 'EA',
            template:
            '<ul class="star-rating" ng-class="{readonly: readonly}">' +
            '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
            '    <i class="fa fa-star"></i>' + // or &#9733
            '  </li>' +
            '</ul>',
            scope: {
                ratingValue: '=ngModel',
                max: '=?', // optional (default is 5)
                onRatingSelect: '&?',
                readonly: '=?'
            },
            link: function(scope, element, attributes) {
                if (scope.max == undefined) {
                    scope.max = 5;
                }
                function updateStars() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };
                scope.toggle = function(index) {
                    if (scope.readonly == undefined || scope.readonly === false){
                        scope.ratingValue = index + 1;
                        scope.onRatingSelect({
                            rating: index + 1
                        });
                    }
                };
                scope.$watch('ratingValue', function(oldValue, newValue) {
                    if (newValue) {
                        updateStars();
                    }
                });
            }
        };
    }

})();

app2.controller('MainCtrl', function ($scope, $http, $sce, getFeedbackDishData, sendRatingData) {

    //$scope.rating1 = "";

    // function RatingController() {
    //     this.rating1 = 3;
    //     this.rating2 = 3;
    //     this.isReadonly = true;
    //     this.rateFunction = function(rating) {
    //         console.log('Rating selected: ' + rating);
    //     };
    // }

    console.log("sendRatingData: "+sendRatingData.rate_service)

    $scope.suggests = suggestlist1;
    $scope.suggestdetail = [];
    $scope.getsuggestdetail = function () {
        var key = $scope.suggests.indexOf($scope.option1);
        console.log($scope.suggests);
        var myNewOption = suggestlist2[key];
        $scope.suggestdetail = myNewOption;
        document.getElementById('optiontochoose').style.display = 'block';
    };
    $scope.user = {
        msg: ''
    };

    $scope.appetizer = [];
    $scope.mainDish = [];
    $scope.dessert = [];
    $scope.soup = [];
    $scope.salad = [];

    getFeedbackDishData.then(function (feedback) {
        console.log(feedback)
        for(var i = 0;i<feedback.length;i++){
            console.log(i+ " " +feedback[i].type)
            if(feedback[i].type=="Main Dish"){
                $scope.mainDish.push(feedback[i]);
            }else if(feedback[i].type=="Dessert"){
                $scope.dessert.push(feedback[i]);
            }else if(feedback[i].type=="Appetizer"){
                $scope.appetizer.push(feedback[i]);
            }else if(feedback[i].type=="Soup"){
                $scope.soup.push(feedback[i]);
            }else{
                $scope.salad.push(feedback[i]);
            }
        }
        //console.log("Test data")
        //console.log($scope.mainDish)
        //$scope.get_feedback_data_soup();

    })


    // $scope.get_feedback_data_soup = function () {
    //     var open_table = "<span><table>"
    //     var close_table = "</table></span>"
    //     var data = ""
    //     $scope.full_data_soup = ""
    //     console.log("length: "+$scope.soup.length)
    //
    //     for(var i=0; i<$scope.soup.length;i++){
    //
    //         if(i%2 == 0){
    //             if(i == 0){
    //                 data += "<tr>" +
    //                     "<td>" +
    //                     "<tr>" +
    //                     "<td>" +
    //                     //"<img style='width: 50px; height: 50px;' src="+$scope.soup[i].img[0].data+" />" +
    //                     "</td>" +
    //                     "</tr>" +
    //                     "<tr>" +
    //                     "<td>" +
    //                     //"<paper-radio-group>" +
    //                     "<md-radio-group ng-model='data.group1'>" +
    //                     "<md-radio-button value='"+$scope.soup[i].name+"' class='md-primary'>"+ $scope.soup[i].name +"</md-radio-button>" +
    //                     //"<paper-radio-button name='"+ $scope.soup[i].name +"'>"+ $scope.soup[i].name +"</paper-radio-button>" +
    //                     "</td>" +
    //                     "</tr>" +
    //                     "</td>"
    //             }else{
    //                 data += "<tr>" +
    //                     "<td>" +
    //                     "<tr>" +
    //                     "<td>" +
    //                     //"<img style='width: 50px; height: 50px;' src="+$scope.soup[i].img[0].data+" />" +
    //                     "</td>" +
    //                     "</tr>" +
    //                     "<tr>" +
    //                     "<td>" +
    //                     //<paper-radio-group selected="small">
    //                     "<md-radio-button value='"+$scope.soup[i].name+"' class='md-primary'>"+ $scope.soup[i].name +"</md-radio-button>" +
    //                     //"<paper-radio-button name='"+ $scope.soup[i].name +"'>"+ $scope.soup[i].name +"</paper-radio-button>" +
    //                     "</td>" +
    //                     "</tr>" +
    //                     "</td>"
    //             }
    //
    //         }else{
    //
    //             if(i = ($scope.soup.length)-1){
    //                 data += "<td>" +
    //                     "<tr>" +
    //                     "<td>" +
    //                     //"<img style='width: 50px; height: 50px;' src="+$scope.soup[i].img[0].data+" />" +
    //                     "</td>" +
    //                     "</tr>" +
    //                     "<tr>" +
    //                     "<td>" +
    //                     "<md-radio-button value='"+$scope.soup[i].name+"' class='md-primary'>"+ $scope.soup[i].name +"</md-radio-button>" +
    //                     //"<paper-radio-button name='"+ $scope.soup[i].name +"'>"+ $scope.soup[i].name +"</paper-radio-button>" +
    //                     //"</paper-radio-group>" +
    //                     "</md-radio-group>" +
    //                     "</td>" +
    //                     "</tr>" +
    //                     "</td>" +
    //                     "</tr>"
    //             }else{
    //                 data += "<td>" +
    //                     "<tr>" +
    //                     "<td>" +
    //                     //"<img style='width: 50px; height: 50px;' src="+$scope.soup[i].img[0].data+" />" +
    //                     "</td>" +
    //                     "</tr>" +
    //                     "<tr>" +
    //                     "<td>" +
    //                     "<md-radio-button value='"+$scope.soup[i].name+"' class='md-primary'>"+ $scope.soup[i].name +"</md-radio-button>" +
    //                     //"<paper-radio-button name='"+ $scope.soup[i].name +"'>"+ $scope.soup[i].name +"</paper-radio-button>" +
    //                     "</td>" +
    //                     "</tr>" +
    //                     "</td>" +
    //                     "</tr>"
    //             }
    //
    //         }
    //     }
    //     $scope.full_data_soup = open_table.concat(data).concat(close_table);
    //     console.log($scope.full_data_soup);
    //     $scope.full_data_soup = $sce.trustAsHtml($scope.full_data_soup)
    //     //console.log(full_data_soup)
    //
    // };

    //Initialize Radio Button Data and Rating Data
    $scope.data = {
        group1 : ""
    };

    //Submit Feedback
    $scope.submitFeedback = function () {
        if(!$scope.option1 && !$scope.option2 && $scope.user.msg == ""){
            return 0;
        }else if($scope.user.msg != ""){
            return $http.post(url + "/save/feedback", {
                suggestion: $scope.option1,
                option: $scope.option2,
                message: $scope.user.msg,
                customer: localStorage.loginChefAtHomeEmail,
            }).then(function (response) {
                console.log(response.data);
                $scope.option1 = "";
                $scope.option2 = "";
                $scope.user.msg = "";
            });
        }else{return 0;}
    }

    $scope.data = {
        group1 : ""
    }
    $scope.rating = {
        rating_value : ""
    }
    //method to submit rating
    $scope.submitRating = function (){
        // if dish is not selected

        //else if dish is selected

        console.log("dish selected = " +$scope.data.group1)
        console.log("star selected = " +$scope.rating.rating_value)

    }

})

app2.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})


angular.element(document).ready(function () {
    var myDiv1 = document.getElementById("all_modules");
    angular.bootstrap(myDiv1, ["inputBasicDemo"]);
});