/**
 * Created by Chanawatn Pound on 02-Jun-16.
 */
var app2 = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages']);

app2.controller('ErrCtrl', function ($scope) {
    $scope.project = {
        description: 'Nuclear Missile Defense System',
        rate: ""
    };
})

app2.controller('DateCtrl', function ($scope) {
    $scope.myDate = new Date();
    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() - 2,
        $scope.myDate.getDate());
    $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() + 2,
        $scope.myDate.getDate());
    $scope.onlyWeekendsPredicate = function (date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    }
})

app2.controller('Chk1Ctrl', function ($scope) {
    $scope.data = {};
    $scope.data.cb1 = false;
    $scope.data.cb2 = false;
    $scope.data.cb3 = false;
    $scope.data.cb4 = false;
    $scope.data.cb5 = false;
    $scope.data.extra = "";
})

app2.controller('Chk2Ctrl', function ($scope) {
    $scope.data2 = {};
    $scope.data2.cb1 = false;
    $scope.data2.cb2 = false;
    $scope.data2.cb3 = false;
    $scope.data2.extra = "";
})


app2.controller('Chk3Ctrl', function ($scope) {

    $scope.data = {};
    $scope.data.cb1 = true;
    $scope.data.cb2 = false;
    $scope.data.cb3 = false;
    $scope.data.cb4 = false;
    $scope.data.cb5 = false;

})




app2.controller('TasteCtrl', function ($scope) {

    $scope.data = {};
    $scope.data.cb1 = false;
    $scope.data.cb2 = false;
    $scope.data.cb3 = false;
    $scope.data.cb4 = false;
    $scope.data.cb5 = false;

})


app2.controller('AddNutriCtrl', function ($scope) {

    $scope.data = {};
    $scope.data.cb1 = false;
    $scope.data.cb2 = false;
    $scope.data.cb3 = false;
    $scope.data.cb4 = false;
    $scope.data.cb5 = false;
    $scope.data.cb6 = false;

})

app2.controller('SelectOptGroupCtrl', function($scope) {
    $scope.nutritions = [{
        category: 'vitamin',
        name: 'Vitamin A'
    }, {
        category: 'vitamin',
        name: 'Vitamin B'
    }, {
        category: 'vitamin',
        name: 'Vitamin C'
    }, {
        category: 'vitamin',
        name: 'Vitamin D'
    }, {
        category: 'vitamin',
        name: 'Vitamin K'
    }, {
        category: 'others',
        name: 'Fiber'
    }, {
        category: 'others',
        name: 'Sodium'
    } ];
    $scope.selectedNutrition = [];
    $scope.printSelectedNutritions = function printSelectedNutritions() {
        var numberOfNutritions = this.selectedNutrition.length;

        // If there is more than one topping, we add an 'and'
        // to be gramatically correct. If there are 3+ toppings
        // we also add an oxford comma.
        if (numberOfNutritions > 1) {
            var needsOxfordComma = numberOfNutritions > 2;
            var lastNutritionConjunction = (needsOxfordComma ? ',' : '') + ' and ';
            var lastNutrition = lastNutritionConjunction +
                this.selectedNutrition[this.selectedNutrition.length - 1];
            return this.selectedNutrition.slice(0, -1).join(', ') + lastNutrition;
        }

        return this.selectedNutrition.join('');
    };
});



app2.controller('BtnCtrl', function ($scope) {
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;

    $scope.googleUrl = 'http://google.com';

});

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

var app3 = angular.module('rzSliderDemo', ['rzModule', 'ui.bootstrap']);
app3.controller('MainCtrl', function ($scope, $rootScope, $timeout, $modal) {
    //Minimal slider config
    $scope.minSlider = {
        value: 10
    };
    //Slider config with custom display function
    $scope.calories = {
        minValue: 2100,
        maxValue: 2900,
        options: {
            ceil: 4000,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.proteins = {
        minValue: 40,
        maxValue: 70,
        options: {
            ceil: 200,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.carb = {
        minValue: 250,
        maxValue: 450,
        options: {
            ceil: 1000,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.fats = {
        minValue: 60,
        maxValue: 70,
        options: {
            ceil: 100,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.cholesterol = {
        minValue: 50,
        maxValue: 80,
        options: {
            ceil: 300,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };
});

angular.element(document).ready(function () {
    var myDiv1 = document.getElementById("all_modules");
    angular.bootstrap(myDiv1, ["inputBasicDemo", "rzSliderDemo"]);
});
