/**
 * Created by Jaupat Ch on 12-Jun-16.
 */
var app2 = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages','ngAnimate', 'ui.bootstrap']);

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

app2.controller('MainCtrl', function ($scope, $http, $sce, getFeedbackDishData) {

    //New Ratings
    $scope.rate = 3;
    $scope.max = 5;
    $scope.isReadonly_rating = false;

    $scope.hoveringOver = function(value) {
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
        console.log(feedback);
        for(var i = 0;i<feedback.length;i++){
            console.log(i+ " " +feedback[i].type);
            if(feedback[i].type=="Main Dish" || feedback[i].type=="Main dish" || feedback[i].type=="main dish"){
                $scope.mainDish.push(feedback[i]);
            }else if(feedback[i].type=="Dessert" || feedback[i].type=="dessert"){
                $scope.dessert.push(feedback[i]);
            }else if(feedback[i].type=="Appetizer" || feedback[i].type=="appetizer"){
                $scope.appetizer.push(feedback[i]);
            }else if(feedback[i].type=="Soup" || feedback[i].type=="soup"){
                $scope.soup.push(feedback[i]);
            }else if(feedback[i].type=="Salad" || feedback[i].type=="salad"){
                $scope.salad.push(feedback[i]);
            }
        }
        //console.log("Test data")
        //console.log($scope.mainDish)
        //$scope.get_feedback_data_soup();

    });

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
                customer: localStorage.loginChefAtHomeEmail
            }).then(function (response) {
                console.log(response.data);
                $scope.option1 = "";
                $scope.option2 = "";
                $scope.user.msg = "";
            });
        }else{return 0;}
    };

    $scope.data = {
        group1 : ""
    };

    // function updateDish (name, rating, noRater) {
    //     console.log("Inside Update Dish");
    //     return $http.post(url + "/update/one_dish",
    //         {
    //             name: name,
    //             rating: rating,
    //             noRater: noRater
    //         }
    //     )
    //         .then(function (response) {
    //             console.log(response)
    //         });
    // };

    //method to submit rating
    $scope.submitRating = function (){
        // if dish is not selected
        if($scope.data.group1 == ""){
            console.log("No Dish selected!")
        }
        //else if dish is selected
        else{
            $http.post(url + "/list/one_dish", {name: $scope.data.group1})
                .then(function (response) {
                    var one_dish = response.data;
                    var old_rating = one_dish.rating;
                    var old_noRater = one_dish.noRater;
                    var new_rating = ((old_rating*old_noRater)+$scope.rate)/(old_noRater + 1);
                    // var new_rating = Math.floor((((old_rating*old_noRater)+$scope.rate)/(old_noRater + 1)));
                    console.log((((old_rating*old_noRater)+$scope.rate)/(old_noRater + 1)))
                    console.log("Name: "+$scope.data.group1);
                    console.log("You rate: "+$scope.rate);
                    console.log("old_rating: "+old_rating);
                    console.log("new_rating: "+new_rating);
                    var new_noRater = old_noRater+1;
                    console.log("old_noRater: "+old_noRater);
                    console.log("new_noRater: "+new_noRater);
                    //updateDish($scope.data.group1, new_rating, new_noRater)

                    $http.post(url + "/update/one_dish",
                        {
                            name: $scope.data.group1,
                            rating: new_rating,
                            noRater: new_noRater
                        }
                    )
                        .then(function (response) {
                            console.log(response)
                        });
                });
        }

    }

});

app2.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})


angular.element(document).ready(function () {
    var myDiv1 = document.getElementById("all_modules");
    angular.bootstrap(myDiv1, ["inputBasicDemo"]);
});