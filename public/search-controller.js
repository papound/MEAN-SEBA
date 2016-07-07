/**
 * Created by Jatupat Ch on 16-Jun-16.
 */
var app2 = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages', 'ion.rangeslider', 'ngAnimate', 'ui.bootstrap', 'material.svgAssetsCache']);

var url = "http://localhost:4000";

var notLogin = false;

if (!localStorage.loginChefAtHomeEmail) {
    notLogin = true;
    console.log('not logged in')
} else {
    console.log("logged in " + localStorage.loginChefAtHomeEmail)
}

app2.factory('getUserData', ['$http', function ($http) {
    //Create request for User data then send it to other Controller
    //More info http://stackoverflow.com/questions/33843861/why-is-this-factory-returning-a-state-object-instead-of-response-data
    var this_email = "";

    if (localStorage.loginChefAtHomeEmail) {
        this_email = localStorage.loginChefAtHomeEmail;
    } else {
        //window.location.href = "http://localhost:4000/"
    }
    return $http.post(url + "/list/user", {email: this_email})
        .then(function (response) {
            return response.data;
        });
}]);

app2.controller('loginCtrl', ['$scope', '$http', function ($scope, $http) {

    console.log(localStorage.loginChefAtHomefirstname);

    $scope.firstname = localStorage.loginChefAtHomefirstname;

    $scope.signout = function () {
        console.log("email before signout=" + localStorage.loginChefAtHomeEmail);
        localStorage.removeItem('loginChefAtHomeEmail');
        console.log("email after signout=" + localStorage.loginChefAtHomeEmail);
        //localStorage.removeItem('current_ingredient');
        setTimeout(1000);
        window.location.href = "http://localhost:4000/"
    };

    $scope.openProfile = function () {
        setTimeout(1000);
        window.location.href = "http://localhost:4000/main-profile"
    };

    $scope.login = function () {

        if ($scope.user.email == "" || $scope.user.password == "") {
            $scope.showFailed("Incomplete Credentials!");
        } else {
            //alert("Ready to Submit!");
            return $http.post(url + "/api/authenticate", {
                email: $scope.user.email,
                password: $scope.user.password
            }).then(function (response) {
                if (response.data.success == "true") {
                    console.log(response.data.success);
                    localStorage.loginChefAtHomeEmail = $scope.user.email;
                    localStorage.loginChefAtHomefirstname = response.data.firstname;
                    localStorage.jwtChefAtHome = response.data.token;
                    window.location.href = "http://localhost:4000"
                    //console.log("LocalStorage: " + localStorage.loginChefAtHomeEmail);
                } else {
                    $scope.showFailed("Login Failed");
                    $scope.user.email = ''
                    $scope.user.password = ''
                }

            });
        }
    }

    $scope.showFailed = function (err) {
        if (err == "Incomplete Credentials!") {

            var dialog = document.getElementById("incomplete");
            if (dialog) {
                dialog.open();
            }

        } else {
            var dialog = document.getElementById("login-failed");
            if (dialog) {
                dialog.open();
            }
        }
    };

    $scope.closeDialog = function () {
        var dialog = document.getElementById("dialog");
        if (dialog) {
            dialog.close();
        }
    };

}]);

app2.factory('getIngredients', ['$http', function ($http) {
    //Create request for User data then send it to other Controller
    //More info http://stackoverflow.com/questions/33843861/why-is-this-factory-returning-a-state-object-instead-of-response-data
    return $http.get(url + "/ingredients")
        .then(function (response) {
            return response.data;
        });
}]);

app2.factory('getRecommended', ['$http', function ($http) {

    console.log(localStorage.loginChefAtHomeEmail);

    return $http.get(url + "/list/recommended")
        .then(function (response) {
            //console.log(response.data);
            return response.data;
        });
}]);
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
        //window.location.href = "http://localhost:4000/"
    }
    return $http.post(url + "/list/feedback_dish")
        .then(function (response) {
            return response.data;
        });
}]);

app2.factory('getSuggestedDishData', ['$http', function ($http) {
    //Create request for User data then send it to other Controller
    //More info http://stackoverflow.com/questions/33843861/why-is-this-factory-returning-a-state-object-instead-of-response-data
    var this_email = "";
    if (localStorage.loginChefAtHomeEmail) {
        this_email = localStorage.loginChefAtHomeEmail;
    } else {
        //window.location.href = "http://localhost:4000/"
    }
    return $http.post(url + "/list/feedback_dish")
        .then(function (response) {
            return response.data;
        });
}]);
app2.factory('getDishDataByPrice', ['$http', function ($http) {
    //Create request for User data then send it to other Controller
    //More info http://stackoverflow.com/questions/33843861/why-is-this-factory-returning-a-state-object-instead-of-response-data
    var this_email = "";
    if (localStorage.loginChefAtHomeEmail) {
        this_email = localStorage.loginChefAtHomeEmail;
    } else {
        //window.location.href = "http://localhost:4000/"
    }
    return $http.post(url + "/list/feedback_dish")
        .then(function (response) {
            return response.data;
        });
}]);

app2.factory('getUserData', ['$http', function ($http) {
    //Create request for User data then send it to other Controller
    //More info http://stackoverflow.com/questions/33843861/why-is-this-factory-returning-a-state-object-instead-of-response-data
    //localStorage.loginChefAtHomeEmail = "chanawatnpound@gmail.com"
    var this_email = "";

    if (localStorage.loginChefAtHomeEmail) {
        //if already logged in
        this_email = localStorage.loginChefAtHomeEmail;
    } else {
        //link back to homepage on accessing unauthorized url
        //window.location.href = "http://localhost:4000/"
    }
    return $http.post(url + "/list/user", {email: this_email})
        .then(function (response) {
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

//var to localStorage
//localStorage.setItem('current_dish', JSON.stringify(current_dish));
var retrieve_dish = localStorage.getItem('current_dish');  //String
console.log('local_current_dish: ', JSON.parse(retrieve_dish));

//localStorage.setItem('current_ingredient', JSON.stringify(current_ingredient));
var retrieve_ingredient = localStorage.getItem('current_ingredient'); //String
console.log('local_current_ingredient: ', JSON.parse(retrieve_ingredient));
//End var to localStorage


app2.controller('MainCtrl', ['$scope', 'getUserData', 'getRecommended', 'getDish', 'getFeedbackDishData', 'getSuggestedDishData', 'getDishDataByPrice', 'getIngredients', '$mdDialog', '$http', '$mdToast', '$document',
    function ($scope, getUserData, getRecommended, getDish, getFeedbackDishData, getSuggestedDishData, getDishDataByPrice, getIngredients, $mdDialog, $http, $mdToast, $document, $route, $rootScope, $timeout, $modal) {

        $scope.dish_only_name = [];
        $scope.dish_recommended = [];

        $scope.dish1 = "";
        $scope.dish2 = "";
        $scope.dish3 = "";
        $scope.dish4 = "";

        //TypeVeg
        $scope.dish1_typeveg = "";
        $scope.dish2_typeveg = "";
        $scope.dish3_typeveg = "";
        $scope.dish4_typeveg = "";

        //TypeVeg
        $scope.dish1_typedairy = "";
        $scope.dish2_typedairy = "";
        $scope.dish3_typedairy = "";
        $scope.dish4_typedairy = "";

        //Dish Information
        $scope.dish_dialog_name = "";
        $scope.dish_dialog_ingredients = [];
        $scope.dish_dialog_recipe = [];
        $scope.dish_dialog_nutritions = [];
        $scope.dish_dialog_utensils = [];

        //Dish Categories
        $scope.appetizer = [];
        $scope.mainDish = [];
        $scope.dessert = [];
        $scope.soup = [];
        $scope.salad = [];

        //UserData
        $scope.user = {
            vegetarian: "",
            halal: "",
            healthCond: null,
            noIngredient: null,
            tastePreference: null,
            sweet: "",
            sour: "",
            bitter: "",
            spicy: "",
            salty: ""
        };

        //SuggestedData
        $scope.suggested_real = [];
        $scope.best = {
            one: "",
            two: "",
            three: "",
            four: ""
        };
        $scope.best1_typeveg = "";
        $scope.best2_typeveg = "";
        $scope.best3_typeveg = "";
        $scope.best4_typeveg = "";

        $scope.best1_typedairy = "";
        $scope.best2_typedairy = "";
        $scope.best3_typedairy = "";
        $scope.best4_typedairy = "";

        //Get Dish by Price
        $scope.priceRange = [1, 19];
        $scope.price_order = "";

        $scope.formStatus = true;
        //Slider
        var vm = this;
        //Minimal slider config
        $scope.minSlider = {
            value: 10
        };
        //Slider config with custom display function
        $scope.calories = {
            ceil: 4000,
            floor: 0,
            translate: function (value) {
                return value;
            },
            calories_range: []
        };

        $scope.proteins = {
            ceil: 200,
            floor: 0,
            translate: function (value) {
                return value;
            },
            proteins_range: []
        };

        $scope.carb = {
            ceil: 1000,
            floor: 0,
            translate: function (value) {
                return value;
            },
            carb_range: []
        };

        $scope.fats = {
            ceil: 100,
            floor: 0,
            translate: function (value) {
                return value;
            },
            fats_range: []
        };

        $scope.cholesterols = {
            ceil: 300,
            floor: 0,
            translate: function (value) {
                return value;
            },
            cholesterols_range: []
        };

        $scope.full_ingredients_str = "";

        $scope.printDefaultPref = function () {
            console.log($scope.defaultPref);
        };


        //Side Navbar
        $scope.sweet = "";
        $scope.sour = "";
        $scope.bitter = "";
        $scope.spicy = "";
        $scope.salty = "";

        $scope.defaultPref = false;

        if (localStorage.defaultPref) {

            //noinspection JSAnnotator
            function checkBool(str) {
                if (str == 'true') {
                    return true;
                } else {
                    return false;
                }
            }

            $scope.defaultPref = checkBool(localStorage.defaultPref);
        } else {
            $scope.defaultPref = false;
        }

        $scope.notLogin_mainctrl = false;

        //Check User Login

        if (notLogin == true) {

            //User hasn't logged in

            $scope.notLogin_mainctrl = true;

            //Check if user has already searched or not

            if (localStorage.defaultPref != null) {

                $scope.notLogin_mainctrl = true;

                console.log("second_time");

                //noinspection JSAnnotator
                function checkBool(str) {
                    if (str == 'true') {
                        return true;
                    } else {
                        return false;
                    }
                }

                //User had searched at least once

                if (checkBool(localStorage.defaultPref)) {
                    //override default data -- use data from side bar

                    //Set Nutrition
                    $scope.calories.minValue = parseInt(localStorage.calMin);
                    $scope.calories.maxValue = parseInt(localStorage.calMax);
                    $scope.proteins.minValue = parseInt(localStorage.proMin);
                    $scope.proteins.maxValue = parseInt(localStorage.proMax);
                    $scope.carb.minValue = parseInt(localStorage.carbMin);
                    $scope.carb.maxValue = parseInt(localStorage.carbMax);
                    $scope.fats.minValue = parseInt(localStorage.fatsMin);
                    $scope.fats.maxValue = parseInt(localStorage.fatsMax);
                    $scope.cholesterols.minValue = parseInt(localStorage.cholMin);
                    $scope.cholesterols.maxValue = parseInt(localStorage.cholMax);

                    $scope.defaultPref = checkBool(localStorage.defaultPref);

                    $scope.sweet = checkBool(localStorage.sweet);
                    $scope.sour = checkBool(localStorage.sour);
                    $scope.bitter = checkBool(localStorage.bitter);
                    $scope.spicy = checkBool(localStorage.spicy);
                    $scope.salty = checkBool(localStorage.salty);

                    console.log("cal min= " + $scope.calories.minValue);
                    console.log("cal max= " + $scope.calories.maxValue);
                    console.log("pro min= " + $scope.proteins.minValue);
                    console.log("pro max= " + $scope.proteins.maxValue);
                    console.log("carb min= " + $scope.carb.minValue);
                    console.log("carb max= " + $scope.carb.maxValue);
                    console.log("fats min= " + $scope.fats.minValue);
                    console.log("fats max= " + $scope.fats.maxValue);
                    console.log("chol min= " + $scope.cholesterols.minValue);
                    console.log("chol max= " + $scope.cholesterols.maxValue);

                    console.log("sweet " + $scope.sweet);
                    console.log("sour " + $scope.sour);
                    console.log("bitter " + $scope.bitter);
                    console.log("spicy " + $scope.spicy);
                    console.log("salty " + $scope.salty);

                } else if (!checkBool(localStorage.defaultPref)) {

                    $scope.defaultPref = false;
                    //use profile (default) data

                }
            } else {

                //User has never searched before

                $scope.notLogin_mainctrl = true;

                console.log("User not Logged in");
                console.log("User had never searched before");

                $scope.defaultPref = true;

                $scope.user.vegetarian = false;
                $scope.user.halal = false;
                $scope.user.healthCond = null;
                $scope.user.noIngredient = null;

                //Nutrition Range
                $scope.calories.minValue = 0;
                $scope.calories.maxValue = 0;
                $scope.proteins.minValue = 0;
                $scope.proteins.maxValue = 0;
                $scope.carb.minValue = 0;
                $scope.carb.maxValue = 0;
                $scope.fats.minValue = 0;
                $scope.fats.maxValue = 0;
                $scope.cholesterols.minValue = 0;
                $scope.cholesterols.maxValue = 0;

                //Taste
                $scope.sweet = false;
                $scope.sour = false;
                $scope.bitter = false;
                $scope.spicy = false;
                $scope.salty = false;
            }

        } else {

            //User logged in already
            console.log("User logged in");

            $scope.notLogin_mainctrl = false;

            getUserData.then(function (user) {
                $scope.name = user;

                $scope.user.vegetarian = user[0].vegetarian;
                $scope.user.halal = user[0].halal;

                if (user[0].healthCond == null) {
                    $scope.user.healthCond == null;
                } else {
                    $scope.user.healthCond = user[0].healthCond;
                }

                if (user[0].noIngredient == null) {
                    $scope.user.noIngredient == null;
                } else {
                    $scope.user.noIngredient = user[0].noIngredient;
                }

                $scope.user.nutritionRange = user[0].nutritionRange;
                $scope.user.tastePreference = user[0].tastePreference;
                //Nutrition Range
                var nutrition_range = user[0].nutritionRange;
                $scope.calories.minValue = nutrition_range[0].minValue;
                $scope.calories.maxValue = nutrition_range[0].maxValue;
                $scope.proteins.minValue = nutrition_range[1].minValue;
                $scope.proteins.maxValue = nutrition_range[1].maxValue;
                $scope.carb.minValue = nutrition_range[2].minValue;
                $scope.carb.maxValue = nutrition_range[2].maxValue;
                $scope.fats.minValue = nutrition_range[3].minValue;
                $scope.fats.maxValue = nutrition_range[3].maxValue;
                $scope.cholesterols.minValue = nutrition_range[4].minValue;
                $scope.cholesterols.maxValue = nutrition_range[4].maxValue;

                //Taste
                $scope.sweet = user[0].tastePreference[0];
                $scope.sour = user[0].tastePreference[1];
                $scope.bitter = user[0].tastePreference[2];
                $scope.spicy = user[0].tastePreference[3];
                $scope.salty = user[0].tastePreference[4];

                function checkBool(str) {
                    if (str == 'true') {
                        return true;
                    } else {
                        return false;
                    }
                }

                //Check if user wants to modify his/her Nutrition Preference
                if (checkBool(localStorage.defaultPref) == true) {

                    //override default data -- use data from side bar
                    console.log("override default data");
                    console.log(localStorage.defaultPref);

                    //Set Nutrition
                    $scope.calories.minValue = parseInt(localStorage.calMin);
                    $scope.calories.maxValue = parseInt(localStorage.calMax);
                    $scope.proteins.minValue = parseInt(localStorage.proMin);
                    $scope.proteins.maxValue = parseInt(localStorage.proMax);
                    $scope.carb.minValue = parseInt(localStorage.carbMin);
                    $scope.carb.maxValue = parseInt(localStorage.carbMax);
                    $scope.fats.minValue = parseInt(localStorage.fatsMin);
                    $scope.fats.maxValue = parseInt(localStorage.fatsMax);
                    $scope.cholesterols.minValue = parseInt(localStorage.cholMin);
                    $scope.cholesterols.maxValue = parseInt(localStorage.cholMax);

                    //Set Taste
                    $scope.sweet = checkBool(localStorage.sweet);
                    $scope.sour = checkBool(localStorage.sour);
                    $scope.bitter = checkBool(localStorage.bitter);
                    $scope.spicy = checkBool(localStorage.spicy);
                    $scope.salty = checkBool(localStorage.salty);

                    //Set defaultPref
                    $scope.defaultPref = checkBool(localStorage.defaultPref);

                } else if (checkBool(localStorage.defaultPref) == false) {

                    console.log("use userdata from db");
                    $scope.defaultPref = false;
                    //use profile (default) data

                }

            });
        }

        $scope.model = {
            type: "double"
        };

        $scope.search = function () {

            //Check if Slider has changed
            if ($scope.calories.calories_range.length != 0) {
                $scope.calories.minValue = $scope.calories.calories_range[0];
                $scope.calories.maxValue = $scope.calories.calories_range[1];
            }
            if ($scope.proteins.proteins_range.length != 0) {
                $scope.proteins.minValue = $scope.proteins.proteins_range[0];
                $scope.proteins.maxValue = $scope.proteins.proteins_range[1];
            }
            if ($scope.carb.carb_range.length != 0) {
                $scope.carb.minValue = $scope.carb.carb_range[0];
                $scope.carb.maxValue = $scope.carb.carb_range[1];
            }
            if ($scope.fats.fats_range.length != 0) {
                $scope.fats.minValue = $scope.fats.fats_range[0];
                $scope.fats.maxValue = $scope.fats.fats_range[1];
            }
            if ($scope.cholesterols.cholesterols_range.length != 0) {
                $scope.cholesterols.minValue = $scope.cholesterols.cholesterols_range[0];
                $scope.cholesterols.maxValue = $scope.cholesterols.cholesterols_range[1];
            }

            console.log("default pref " + $scope.defaultPref);

            //Set NutritionPreference and TastePreference to localStorage

            //Set defaultPref
            localStorage.setItem('defaultPref', $scope.defaultPref.toString());

            localStorage.setItem('calMin', ($scope.calories.minValue).toString());
            localStorage.setItem('calMax', ($scope.calories.maxValue).toString());
            localStorage.setItem('proMin', ($scope.proteins.minValue).toString());
            localStorage.setItem('proMax', ($scope.proteins.maxValue).toString());
            localStorage.setItem('carbMin', ($scope.carb.minValue).toString());
            localStorage.setItem('carbMax', ($scope.carb.maxValue).toString());
            localStorage.setItem('fatsMin', ($scope.fats.minValue).toString());
            localStorage.setItem('fatsMax', ($scope.fats.maxValue).toString());
            localStorage.setItem('cholMin', ($scope.cholesterols.minValue).toString());
            localStorage.setItem('cholMax', ($scope.cholesterols.maxValue).toString());

            localStorage.setItem('sweet', $scope.sweet);
            localStorage.setItem('sour', $scope.sour);
            localStorage.setItem('bitter', $scope.bitter);
            localStorage.setItem('spicy', $scope.spicy);
            localStorage.setItem('salty', $scope.salty);

            //reload page to see the change
            window.location.href = "http://localhost:4000/search"

        };
        //End Side Navbar

        getDish.then(function (dish_name) {
            $scope.dish_only_name = dish_name;
            // console.log($scope.dish_only_name);
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
                                frequency: order[i].orderItems[j].amount
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
                                        $scope.dish_recommended[a].frequency += order[i].orderItems[j].amount;
                                        //console.log($scope.dish_recommended[a].frequency);
                                        flag = false;
                                    }
                                    a++; //increment to loop the whole array
                                }
                                if (flag) {
                                    //add other object in to array
                                    $scope.dish_recommended.push(push_obj);
                                }

                            }
                        }
                    }
                }
                //console.log($scope.dish_recommended);

                //sort frequency in descending order
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
                //console.log($scope.dish_recommended);


                getSuggestedDishData.then(function (dish) {

                    $scope.bestforyou = function () {

                        if (!$scope.defaultPref) {   //use profile data
                            // dish is full list of Dish
                            //suggested dish is full list of Dish
                            var suggested = dish;
                            var temp_suggested = [];

                            if ($scope.user.vegetarian == true) {    // vegetarian (no meat no pork)  halal is either TRUE or FALSE
                                for (var i = 0; i < dish.length; i++)   //loop through all dish
                                {
                                    if (dish[i].typeveg == "veg") {
                                        temp_suggested.push(dish[i]);   //push dish==veg to temp
                                    }
                                }
                            }
                            else if ($scope.user.halal == true && $scope.user.vegetarian == false) {    // halal
                                for (var i = 0; i < dish.length; i++)   //loop through all dish
                                {
                                    if (dish[i].typeveg != "pork") {
                                        temp_suggested.push(dish[i]);   //push dish!= pork to temp
                                    }
                                }
                            }
                            else if ($scope.user.halal == false && $scope.user.vegetarian == false) {    // vegetarian
                                for (var i = 0; i < dish.length; i++)   //loop through all dish
                                {
                                    temp_suggested.push(dish[i]);   //push all dishes
                                }
                            }

                            if (temp_suggested.length < 4) {
                                return suggested
                            }
                            else if (temp_suggested.length >= 4) {
                                //start to check Health condition
                                suggested = temp_suggested;
                                temp_suggested = [];
                                //loop through suggested
                                if ($scope.user.healthCond.length == 1)  //no health condition, always at least 1 element (null)
                                {
                                    console.log("no healthcond");
                                    temp_suggested = suggested; //push all back to temp
                                }
                                else if ($scope.user.healthCond.length > 1) // if health condition exists
                                {
                                    for (var j = 0; j < $scope.user.healthCond.length; j++) //loop all health conditions
                                    {
                                        if ($scope.user.healthCond[j] == "diabetes" || $scope.user.healthCond[j] == "Diabetes")  //diabetes
                                        {
                                            for (var k = 0; k < suggested.length; k++)  //
                                            {
                                                var there_is_sweet = false;
                                                for (var l = 0; l < suggested[k].taste.length; l++)  //loop through all tastes of each dish
                                                {
                                                    if (suggested[k].taste[l]["name"] == "sweet") {
                                                        var there_is_sweet = true;
                                                    }
                                                }

                                                if (!there_is_sweet) {
                                                    temp_suggested.push(suggested[k]);  //push dish with no sweet taste
                                                }
                                            }
                                        }
                                    }
                                }

                                if (temp_suggested.length < 4) {
                                    return suggested
                                }
                                else if (temp_suggested.length >= 4) {
                                    suggested = temp_suggested;
                                    temp_suggested = [];

                                    //check noIngredient
                                    if ($scope.user.noIngredient.length == 1) {  //only 1 element (null)
                                        console.log("no ingredient");
                                        temp_suggested = suggested; //push all back to temp
                                    }
                                    else if ($scope.user.noIngredient.length > 1) {
                                        for (var k = 0; k < suggested.length; k++) //loop for all no Ingredient
                                        {
                                            var noIng_exist = false;
                                            for (var j = 0; j < $scope.user.noIngredient.length; j++)  // loop all remaining dish
                                            {
                                                for (var l = 0; l < suggested[k].ingredients.length; l++)  //loop through all ingredients of each dish
                                                {
                                                    if (suggested[k].ingredients[l]["name"] == $scope.user.noIngredient[j]) {
                                                        noIng_exist = true;
                                                    }
                                                }
                                            }
                                            if (!noIng_exist) //push dish only if noIng does not exist
                                            {
                                                temp_suggested.push(suggested[k]);
                                            }
                                        }
                                    }
                                }

                                if (temp_suggested.length < 4) {
                                    return suggested
                                }
                                else {

                                    suggested = temp_suggested;
                                    temp_suggested = [];

                                    //Check Nutrition and Taste
                                    for (var x = 0; x < suggested.length; x++) {

                                        var score = 0;

                                        if (suggested[x].nutritions[0].Calories >= $scope.user.nutritionRange[0].minValue
                                            && suggested[x].nutritions[0].Calories <= $scope.user.nutritionRange[0].maxValue) {
                                            score++;
                                        }
                                        if (suggested[x].nutritions[0].Proteins >= $scope.user.nutritionRange[1].minValue
                                            && suggested[x].nutritions[0].Proteins <= $scope.user.nutritionRange[1].maxValue) {
                                            score++;
                                        }
                                        if (suggested[x].nutritions[0].Carbohydrates >= $scope.user.nutritionRange[2].minValue
                                            && suggested[x].nutritions[0].Carbohydrates <= $scope.user.nutritionRange[2].maxValue) {
                                            score++;
                                        }
                                        if (suggested[x].nutritions[0].Fats >= $scope.user.nutritionRange[3].minValue
                                            && suggested[x].nutritions[0].Fats <= $scope.user.nutritionRange[3].maxValue) {
                                            score++;
                                        }
                                        if (suggested[x].nutritions[0].Cholesterols >= $scope.user.nutritionRange[4].minValue
                                            && suggested[x].nutritions[0].Cholesterols <= $scope.user.nutritionRange[4].maxValue) {
                                            score++;
                                        }

                                        var temp_with_score = suggested[x]
                                        temp_with_score.score = score;
                                        temp_suggested.push(temp_with_score);
                                    }

                                    //Sort Score
                                    //noinspection JSAnnotator
                                    function sort_score(a, b) {
                                        if (a.score > b.score) {
                                            return -1;
                                        }
                                        if (a.score < b.score) {
                                            return 1;
                                        }
                                        return 0;
                                    }

                                    temp_suggested.sort(sort_score);

                                    if (temp_suggested.length < 4) {
                                        return suggested
                                    }
                                    else {

                                        suggested = temp_suggested;
                                        temp_suggested = [];

                                        //Check Taste Preferences
                                        for (var y = 0; y < suggested.length; y++) {

                                            var score_taste = 0;
                                            //Sweet
                                            if ($scope.user.tastePreference[0] == true) {

                                                for (var l = 0; l < suggested[y].taste.length; l++)  //loop through all tastes of each dish
                                                {
                                                    if (suggested[y].taste[l]["name"] == "sweet") {
                                                        score_taste++;
                                                    }
                                                }
                                            }
                                            //Sour
                                            if ($scope.user.tastePreference[1] == true) {

                                                for (var l = 0; l < suggested[y].taste.length; l++)  //loop through all tastes of each dish
                                                {
                                                    if (suggested[y].taste[l]["name"] == "sour") {
                                                        score_taste++;
                                                    }
                                                }
                                            }
                                            //Bitter
                                            if ($scope.user.tastePreference[2] == true) {

                                                for (var l = 0; l < suggested[y].taste.length; l++)  //loop through all tastes of each dish
                                                {
                                                    if (suggested[y].taste[l]["name"] == "bitter") {
                                                        score_taste++;
                                                    }
                                                }
                                            }
                                            //Spicy
                                            if ($scope.user.tastePreference[3] == true) {

                                                for (var l = 0; l < suggested[y].taste.length; l++)  //loop through all tastes of each dish
                                                {
                                                    if (suggested[y].taste[l]["name"] == "spicy") {
                                                        score_taste++;
                                                    }
                                                }
                                            }
                                            //Salty
                                            if ($scope.user.tastePreference[4] == true) {

                                                for (var l = 0; l < suggested[y].taste.length; l++)  //loop through all tastes of each dish
                                                {
                                                    if (suggested[y].taste[l]["name"] == "salty") {
                                                        score_taste++;
                                                    }
                                                }
                                            }

                                            var temp_with_score = suggested[y];
                                            temp_with_score.score_taste = score_taste;
                                            temp_suggested.push(temp_with_score);
                                        }

                                        //Sort Score
                                        function sort_score_taste(a, b) {
                                            if (a.score == b.score) {
                                                return (a.score_taste < b.score_taste) ? 1 : (a.score_taste > b.score_taste) ? -1 : 0;
                                            }
                                            else {
                                                return (a.score < b.score) ? 1 : -1;
                                            }
                                        }

                                        temp_suggested.sort(sort_score_taste);

                                        if (temp_suggested.length < 4) {
                                            $scope.suggested_real = suggested;
                                            $scope.best.one = $scope.suggested_real[0];
                                            $scope.best.two = $scope.suggested_real[1];
                                            $scope.best.three = $scope.suggested_real[2];
                                            $scope.best.four = $scope.suggested_real[3];
                                            //return suggested;
                                        }
                                        else {
                                            $scope.suggested_real = temp_suggested;
                                            $scope.best.one = $scope.suggested_real[0];
                                            $scope.best.two = $scope.suggested_real[1];
                                            $scope.best.three = $scope.suggested_real[2];
                                            $scope.best.four = $scope.suggested_real[3];
                                            //return temp_suggested;
                                        }

                                        //best1
                                        if ($scope.best.one.typeveg == 'veg') {
                                            $scope.best1_typeveg = "newTemplate/svg/salad.svg";
                                        } else if ($scope.best.one.typeveg == 'pork') {
                                            $scope.best1_typeveg = "newTemplate/svg/pig.svg";
                                        } else if ($scope.best.one.typeveg == 'meat') {
                                            $scope.best1_typeveg = "newTemplate/svg/steak.svg";
                                        }

                                        if ($scope.best.one.typedairy == 'dairy') {
                                            $scope.best1_typedairy = "newTemplate/svg/milk.svg";
                                        } else if ($scope.best.one.typedairy == 'no') {
                                            $scope.best1_typedairy = "newTemplate/svg/milk_no.svg";
                                        }
                                        $scope.best.one.rating = Math.ceil($scope.best.one.rating);

                                        //best2
                                        if ($scope.best.two.typeveg == 'veg') {
                                            $scope.best2_typeveg = "newTemplate/svg/salad.svg";
                                        } else if ($scope.best.two.typeveg == 'pork') {
                                            $scope.best2_typeveg = "newTemplate/svg/pig.svg";
                                        } else if ($scope.best.two.typeveg == 'meat') {
                                            $scope.best2_typeveg = "newTemplate/svg/steak.svg";
                                        }

                                        if ($scope.best.two.typedairy == 'dairy') {
                                            $scope.best2_typedairy = "newTemplate/svg/milk.svg";
                                        } else if ($scope.best.two.typedairy == 'no') {
                                            $scope.best2_typedairy = "newTemplate/svg/milk_no.svg";
                                        }
                                        $scope.best.two.rating = Math.ceil($scope.best.two.rating);

                                        //best3
                                        if ($scope.best.three.typeveg == 'veg') {
                                            $scope.best3_typeveg = "newTemplate/svg/salad.svg";
                                        } else if ($scope.best.three.typeveg == 'pork') {
                                            $scope.best3_typeveg = "newTemplate/svg/pig.svg";
                                        } else if ($scope.best.three.typeveg == 'meat') {
                                            $scope.best3_typeveg = "newTemplate/svg/steak.svg";
                                        }

                                        if ($scope.best.three.typedairy == 'dairy') {
                                            $scope.best3_typedairy = "newTemplate/svg/milk.svg";
                                        } else if ($scope.best.three.typedairy == 'no') {
                                            $scope.best3_typedairy = "newTemplate/svg/milk_no.svg";
                                        }
                                        $scope.best.three.rating = Math.ceil($scope.best.three.rating);

                                        //best4
                                        if ($scope.best.four.typeveg == 'veg') {
                                            $scope.best4_typeveg = "newTemplate/svg/salad.svg";
                                        } else if ($scope.best.four.typeveg == 'pork') {
                                            $scope.best4_typeveg = "newTemplate/svg/pig.svg";
                                        } else if ($scope.best.four.typeveg == 'meat') {
                                            $scope.best4_typeveg = "newTemplate/svg/steak.svg";
                                        }

                                        if ($scope.best.four.typedairy == 'dairy') {
                                            $scope.best4_typedairy = "newTemplate/svg/milk.svg";
                                        } else if ($scope.best.four.typedairy == 'no') {
                                            $scope.best4_typedairy = "newTemplate/svg/milk_no.svg";
                                        }
                                        $scope.best.four.rating = Math.ceil($scope.best.four.rating);
                                    }
                                }

                            }

                        }
                        //end if enable default
                        //begin if - disable default i.e. use these values
                        else if ($scope.defaultPref) {
                            var suggested = dish;
                            var temp_suggested = [];

                            //Check Nutrition and Taste
                            for (var x = 0; x < suggested.length; x++) {

                                var score = 0;

                                if (suggested[x].nutritions[0].Calories >= $scope.calories.minValue
                                    && suggested[x].nutritions[0].Calories <= $scope.calories.maxValue) {
                                    score++;
                                }
                                if (suggested[x].nutritions[0].Proteins >= $scope.proteins.minValue
                                    && suggested[x].nutritions[0].Proteins <= $scope.proteins.maxValue) {
                                    score++;
                                }
                                if (suggested[x].nutritions[0].Carbohydrates >= $scope.carb.minValue
                                    && suggested[x].nutritions[0].Carbohydrates <= $scope.carb.maxValue) {
                                    score++;
                                }
                                if (suggested[x].nutritions[0].Fats >= $scope.fats.minValue
                                    && suggested[x].nutritions[0].Fats <= $scope.fats.maxValue) {
                                    score++;
                                }
                                if (suggested[x].nutritions[0].Cholesterols >= $scope.cholesterols.minValue
                                    && suggested[x].nutritions[0].Cholesterols <= $scope.cholesterols.maxValue) {
                                    score++;
                                }

                                var temp_with_score = suggested[x]
                                temp_with_score.score = score;
                                temp_suggested.push(temp_with_score);
                            }

                            //Sort Score
                            //noinspection JSAnnotator
                            function sort_score(a, b) {
                                if (a.score > b.score) {
                                    return -1;
                                }
                                if (a.score < b.score) {
                                    return 1;
                                }
                                return 0;
                            }

                            temp_suggested.sort(sort_score);

                            console.log("after nutri suggested");
                            console.log(suggested);
                            console.log("after nutri temp_suggested");
                            console.log(temp_suggested);

                            if (temp_suggested.length < 4) {
                                return suggested
                            }
                            else {

                                suggested = temp_suggested;
                                temp_suggested = [];

                                //Check Taste Preferences
                                for (var y = 0; y < suggested.length; y++) {

                                    var score_taste = 0;
                                    //Sweet
                                    if ($scope.sweet == true) {
                                        for (var l = 0; l < suggested[y].taste.length; l++)  //loop through all tastes of each dish
                                        {
                                            if (suggested[y].taste[l]["name"] == "sweet") {
                                                score_taste++;
                                            }
                                        }
                                    }
                                    //Sour
                                    if ($scope.sour == true) {
                                        for (var l = 0; l < suggested[y].taste.length; l++)  //loop through all tastes of each dish
                                        {
                                            if (suggested[y].taste[l]["name"] == "sour") {
                                                score_taste++;
                                            }
                                        }
                                    }
                                    //Bitter
                                    if ($scope.bitter == true) {
                                        for (var l = 0; l < suggested[y].taste.length; l++)  //loop through all tastes of each dish
                                        {
                                            if (suggested[y].taste[l]["name"] == "bitter") {
                                                score_taste++;
                                            }
                                        }
                                    }
                                    //Spicy
                                    if ($scope.spicy == true) {
                                        for (var l = 0; l < suggested[y].taste.length; l++)  //loop through all tastes of each dish
                                        {
                                            if (suggested[y].taste[l]["name"] == "spicy") {
                                                score_taste++;
                                            }
                                        }
                                    }
                                    //Salty
                                    if ($scope.salty == true) {
                                        for (var l = 0; l < suggested[y].taste.length; l++)  //loop through all tastes of each dish
                                        {
                                            if (suggested[y].taste[l]["name"] == "salty") {
                                                score_taste++;
                                            }
                                        }
                                    }

                                    var temp_with_score = suggested[y];
                                    temp_with_score.score_taste = score_taste;
                                    temp_suggested.push(temp_with_score);

                                }

                                //Sort Score
                                //noinspection JSAnnotator
                                function sort_score_taste(a, b) {
                                    if (a.score == b.score) {
                                        return (a.score_taste < b.score_taste) ? 1 : (a.score_taste > b.score_taste) ? -1 : 0;
                                    }
                                    else {
                                        return (a.score < b.score) ? 1 : -1;
                                    }
                                }

                                temp_suggested.sort(sort_score_taste);

                                console.log("after taste suggested");
                                console.log(suggested);
                                console.log("after taste temp_suggested");
                                console.log(temp_suggested);


                                if (temp_suggested.length < 4) {
                                    $scope.suggested_real = suggested;
                                    $scope.best.one = $scope.suggested_real[0];
                                    $scope.best.two = $scope.suggested_real[1];
                                    $scope.best.three = $scope.suggested_real[2];
                                    $scope.best.four = $scope.suggested_real[3];
                                    //return suggested;
                                }
                                else {
                                    $scope.suggested_real = temp_suggested;
                                    $scope.best.one = $scope.suggested_real[0];
                                    $scope.best.two = $scope.suggested_real[1];
                                    $scope.best.three = $scope.suggested_real[2];
                                    $scope.best.four = $scope.suggested_real[3];
                                    //return temp_suggested;
                                }

                                //best1
                                if ($scope.best.one.typeveg == 'veg') {
                                    $scope.best1_typeveg = "newTemplate/svg/salad.svg";
                                } else if ($scope.best.one.typeveg == 'pork') {
                                    $scope.best1_typeveg = "newTemplate/svg/pig.svg";
                                } else if ($scope.best.one.typeveg == 'meat') {
                                    $scope.best1_typeveg = "newTemplate/svg/steak.svg";
                                }

                                if ($scope.best.one.typedairy == 'dairy') {
                                    $scope.best1_typedairy = "newTemplate/svg/milk.svg";
                                } else if ($scope.best.one.typedairy == 'no') {
                                    $scope.best1_typedairy = "newTemplate/svg/milk_no.svg";
                                }
                                $scope.best.one.rating = Math.ceil($scope.best.one.rating);

                                //best2
                                if ($scope.best.two.typeveg == 'veg') {
                                    $scope.best2_typeveg = "newTemplate/svg/salad.svg";
                                } else if ($scope.best.two.typeveg == 'pork') {
                                    $scope.best2_typeveg = "newTemplate/svg/pig.svg";
                                } else if ($scope.best.two.typeveg == 'meat') {
                                    $scope.best2_typeveg = "newTemplate/svg/steak.svg";
                                }

                                if ($scope.best.two.typedairy == 'dairy') {
                                    $scope.best2_typedairy = "newTemplate/svg/milk.svg";
                                } else if ($scope.best.two.typedairy == 'no') {
                                    $scope.best2_typedairy = "newTemplate/svg/milk_no.svg";
                                }
                                $scope.best.two.rating = Math.ceil($scope.best.two.rating);

                                //best3
                                if ($scope.best.three.typeveg == 'veg') {
                                    $scope.best3_typeveg = "newTemplate/svg/salad.svg";
                                } else if ($scope.best.three.typeveg == 'pork') {
                                    $scope.best3_typeveg = "newTemplate/svg/pig.svg";
                                } else if ($scope.best.three.typeveg == 'meat') {
                                    $scope.best3_typeveg = "newTemplate/svg/steak.svg";
                                }

                                if ($scope.best.three.typedairy == 'dairy') {
                                    $scope.best3_typedairy = "newTemplate/svg/milk.svg";
                                } else if ($scope.best.three.typedairy == 'no') {
                                    $scope.best3_typedairy = "newTemplate/svg/milk_no.svg";
                                }
                                $scope.best.three.rating = Math.ceil($scope.best.three.rating);

                                //best4
                                if ($scope.best.four.typeveg == 'veg') {
                                    $scope.best4_typeveg = "newTemplate/svg/salad.svg";
                                } else if ($scope.best.four.typeveg == 'pork') {
                                    $scope.best4_typeveg = "newTemplate/svg/pig.svg";
                                } else if ($scope.best.four.typeveg == 'meat') {
                                    $scope.best4_typeveg = "newTemplate/svg/steak.svg";
                                }

                                if ($scope.best.four.typedairy == 'dairy') {
                                    $scope.best4_typedairy = "newTemplate/svg/milk.svg";
                                } else if ($scope.best.four.typedairy == 'no') {
                                    $scope.best4_typedairy = "newTemplate/svg/milk_no.svg";
                                }
                                $scope.best.four.rating = Math.ceil($scope.best.four.rating);

                            }
                        } //end disable

                        //End Suggested
                    };

                    $scope.bestforyou();
                });


                $scope.dish_by_price_result = [];

                getDishDataByPrice.then(function (dish) {
                    $scope.dishbyprice = function () {

                        var dish_by_price = dish;

                        /*sort in descending order: High to Low*/
                        function sort_price_desc(a, b) {
                            if (a.price > b.price) {
                                return -1;
                            }
                            if (a.price < b.price) {
                                return 1;
                            }
                            return 0;
                        }

                        /*sort in ascending order: Low to High*/
                        function sort_price_asc(a, b) {
                            if (a.price > b.price) {
                                return 1;
                            }
                            if (a.price < b.price) {
                                return -1;
                            }
                            return 0;
                        }

                        var temp_dish_in_price_range = [];
                        //get only dish where its price is in range
                        for (var i = 0; i < dish_by_price.length; i++) {
                            if (dish_by_price[i].price >= $scope.priceRange[0] && dish_by_price[i].price <= $scope.priceRange[1]) {
                                temp_dish_in_price_range.push(dish_by_price[i]);
                            }
                        }

                        if ($scope.price_order == "asc") {
                            /*if low > high is selected*/
                            $scope.dish_by_price_result = temp_dish_in_price_range.sort(sort_price_asc);
                            if ($scope.dish_by_price_result.length > 15) {
                                $scope.dish_by_price_result = $scope.dish_by_price_result.slice(0, 15);
                            }
                        } else if ($scope.price_order == "desc") {
                            /*else if high > low is selected*/
                            $scope.dish_by_price_result = temp_dish_in_price_range.sort(sort_price_desc);
                            if ($scope.dish_by_price_result.length > 15) {
                                $scope.dish_by_price_result = $scope.dish_by_price_result.slice(0, 15);
                            }
                        } else if ($scope.price_order == "") {
                            /*no radio button selected*/
                            dish_by_price = [];
                        }

                    };
                    $scope.dishbyprice();
                });
                /*end search dish by price*/

                getFeedbackDishData.then(function (dish) {


                    //All Dish Section
                    for (var i = 0; i < dish.length; i++) {
                        //console.log(i + " " + dish[i].type);
                        if (dish[i].type == "Main Dish" || dish[i].type == "Main dish" || dish[i].type == "main dish") {

                            $scope.mainDish.push(dish[i]);

                        } else if (dish[i].type == "Dessert" || dish[i].type == "dessert") {
                            $scope.dessert.push(dish[i]);

                        } else if (dish[i].type == "Appetizer" || dish[i].type == "appetizer") {
                            $scope.appetizer.push(dish[i]);

                        } else if (dish[i].type == "Soup" || dish[i].type == "soup") {
                            $scope.soup.push(dish[i]);

                        } else if (dish[i].type == "Salad" || dish[i].type == "salad") {
                            $scope.salad.push(dish[i]);

                        }
                    }


                    for (var i = 0; i < dish.length; i++) {

                        if (dish[i].name == $scope.dish_recommended[0].dishName) {
                            $scope.dish1 = dish[i];

                            if (dish[i].typeveg == 'veg') {
                                $scope.dish1_typeveg = "newTemplate/svg/salad.svg";
                            } else if (dish[i].typeveg == 'pork') {
                                $scope.dish1_typeveg = "newTemplate/svg/pig.svg";
                            } else if (dish[i].typeveg == 'meat') {
                                $scope.dish1_typeveg = "newTemplate/svg/steak.svg";
                            }

                            if (dish[i].typedairy == 'dairy') {
                                $scope.dish1_typedairy = "newTemplate/svg/milk.svg";
                            } else if (dish[i].typedairy == 'no') {
                                $scope.dish1_typedairy = "newTemplate/svg/milk_no.svg";
                            }

                            $scope.dish1.rating = Math.ceil($scope.dish1.rating);
                        }
                        if (dish[i].name == $scope.dish_recommended[1].dishName) {
                            $scope.dish2 = dish[i];

                            if (dish[i].typeveg == 'veg') {
                                $scope.dish2_typeveg = "newTemplate/svg/salad.svg";
                            } else if (dish[i].typeveg == 'pork') {
                                $scope.dish2_typeveg = "newTemplate/svg/pig.svg";
                            } else if (dish[i].typeveg == 'meat') {
                                $scope.dish2_typeveg = "newTemplate/svg/steak.svg";
                            }

                            if (dish[i].typedairy == 'dairy') {
                                $scope.dish2_typedairy = "newTemplate/svg/milk.svg";
                            } else if (dish[i].typedairy == 'no') {
                                $scope.dish2_typedairy = "newTemplate/svg/milk_no.svg";
                            }

                            $scope.dish2.rating = Math.ceil($scope.dish2.rating);
                        }
                        if (dish[i].name == $scope.dish_recommended[2].dishName) {
                            $scope.dish3 = dish[i];

                            if (dish[i].typeveg == 'veg') {
                                $scope.dish3_typeveg = "newTemplate/svg/salad.svg";
                            } else if (dish[i].typeveg == 'pork') {
                                $scope.dish3_typeveg = "newTemplate/svg/pig.svg";
                            } else if (dish[i].typeveg == 'meat') {
                                $scope.dish3_typeveg = "newTemplate/svg/steak.svg";
                            }

                            if (dish[i].typedairy == 'dairy') {
                                $scope.dish3_typedairy = "newTemplate/svg/milk.svg";
                            } else if (dish[i].typedairy == 'no') {
                                $scope.dish3_typedairy = "newTemplate/svg/milk_no.svg";
                            }

                            $scope.dish3.rating = Math.ceil($scope.dish3.rating);
                        }
                        if (dish[i].name == $scope.dish_recommended[3].dishName) {
                            $scope.dish4 = dish[i];

                            if (dish[i].typeveg == 'veg') {
                                $scope.dish4_typeveg = "newTemplate/svg/salad.svg";
                            } else if (dish[i].typeveg == 'pork') {
                                $scope.dish4_typeveg = "newTemplate/svg/pig.svg";
                            } else if (dish[i].typeveg == 'meat') {
                                $scope.dish4_typeveg = "newTemplate/svg/steak.svg";
                            }

                            if (dish[i].typedairy == 'dairy') {
                                $scope.dish4_typedairy = "newTemplate/svg/milk.svg";
                            } else if (dish[i].typedairy == 'no') {
                                $scope.dish4_typedairy = "newTemplate/svg/milk_no.svg";
                            }

                            $scope.dish4.rating = Math.ceil($scope.dish4.rating);
                        }
                    }
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

//Add to Cart
        var current_dish = [];
        var current_ingredient = [];
        var current_ingredient_onchange = [];

//Call after click the dish
        $scope.showTabDialog = function (ev, name, price) {

            current_ingredient_onchange = [];

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
                        $scope.dish_dialog_utensils = response.data.utensils;

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
                                dishNutritions: $scope.dish_dialog_nutritions,
                                dishUtensils: $scope.dish_dialog_utensils,
                                dishPrice: price,
                                notLogin: $scope.notLogin_mainctrl
                            },
                            controller: ['$scope', 'dishName', 'dishIngredients', 'dishUtensils', 'dishRecipe', 'dishNutritions', 'dishPrice', '$mdDialog', 'notLogin',
                                function ($scope, dishName, dishIngredients, dishUtensils, dishRecipe, dishNutritions, dishPrice, $mdDialog, notLogin) {
                                    $scope.dishName = dishName;
                                    $scope.dishIngredients = dishIngredients;
                                    $scope.dishRecipe = dishRecipe;
                                    $scope.dishNutritions = dishNutritions;
                                    $scope.dishPrice = dishPrice;
                                    $scope.dishUtensils = dishUtensils;
                                    $scope.notLogin = notLogin;

                                    $scope.hide = function () {
                                        current_ingredient_onchange = [];
                                        //console.log("Hide!")
                                        $mdDialog.hide();
                                        //current_ingredient_onchange = [];
                                    };

                                    $scope.cancel = function () {
                                        current_ingredient_onchange = [];
                                        $mdDialog.cancel();
                                    };


                                    $scope.dish_quantity = 1;
                                    $scope.topup_quantity = 0;


                                    $scope.change_topUpQuantity = function (dish_name, ingredient_name, quantity, ingredient_price) {

                                        var topup_obj = {
                                            "name": ingredient_name,
                                            "amount": quantity,
                                            /*"price": random_price*quantity*/
                                            "price": ingredient_price * quantity
                                        };


                                        //Check if current_ingredient array is not empty
                                        if (current_ingredient_onchange.length > 0) {

                                            var flag = true, i = 0;
                                            while (flag && i < current_ingredient_onchange.length) {


                                                if (current_ingredient_onchange[i].name == ingredient_name) {

                                                    current_ingredient_onchange[i]["amount"] = quantity;

                                                    flag = false;
                                                } else {
                                                    //console.log(current_ingredient);
                                                }
                                                i++;
                                            }
                                            // if item does not exist in array
                                            if (i == current_ingredient_onchange.length && flag) {

                                                current_ingredient_onchange.push(topup_obj);
                                            }

                                        } else {
                                            current_ingredient_onchange.push(topup_obj);
                                        }


                                        $scope.topup_quantity = 0;
                                    };

                                    $scope.addToCart = function (dish_name, dish_quantity) {
                                        if (notLogin) {

                                            var toast = $mdToast.show($mdToast.simple()
                                                    .textContent('Please Login')
                                                    .hideDelay(3000)
                                                    .position('bottom right')
                                                    .action('OK')
                                                    .highlightAction(true)
                                                    .highlightClass('md-warn')// Accent is used by default, this just demonstrates the usage.
                                                    .parent(angular.element(document.body))
                                                //.position(pinTo);
                                            );

                                        } else {

                                            if (dish_quantity == 0) {

                                                console.log("can't add to cart")

                                            } else {


                                                //add temp ingredient list to basket

                                                for (var j = 0; j < current_ingredient_onchange.length; j++) {

                                                    if (current_ingredient.length > 0) {
                                                        var flag = true, i = 0;
                                                        console.log("starting, i=" + i);
                                                        while (flag && i < current_ingredient.length) {
                                                            if (current_ingredient[i].name == current_ingredient_onchange[j].name) {

                                                                current_ingredient[i]["amount"] = current_ingredient[i]["amount"] + current_ingredient_onchange[j].amount;

                                                                flag = false;
                                                            } else {

                                                            }
                                                            i++;

                                                        }

                                                        if (i == current_ingredient.length && flag) {
                                                            current_ingredient.push(current_ingredient_onchange[j]);

                                                        }

                                                    } else {
                                                        current_ingredient.push(current_ingredient_onchange[j]);

                                                    }
                                                }


                                                var dish_obj = {
                                                    "name": dish_name,
                                                    "amount": dish_quantity,
                                                    "price": $scope.dishPrice
                                                };

                                                if (current_dish.length > 0) {
                                                    var flag = true, i = 0;
                                                    while (flag && i < current_dish.length) {
                                                        if (current_dish[i].name == dish_name) {
                                                            current_dish[i]["amount"] = current_dish[i]["amount"] + dish_quantity;
                                                            //console.log("Update " + dish_name + "'s quantity to " + current_dish[i]["amount"]);
                                                            flag = false;
                                                        } else {

                                                        }
                                                        i++;
                                                    }

                                                    if (i == current_dish.length && flag) {
                                                        current_dish.push(dish_obj);
                                                    }

                                                } else {
                                                    current_dish.push(dish_obj);
                                                }

                                               
                                                $scope.dish_quantity = 1;
                                                
                                                $mdDialog.hide();

                                            }

                                            localStorage.setItem('current_dish', JSON.stringify(current_dish));
                                            //console.log(localStorage.current_dish);
                                            localStorage.setItem('current_ingredient', JSON.stringify(current_ingredient));
                                            //console.log(localStorage.current_ingredient);

                                        }

                                    };

                                    //End

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
    }])
;

// Side nav bar
app2.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenLeft = function () {
        return $mdSidenav('left').isOpen();
    };
    $scope.isOpenRight = function () {
        return $mdSidenav('right').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }
});
app2.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });

    };
});
app2.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
    };
});
//End Side nav bar


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