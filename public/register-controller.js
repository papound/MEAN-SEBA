/**
 * Created by Jaupat Ch on 04-Jun-16.
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


app2.controller('DemoCtrl', function($scope) {
    $scope.user = {
        title: '',
        firstName: '',
        familyName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        postalCode: ''
    };

    $scope.titles = ('Mr. ' +
    'Mrs. Miss ').split(' ').map(function(title) {
        return {abbrev: title};
    });
});

app2.controller('PassCtrl', ['$scope', function ($scope) {

    // Set the default value of inputType
    $scope.inputType = 'password';

    // Hide & show password function
    $scope.hideShowPassword = function () {
        if ($scope.inputType == 'password')
            $scope.inputType = 'text';
        else
            $scope.inputType = 'password';
    };
}]);

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


angular.element(document).ready(function () {
    var myDiv1 = document.getElementById("all_modules");
    angular.bootstrap(myDiv1, ["inputBasicDemo"]);
});