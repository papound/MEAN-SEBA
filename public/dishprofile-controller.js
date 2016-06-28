/**
 * Created by Chanawatn Pound on 02-Jun-16.
 */

var app2 = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages', 'ngAnimate', 'ui.bootstrap', 'material.svgAssetsCache']);

var url = "http://localhost:4000";

// var dish_dialog_name = "";
// var dish_dialog_ingredients = [];
// var dish_dialog_recipe = [];
// var dish_dialog_nutritions = [];

app2.factory('getRecommended', ['$http', function ($http) {

    console.log(localStorage.loginChefAtHomeEmail);

    if (localStorage.loginChefAtHomeEmail) {
        //if already logged in
        //this_email = localStorage.loginChefAtHomeEmail;
    } else {
        //link back to homepage on accessing unauthorized url
        window.location.href = "http://localhost:4000/"
    }
    return $http.get(url + "/list/recommended")
        .then(function (response) {
            //console.log(response.data);
            return response.data;
        });
}]);

// app2.factory('getSpecificDish', ['$http', function ($http) {
//
//     var name = localStorage.getItem('dish_name');
//     console.log("specific_dish: "+name);
//
//
//     return $http.post(url + "/list/one_dish", {name: name})
//         .then(function (response) {
//             //console.log(response.data);
//             return response.data;
//         });
// }]);

app2.factory('getDish', ['$http', function ($http) {

    return $http.get(url + "/list/dish")
        .then(function (response) {
            //console.log(response.data);
            return response.data;
        });
}]);

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

//Test New Rating
app2.directive("angularRatings", function () {
    return {
        restrict: 'E',
        scope: {
            model: '=ngModel'
            //notifyId: '=notifyId'
        },
        replace: true,
        transclude: true,
        template: '<div><ol class="angular-ratings">' + '<li ng-class="{active:model>0,over:over>0}">1</li>' + '<li ng-class="{active:model>1,over:over>1}">2</li>' + '<li ng-class="{active:model>2,over:over>2}">3</li>' + '<li ng-class="{active:model>3,over:over>3}">4</li>' + '<li ng-class="{active:model>4,over:over>4}">5</li>' + '</ol></div>',
        controller: function ($scope, $attrs, $http) {
            $scope.over = 0;
            $scope.setRating = function (rating) {
                $scope.model = rating;
                $scope.$apply();
                // if ($attrs.notifyUrl !== void 0 && $scope.notifyId) {
                //     return $http.post($attrs.notifyUrl, {
                //         id: $scope.notifyId,
                //         rating: rating
                //     }).error(function(data) {
                //         if (typeof data === 'string') {
                //             alert(data);
                //         }
                //         return $scope.model = 0;
                //     });
                // }
            };
            return $scope.setOver = function (n) {
                $scope.over = n;
                return $scope.$apply();
            };
        },
        link: function (scope, iElem, iAttrs) {
            if (iAttrs.notifyUrl !== void 0) {
                return angular.forEach(iElem.children(), function (ol) {
                    return angular.forEach(ol.children, function (li) {
                        li.addEventListener('mouseover', function () {
                            return scope.setOver(parseInt(li.innerHTML));
                        });
                        li.addEventListener('mouseout', function () {
                            return scope.setOver(0);
                        });
                        return li.addEventListener('click', function () {
                            return scope.setRating(parseInt(li.innerHTML));
                        });
                    });
                });
            }
        }
    };
});
//End Test New Rating

(function () {
    //'use strict';

    angular
        .module('app', [])
        .controller('RatingController', RatingController)
        .directive('starRating', starRating);

    function RatingController() {
        this.rating1 = 5;
        this.rating2 = 2;
        this.isReadonly = true;
        this.rateFunction = function (rating) {
            console.log('Rating selected: ' + rating);
        };
    }

    function starRating() {
        return {
            restrict: 'EA',
            template: '<ul class="star-rating" ng-class="{readonly: readonly}">' +
            '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
            '    <i class="fa fa-star"></i>' + // or &#9733
            '  </li>' +
            '</ul>',
            scope: {
                ratingValue: '=?',
                max: '=?', // optional (default is 5)
                onRatingSelect: '&?',
                readonly: '=?'
            },
            link: function (scope, element, attributes) {
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
                scope.toggle = function (index) {
                    if (scope.readonly == undefined || scope.readonly === false) {
                        scope.ratingValue = index + 1;
                        scope.onRatingSelect({
                            rating: index + 1
                        });
                    }
                };
                scope.$watch('ratingValue', function (oldValue, newValue) {
                    if (newValue) {
                        updateStars();
                    }
                });
            }
        };
    }
})();

app2.controller('MainCtrl', ['$scope', 'getRecommended', 'getDish', 'getFeedbackDishData', '$mdDialog', '$http',
    function ($scope, getRecommended, getDish, getFeedbackDishData, $mdDialog, $http, $rootScope, $timeout, $modal) {

        $scope.dish_only_name = [];
        $scope.dish_recommended = [];

        $scope.dish1 = "";
        $scope.dish2 = "";
        $scope.dish3 = "";
        $scope.dish4 = "";

        //Dish Information
        $scope.dish_dialog_name = "";
        $scope.dish_dialog_ingredients = [];
        $scope.dish_dialog_recipe = [];
        $scope.dish_dialog_nutritions = [];

        //Dish Categories
        $scope.appetizer = [];
        $scope.mainDish = [];
        $scope.dessert = [];
        $scope.soup = [];
        $scope.salad = [];

        getDish.then(function (dish_name) {
            $scope.dish_only_name = dish_name;
            console.log($scope.dish_only_name);
            getRecommended.then(function (order) {
                //console.log("hi");
                for (var i = 0; i < order.length; i++) {
                    //console.log("status=" + order[i].status);
                    for (var j = 0; j < (order[i].orderItems).length; j++) {
                        // if it is a dish

                        if ($scope.dish_only_name.indexOf(order[i].orderItems[j].name) > -1) {
                            //console.log("Ihis is a dish = " + order[i].orderItems[j].name);

                            var push_obj = {
                                dishName: order[i].orderItems[j].name,
                                frequency: 1
                            };

                            if ($scope.dish_recommended.length == 0) {
                                //push first obj in to array
                                $scope.dish_recommended.push(push_obj);
                                //console.log($scope.dish_recommended);
                            } else {

                                var a = 0;
                                var flag = true;
                                while (flag && (a < $scope.dish_recommended.length)) {
                                    if ($scope.dish_recommended[a].dishName == order[i].orderItems[j].name) {
                                        //duplicate dish name --> update frequency
                                        console.log("a=" + $scope.dish_recommended[a].dishName);
                                        console.log("b=" + order[i].orderItems[j].name);
                                        $scope.dish_recommended[a].frequency += 1;
                                        console.log($scope.dish_recommended[a].frequency);
                                        flag = false;
                                    }
                                    a++; //increment to loop the whole array
                                }
                                if (flag) {
                                    //console.log("c="+$scope.dish_recommended[a].dishName);
                                    //console.log("d="+order[i].orderItems[j].name);
                                    //add other object in to array
                                    $scope.dish_recommended.push(push_obj);
                                }

                            }
                        }
                    }
                }
                console.log($scope.dish_recommended);
                function sort_freq(a, b) {
                    if (a.frequency > b.frequency) {
                        return -1;
                    }
                    if (a.frequency < b.frequency) {
                        return 1;
                    }
                    return 0;
                }

                $scope.dish_recommended.sort(sort_freq);
                console.log($scope.dish_recommended);


                getFeedbackDishData.then(function (dish) {

                    for(var i = 0;i<dish.length;i++){
                        console.log(i+ " " +dish[i].type);
                        if(dish[i].type=="Main Dish" || dish[i].type=="main dish"){
                            $scope.mainDish.push(dish[i]);
                        }else if(dish[i].type=="Dessert" || dish[i].type=="dessert"){
                            $scope.dessert.push(dish[i]);
                        }else if(dish[i].type=="Appetizer" || dish[i].type=="appetizer"){
                            $scope.appetizer.push(dish[i]);
                        }else if(dish[i].type=="Soup" || dish[i].type=="soup"){
                            $scope.soup.push(dish[i]);
                        }else if(dish[i].type=="Salad" || dish[i].type=="salad"){
                            $scope.salad.push(dish[i]);
                        }
                    }

                    console.log("Appetizer"+$scope.appetizer);

                    for (var i = 0; i < dish.length; i++) {

                        if (dish[i].name == $scope.dish_recommended[0].dishName) {
                            $scope.dish1 = dish[i];
                            $scope.dish1.rating = Math.ceil($scope.dish1.rating);
                        }
                        if (dish[i].name == $scope.dish_recommended[1].dishName) {
                            $scope.dish2 = dish[i];
                            $scope.dish2.rating = Math.ceil($scope.dish2.rating);
                        }
                        if (dish[i].name == $scope.dish_recommended[2].dishName) {
                            $scope.dish3 = dish[i];
                            $scope.dish3.rating = Math.ceil($scope.dish3.rating);
                        }
                        if (dish[i].name == $scope.dish_recommended[3].dishName) {
                            $scope.dish4 = dish[i];
                            $scope.dish4.rating = Math.ceil($scope.dish4.rating);
                        }
                    }
                    console.log($scope.dish1);
                    console.log($scope.dish2);
                    console.log($scope.dish3);
                    console.log($scope.dish4);

                })

            });

        });

        //Test New Ratings
        $scope.user_rating = '';
        //End

        //New Ratings 2
        $scope.rate = '';
        $scope.max = 5;
        $scope.isReadonly_rating = true;

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];
        //End

        //Test Tab Dialog
        $scope.status = '';
        //$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

        //Call after click the dish
        $scope.showTabDialog = function (ev, name) {

            console.log("name: " + name);

            localStorage.removeItem('dish_name');

            //Get Nutrition Fact, Ingredients, Recipe

            getSpecificDish(name);

            function getSpecificDish(name) {

                var specific_name = name;

                $scope.dish_dialog_name = name;

                return $http.post(url + "/list/one_dish", {name: specific_name})
                    .then(function (response) {
                        //console.log(response.data);
                        $scope.dish_dialog_name = response.data.name;
                        $scope.dish_dialog_ingredients = response.data.ingredients;
                        $scope.dish_dialog_recipe = response.data.recipe;
                        $scope.dish_dialog_nutritions = response.data.nutritions;

                        //console.log($scope.dish_dialog_ingredients);

                        $mdDialog.show({
                            //controller: DialogController,
                            templateUrl: 'tabDialog.tmpl.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            locals: {
                                dishName: name,
                                dishIngredients: $scope.dish_dialog_ingredients,
                                dishRecipe: $scope.dish_dialog_recipe,
                                dishNutritions: $scope.dish_dialog_nutritions
                            },
                            controller: ['$scope', 'dishName', 'dishIngredients', 'dishRecipe', 'dishNutritions', '$mdDialog',
                                function ($scope, dishName, dishIngredients, dishRecipe, dishNutritions, $mdDialog) {
                                    $scope.dishName = dishName;
                                    $scope.dishIngredients = dishIngredients;
                                    $scope.dishRecipe = dishRecipe;
                                    $scope.dishNutritions = dishNutritions;

                                    $scope.hide = function () {
                                        $mdDialog.hide();
                                    };

                                    $scope.cancel = function () {
                                        $mdDialog.cancel();
                                    };

                                    $scope.answer = function (answer) {
                                        $mdDialog.hide(answer);
                                    };

                                }]
                        }).then(function (answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            $scope.status = 'You cancelled the dialog.';
                        });

                    });
            }

        };
        //End

    }]);


app2.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})

    .config(function ($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });

angular.element(document).ready(function () {
    var myDiv1 = document.getElementById("all_modules");
    // angular.bootstrap(myDiv1, ["inputBasicDemo", "rzSliderDemo"]);
    angular.bootstrap(myDiv1, ["inputBasicDemo"]);
});

