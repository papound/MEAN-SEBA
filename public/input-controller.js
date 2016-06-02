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

app2.controller('DateCtrl', function($scope) {
    $scope.myDate = new Date();
    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() - 2,
        $scope.myDate.getDate());
    $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() + 2,
        $scope.myDate.getDate());
    $scope.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    }
})

app2.controller('Chk1Ctrl', function($scope) {
    $scope.data = {};
    $scope.data.cb1 = true;
    $scope.data.cb2 = false;
    $scope.data.cb3 = false;
    $scope.data.cb4 = false;
    $scope.data.cb5 = false;
    $scope.data.extra = "";
})

app2.controller('Chk2Ctrl', function($scope) {
    $scope.data2 = {};
    $scope.data2.cb1 = true;
    $scope.data2.cb2 = false;
    $scope.data2.cb3 = false;
    $scope.data2.extra = "";
})

    .config(function ($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });
    