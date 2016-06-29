/**
 * Created by Jatupat Ch on 16-Jun-16.
 */
var app2 = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages', 'rzModule' ,'ngAnimate', 'ui.bootstrap', 'material.svgAssetsCache']);

var url = "http://localhost:4000";

app2.factory('getUserData', ['$http', function ($http) {
    //Create request for User data then send it to other Controller
    //More info http://stackoverflow.com/questions/33843861/why-is-this-factory-returning-a-state-object-instead-of-response-data
    var this_email = "";

    if (localStorage.loginChefAtHomeEmail) {
        this_email = localStorage.loginChefAtHomeEmail;
    } else {
        window.location.href = "http://localhost:4000/"
    }
    return $http.post(url + "/list/user", {email: this_email})
        .then(function (response) {
            return response.data;
        });
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

// app2.directive("ionRangeSlider", [
//     function () {
//
//         return {
//             restrict: "E",
//             scope: {
//                 min: "=",
//                 max: "=",
//                 type: "@",
//                 prefix: "@",
//                 maxPostfix: "@",
//                 prettify: "@",
//                 grid: "@",
//                 gridMargin: "@",
//                 postfix: "@",
//                 step: "@",
//                 hideMinMax: "@",
//                 hideFromTo: "@",
//                 from: "=",
//                 to: "=",
//                 disable: "=",
//                 onChange: "&onChange",
//                 onFinish: "&"
//             },
//             replace: true,
//             link: function ($scope, $element) {
//                 $element.ionRangeSlider({
//                     min: $scope.min,
//                     max: $scope.max,
//                     type: $scope.type,
//                     prefix: $scope.prefix,
//                     maxPostfix: $scope.maxPostfix,
//                     prettify: $scope.prettify,
//                     grid: $scope.grid,
//                     gridMargin: $scope.gridMargin,
//                     postfix: $scope.postfix,
//                     step: $scope.step,
//                     hideMinMax: $scope.hideMinMax,
//                     hideFromTo: $scope.hideFromTo,
//                     from: $scope.from,
//                     to: $scope.to,
//                     disable: $scope.disable,
//                     onChange: function (a) {
//                         $scope.onChange && $scope.onChange({
//                             a: a
//                         });
//                     },
//                     onFinish: $scope.onFinish
//                 });
//                 var watchers = [];
//                 watchers.push($scope.$watch("min", function (value) {
//                     $element.data("ionRangeSlider").update({
//                         min: value
//                     });
//                 }));
//                 watchers.push($scope.$watch('max', function (value) {
//                     $element.data("ionRangeSlider").update({
//                         max: value
//                     });
//                 }));
//                 watchers.push($scope.$watch('from', function (value) {
//                     $element.data("ionRangeSlider").update({
//                         from: value
//                     });
//                 }));
//                 watchers.push($scope.$watch('disable', function (value) {
//                     $element.data("ionRangeSlider").update({
//                         disable: value
//                     });
//                 }));
//             }
//         }
//
//     }
// ]);

// app2.controller("slider", function ($scope) {
//     $scope.model = {
//         type: "double",
//         from: 30,
//         until: 40,
//         min: 25,
//         max: 50
//
//     }
// });

//var to localStorage
//localStorage.setItem('current_dish', JSON.stringify(current_dish));
var retrieve_dish = localStorage.getItem('current_dish');  //String
console.log('local_current_dish: ',JSON.parse(retrieve_dish));

//localStorage.setItem('current_ingredient', JSON.stringify(current_ingredient));
var retrieve_ingredient = localStorage.getItem('current_ingredient'); //String
console.log('local_current_ingredient: ',JSON.parse(retrieve_ingredient));
//End var to localStorage

app2.controller('MainCtrl', ['$scope','getRecommended', 'getDish', 'getFeedbackDishData', '$mdDialog', '$http',
    function ($scope, getRecommended, getDish, getFeedbackDishData, $mdDialog, $http, $rootScope, $timeout, $modal) {

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

                            if(dish[i].typeveg == 'veg'){
                                $scope.dish1_typeveg = "newTemplate/svg/salad.svg";
                            }else if(dish[i].typeveg == 'pork'){
                                $scope.dish1_typeveg = "newTemplate/svg/pig.svg";
                            }else if(dish[i].typeveg == 'meat'){
                                $scope.dish1_typeveg = "newTemplate/svg/steak.svg";
                            }

                            if(dish[i].typedairy == 'dairy'){
                                $scope.dish1_typedairy = "newTemplate/svg/milk.svg";
                            }else if(dish[i].typedairy == 'no'){
                                $scope.dish1_typedairy = "newTemplate/svg/milk_no.svg";
                            }
                            
                            $scope.dish1.rating = Math.ceil($scope.dish1.rating);
                        }
                        if (dish[i].name == $scope.dish_recommended[1].dishName) {
                            $scope.dish2 = dish[i];

                            if(dish[i].typeveg == 'veg'){
                                $scope.dish2_typeveg = "newTemplate/svg/salad.svg";
                            }else if(dish[i].typeveg == 'pork'){
                                $scope.dish2_typeveg = "newTemplate/svg/pig.svg";
                            }else if(dish[i].typeveg == 'meat'){
                                $scope.dish2_typeveg = "newTemplate/svg/steak.svg";
                            }

                            if(dish[i].typedairy == 'dairy'){
                                $scope.dish2_typedairy = "newTemplate/svg/milk.svg";
                            }else if(dish[i].typedairy == 'no'){
                                $scope.dish2_typedairy = "newTemplate/svg/milk_no.svg";
                            }

                            $scope.dish2.rating = Math.ceil($scope.dish2.rating);
                        }
                        if (dish[i].name == $scope.dish_recommended[2].dishName) {
                            $scope.dish3 = dish[i];

                            if(dish[i].typeveg == 'veg'){
                                $scope.dish3_typeveg = "newTemplate/svg/salad.svg";
                            }else if(dish[i].typeveg == 'pork'){
                                $scope.dish3_typeveg = "newTemplate/svg/pig.svg";
                            }else if(dish[i].typeveg == 'meat'){
                                $scope.dish3_typeveg = "newTemplate/svg/steak.svg";
                            }

                            if(dish[i].typedairy == 'dairy'){
                                $scope.dish3_typedairy = "newTemplate/svg/milk.svg";
                            }else if(dish[i].typedairy == 'no'){
                                $scope.dish3_typedairy = "newTemplate/svg/milk_no.svg";
                            }

                            $scope.dish3.rating = Math.ceil($scope.dish3.rating);
                        }
                        if (dish[i].name == $scope.dish_recommended[3].dishName) {
                            $scope.dish4 = dish[i];

                            if(dish[i].typeveg == 'veg'){
                                $scope.dish4_typeveg = "newTemplate/svg/salad.svg";
                            }else if(dish[i].typeveg == 'pork'){
                                $scope.dish4_typeveg = "newTemplate/svg/pig.svg";
                            }else if(dish[i].typeveg == 'meat'){
                                $scope.dish4_typeveg = "newTemplate/svg/steak.svg";
                            }

                            if(dish[i].typedairy == 'dairy'){
                                $scope.dish4_typedairy = "newTemplate/svg/milk.svg";
                            }else if(dish[i].typedairy == 'no'){
                                $scope.dish4_typedairy = "newTemplate/svg/milk_no.svg";
                            }

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
                                dishPrice : price
                            },
                            controller: ['$scope', 'dishName', 'dishIngredients', 'dishUtensils', 'dishRecipe', 'dishNutritions', 'dishPrice', '$mdDialog',
                                function ($scope, dishName, dishIngredients, dishUtensils, dishRecipe, dishNutritions, dishPrice, $mdDialog) {
                                    $scope.dishName = dishName;
                                    $scope.dishIngredients = dishIngredients;
                                    $scope.dishRecipe = dishRecipe;
                                    $scope.dishNutritions = dishNutritions;
                                    $scope.dishPrice = dishPrice;
                                    $scope.dishUtensils = dishUtensils;

                                    $scope.hide = function () {
                                        current_ingredient_onchange = [];
                                        console.log("Hide!")
                                        $mdDialog.hide();
                                        //current_ingredient_onchange = [];
                                    };

                                    $scope.cancel = function () {
                                        current_ingredient_onchange = [];
                                        $mdDialog.cancel();
                                    };

                                    // $scope.answer = function (answer) {
                                    //     $mdDialog.hide(answer);
                                    //
                                    //     if(answer == "cancel"){
                                    //         current_ingredient_onchange = [];
                                    //     }
                                    //
                                    // };

                                    $scope.dish_quantity = 1;
                                    $scope.topup_quantity = 0;

                                    /*function getRandomPrice(min, max) {
                                        return Math.random() * (max - min) + min;
                                    }*/

                                    $scope.change_topUpQuantity = function (dish_name, ingredient_name, quantity, ingredient_price) {
                                        console.log("Adding topup "+ingredient_name+" x"+quantity+" (price="+ingredient_price+") of "+ dish_name +"to cart");
                                        console.log(ingredient_name +"- total price = "+quantity*ingredient_price);

                                        /*var random_price = getRandomPrice(0.5,3);

                                        random_price = random_price.toFixed(2);*/

                                        var topup_obj = {
                                            "name": ingredient_name,
                                            "amount": quantity,
                                            /*"price": random_price*quantity*/
                                            "price": ingredient_price*quantity
                                        };

                                        //console.log(topup_obj);

                                        //Check if current_ingredient array is not empty
                                        if(current_ingredient_onchange.length > 0){

                                            console.log("NOT empty array");

                                            var flag=true, i=0;
                                            while (flag && i < current_ingredient_onchange.length) {



                                                if (current_ingredient_onchange[i].name == ingredient_name) {

                                                    console.log("i in if:"+i);
                                                    current_ingredient_onchange[i]["amount"] = quantity;
                                                    console.log("Update " + ingredient_name + "'s quantity to " + current_ingredient_onchange[i]["amount"]);

                                                    console.log(current_ingredient_onchange);
                                                    flag = false;
                                                } else {

                                                    //console.log(current_ingredient);
                                                }
                                                i++;
                                                console.log("i after increment:"+i)
                                            }
                                            // if item does not exist in array
                                            if(i==current_ingredient_onchange.length && flag){
                                                console.log("i on push:"+i);
                                                current_ingredient_onchange.push(topup_obj);
                                                console.log("Push "+ingredient_name+" X "+quantity+" to current_ingredient_onchange array");
                                            }

                                        }else{
                                            console.log("empty array");
                                            current_ingredient_onchange.push(topup_obj);
                                            console.log("Push "+ingredient_name+" X "+quantity+" to current_ingredient_onchange array");
                                            console.log(current_ingredient_onchange);
                                        }


                                        $scope.topup_quantity = 0;

                                    };

                                    $scope.addToCart = function (dish_name, dish_quantity) {




                                        if(dish_quantity == 0){

                                            console.log("can't add to cart")

                                        }else {


                                            //add temp ingredient list to basket

                                            for(var j=0; j< current_ingredient_onchange.length; j++){
                                                // current_ingredient.push(current_ingredient_onchange[j])
                                                if (current_ingredient.length > 0) {
                                                    var flag=true, i=0;
                                                    console.log("starting, i="+i);
                                                    while (flag && i < current_ingredient.length) {
                                                        if (current_ingredient[i].name == current_ingredient_onchange[j].name) {
                                                            console.log("in if update, i="+i);
                                                            current_ingredient[i]["amount"] = current_ingredient[i]["amount"] + current_ingredient_onchange[j].amount;
                                                            console.log("Update " + current_ingredient[i].name + "'s quantity to " + current_ingredient_onchange[j]["amount"]);
                                                            //console.log(current_dish);
                                                            flag = false;
                                                        } else {

                                                        }
                                                        i++;
                                                        console.log("after increment, i="+i);
                                                    }

                                                    if(i == current_ingredient.length && flag){
                                                        current_ingredient.push(current_ingredient_onchange[j]);
                                                        console.log("Push " + current_ingredient_onchange[j].name + " X " + current_ingredient_onchange[j].amount + " to current_ingredient array")
                                                        console.log("in if push, i="+i);
                                                    }

                                                } else {
                                                    current_ingredient.push(current_ingredient_onchange[j]);
                                                    console.log("empty array");
                                                    //console.log("Push " + dish_name + " X " + dish_quantity + " to current_dish array")

                                                }
                                            }

                                            console.log("current_ingredient= ")
                                            console.log(current_ingredient);

                                            var dish_obj = {
                                                "name": dish_name,
                                                "amount": dish_quantity,
                                                "price": $scope.dishPrice
                                            };

                                            console.log(dish_obj);

                                            console.log("length="+current_dish.length);


                                            if (current_dish.length > 0) {
                                                var flag=true, i=0;
                                                console.log("starting, i="+i);
                                                while (flag && i < current_dish.length) {
                                                    if (current_dish[i].name == dish_name) {
                                                        console.log("in if update, i="+i);
                                                        current_dish[i]["amount"] = current_dish[i]["amount"] + dish_quantity;
                                                        console.log("Update " + dish_name + "'s quantity to " + current_dish[i]["amount"]);
                                                        //console.log(current_dish);
                                                        flag = false;
                                                    } else {

                                                    }
                                                    i++;
                                                    console.log("after increment, i="+i);
                                                }

                                                if(i == current_dish.length && flag){
                                                    current_dish.push(dish_obj);
                                                    console.log("Push " + dish_name + " X " + dish_quantity + " to current_dish array")
                                                    console.log("in if push, i="+i);
                                                }

                                            } else {
                                                current_dish.push(dish_obj);
                                                console.log("empty array");
                                                console.log("Push " + dish_name + " X " + dish_quantity + " to current_dish array")

                                            }

                                            //console.log("Adding "+name+" X"+$scope.dish_quantity+" to cart")
                                            $scope.dish_quantity = 1;
                                            //$scope.answer('');

                                            console.log(current_dish);
                                            $mdDialog.hide();

                                        }

                                        localStorage.setItem('current_dish', JSON.stringify(current_dish));
                                        console.log(localStorage.current_dish);
                                        localStorage.setItem('current_ingredient', JSON.stringify(current_ingredient));
                                        console.log(localStorage.current_ingredient);
                                        
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

    }]);

app2.controller('SearchCtrl', ['$scope', 'getUserData','getIngredients', '$http', function ($scope, getUserData, getIngredients, $http, $rootScope, $timeout, $modal) {
    $scope.formStatus = true;
    //Slider
    var vm = this;
    //Minimal slider config
    $scope.minSlider = {
        value: 10
    };
    //Slider config with custom display function
    $scope.calories = {
        options: {
            ceil: 4000,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.proteins = {
       options: {
            ceil: 200,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.carb = {
        options: {
            ceil: 1000,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.fats = {
        options: {
            ceil: 100,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.cholesterols = {
        options: {
            ceil: 300,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };
    
    $scope.full_ingredients_str = "";

    getUserData.then(function (user) {
        $scope.name = user;
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

    });

    //End Slider
}]);

// Side nav bar
app2.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenLeft = function(){
        return $mdSidenav('left').isOpen();
    };
    $scope.isOpenRight = function(){
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
            timer = $timeout(function() {
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
        return debounce(function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    function buildToggler(navID) {
        return function() {
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