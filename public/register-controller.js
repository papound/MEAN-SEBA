/**
 * Created by Jaupat Ch on 04-Jun-16.
 */
var app2 = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages']);

var url = "http://localhost:4000"

app2.controller('formCtrl', function ($scope, $http) {

    $scope.status = '  ';

    $scope.register = {
        firstname: "Sam",
        lastname: "Smith",
        birthdate: "",
        telephone: "0123456789",
        email: "sam@smith.com",
        password: "",
        confirmpassword: "",
        address: [
            {
                name: "123 Oxford Str."
            },
            {
                name: ""
            },
            {
                name: "Munich, Germany"
            },
            {
                name: "80939"
            }
        ]
    }

    $scope.showSuccess = function (firstname, email) {

        var dialog = document.getElementById("regis-success");
        if (dialog) {
            dialog.open();
        }
    }

    $scope.showFailed = function (err) {
        if (err == "Incorrect Password!") {

            var dialog = document.getElementById("incorrect-pass");
            if (dialog) {
                dialog.open();
            }

        } else {
            var dialog = document.getElementById("incomplete");
            if (dialog) {
                dialog.open();
            }
        }
    }

    // Set the default value of inputType
    $scope.inputType = 'password';

    // Hide & show password function
    $scope.hideShowPassword = function () {
        if ($scope.inputType == 'password')
            $scope.inputType = 'text';
        else
            $scope.inputType = 'password';
    };

    $scope.submit = function () {
        if ($scope.register.password == $scope.register.confirmpassword) {
            if ($scope.register.firstname == "" ||
                $scope.register.lastname == "" ||
                $scope.register.telephone == "" ||
                $scope.register.birthdate == "" ||
                $scope.register.email == "" ||
                $scope.register.address[0].name == "" ||
                $scope.register.address[2].name == "" ||
                $scope.register.address[3].name == "")
            {
                $scope.showFailed("Incomplete Credentials!");
            } else {
                //alert("Ready to Submit!");
                return $http.post(url + "/api/register", {
                    firstname: $scope.register.firstname,
                    lastname: $scope.register.lastname,
                    email: $scope.register.email,
                    password: $scope.register.password,
                    telephone: $scope.register.telephone,
                    birthdate: $scope.register.birthdate.toISOString,
                    address1: $scope.register.address[0].name,
                    address2: $scope.register.address[1].name,
                    city: $scope.register.address[2].name,
                    postalcode: $scope.register.address[3].name
                }).then(function (response) {

                    console.log(response.data.success);

                    localStorage.loginChefAtHomeEmail = $scope.register.email
                    console.log("Localstorage Email: " + localStorage.loginChefAtHomeEmail);
                    localStorage.loginChefAtHomefirstname = $scope.register.firstname
                    $scope.showSuccess($scope.register.firstname, $scope.register.email);

                });
            }
        } else {
            $scope.showFailed("Incorrect Password!");
        }
    }


})

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