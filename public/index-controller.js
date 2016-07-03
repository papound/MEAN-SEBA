/**
 * Created by Jaupat Ch on 04-Jun-16.
 */
var app2 = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages']);

var url = "http://localhost:4000"

app2.controller('loginCtrl', function ($scope, $http) {
    
    $scope.firstname = localStorage.loginChefAtHomefirstname;
    //$scope.firstname = "Chanawatn";

    $scope.openProfile = function () {
        setTimeout(1000);
        window.location.href = "http://localhost:4000/main-profile"
    };

    $scope.signout = function () {
        console.log("email before signout="+localStorage.loginChefAtHomeEmail);
        localStorage.removeItem('loginChefAtHomeEmail');
        console.log("email after signout="+localStorage.loginChefAtHomeEmail);
        //localStorage.removeItem('current_ingredient');
        setTimeout(1000);
        window.location.href = "http://localhost:4000/"
    };

    $scope.user = {
        email: '',
        password: ''
        //test: 'hello'
    };

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