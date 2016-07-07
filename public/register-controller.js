/**
 * Created by Jaupat Ch on 04-Jun-16.
 */
var app2 = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages', 'ion.rangeslider']);

var url = "http://localhost:4000";

// //Test UploadPic
(function () {
    'use strict';
    angular.module('ng-file-model', [])
        .directive("ngFileModel", [function () {
            return {
                scope: {
                    ngFileModel: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.ngFileModel = {
                                    lastModified: changeEvent.target.files[0].lastModified,
                                    lastModifiedDate: changeEvent.target.files[0].lastModifiedDate,
                                    name: changeEvent.target.files[0].name,
                                    size: changeEvent.target.files[0].size,
                                    type: changeEvent.target.files[0].type,
                                    data: loadEvent.target.result
                                };
                            });
                        };
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            }
        }]);
})();
//End Test UploadPic

app2.controller("Controller", function ($scope) {

    $scope.model = {
        age: {
            min: 18,
            max: 99
        }
    }
});

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

app2.controller('formCtrl', function ($scope, $http) {

    $scope.status = '';

    $scope.register = {
        firstname: "",
        lastname: "",
        birthdate: "",
        telephone: "",
        email: "",
        profilePicture: null,
        password: "",
        confirmpassword: "",
        address: [
            {
                name: ""
            },
            {
                name: ""
            },
            {
                name: ""
            },
            {
                name: ""
            }
        ]
    };

    $scope.showSuccess = function (firstname, email) {

        var dialog = document.getElementById("regis-success");
        if (dialog) {
            dialog.open();
        }
    };

    $scope.showFailed = function (err) {
        if (err == "Incorrect Password!") {

            var dialog = document.getElementById("incorrect-pass");
            if (dialog) {
                dialog.open();
            }

        } else if(err == "incomplete"){
            var dialog = document.getElementById("incomplete");
            if (dialog) {
                dialog.open();
            }
        }else {
            var dialog = document.getElementById("noProfilePic");
            if (dialog) {
                dialog.open();
            }
        }
    };

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
                $scope.register.address[3].name == "" ||
                $scope.register.profilePicture == null)
            {
                if($scope.register.profilePicture == null){
                    $scope.showFailed("No Profile Picture!");
                }else{
                    $scope.showFailed("Incomplete Credentials!");
                }
            } else {
                //alert("Ready to Submit!");
                if($scope.register.profilePicture.lastModified != null){
                    console.log("data 6 elements");
                    $scope.register.profilePicture = $scope.register.profilePicture.data;
                    console.log("changed to data 2 elements");
                    return $http.post(url + "/api/register", {
                        firstname: $scope.register.firstname,
                        lastname: $scope.register.lastname,
                        email: $scope.register.email,
                        password: $scope.register.password,
                        telephone: $scope.register.telephone,
                        profilePicture: $scope.register.profilePicture,
                        birthdate: $scope.register.birthdate.toISOString,
                        address1: $scope.register.address[0].name,
                        address2: $scope.register.address[1].name,
                        city: $scope.register.address[2].name,
                        postalcode: $scope.register.address[3].name
                    }).then(function (response) {

                        console.log(response.data.success);

                        localStorage.loginChefAtHomeEmail = $scope.register.email;
                        console.log("Localstorage Email: " + localStorage.loginChefAtHomeEmail);
                        localStorage.loginChefAtHomefirstname = $scope.register.firstname;
                        $scope.showSuccess($scope.register.firstname, $scope.register.email);

                    });
                }else{
                    console.log("data 2 elements");
                    return $http.post(url + "/api/register", {
                        firstname: $scope.register.firstname,
                        lastname: $scope.register.lastname,
                        email: $scope.register.email,
                        password: $scope.register.password,
                        telephone: $scope.register.telephone,
                        profilePicture: $scope.register.profilePicture,
                        birthdate: $scope.register.birthdate.toISOString,
                        address1: $scope.register.address[0].name,
                        address2: $scope.register.address[1].name,
                        city: $scope.register.address[2].name,
                        postalcode: $scope.register.address[3].name
                    }).then(function (response) {

                        console.log(response.data.success);

                        localStorage.loginChefAtHomeEmail = $scope.register.email;
                        console.log("Localstorage Email: " + localStorage.loginChefAtHomeEmail);
                        localStorage.loginChefAtHomefirstname = $scope.register.firstname;
                        $scope.showSuccess($scope.register.firstname, $scope.register.email);

                    });
                }
            }
        } else {
            $scope.showFailed("Incorrect Password!");
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
    angular.bootstrap(myDiv1, ["inputBasicDemo", "ng-file-model"]);
});