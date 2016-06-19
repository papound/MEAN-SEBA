/**
 * Created by Jaupat Ch on 12-Jun-16.
 */
var app2 = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages']);

var url = "http://localhost:4000";

(function() {
    'use strict';

    app2
        .controller('RatingController', RatingController)
        .directive('starRating', starRating);

    function RatingController() {
        this.rating1 = 3;
        this.rating2 = 3;
        this.isReadonly = true;
        this.rateFunction = function(rating) {
            console.log('Rating selected: ' + rating);
        };
    }

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

app2.controller('MainCtrl', function ($scope) {
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


    // $scope.showSuccess = function (firstname, email) {
    //
    //     var dialog = document.getElementById("regis-success");
    //     if (dialog) {
    //         dialog.open();
    //     }
    // }


})



app2.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})


angular.element(document).ready(function () {
    var myDiv1 = document.getElementById("all_modules");
    angular.bootstrap(myDiv1, ["inputBasicDemo"]);
});