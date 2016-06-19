/**
 * Created by Chanawatn Pound on 02-Jun-16.
 */
//var bodyparser = require('../node_modules/body-parser');

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
                        }
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            }
        }]);
})();
//End Test UploadPic

var app2 = angular.module("inputBasicDemo", ['ngMaterial', 'ngMessages', 'rzModule']);

var url = "http://localhost:4000";

//app2.use(bodyparser());

app2.factory('getUserData', ['$http', function ($http) {
    //Create request for User data then send it to other Controller
    //More info http://stackoverflow.com/questions/33843861/why-is-this-factory-returning-a-state-object-instead-of-response-data
    //localStorage.loginChefAtHomeEmail = "chanawatnpound@gmail.com"
    var this_email = "";
    console.log(localStorage.loginChefAtHomefullname)
    console.log(localStorage.loginChefAtHomefirstname)
    console.log(localStorage.loginChefAtHomelastname)
    console.log(localStorage.loginChefAtHomeimage)
    console.log(localStorage.loginChefAtHomeEmail);
    if (localStorage.loginChefAtHomeEmail) {
        //if already logged in
        this_email = localStorage.loginChefAtHomeEmail;
    } else {
        //link back to homepage on accessing unauthorized url
        window.location.href = "http://localhost:4000/"
    }
    return $http.post(url + "/list/user", {email: this_email})
        .then(function (response) {
            //console.log(response.data);
            return response.data;
        });
}]);


//Test Credit Cards
(function () {

    app2.provider('creditCardInput', function () {

        // getUserData.then(function (user) {
        //     $scope.name = user;
        //     $scope.data.cb1 = user[0].vegetarian;
        //     console.log("vegetarian: " + $scope.data.cb1)
        // });

        var _amex, _discover, _master, _visa;
        _amex = 'amex';
        _visa = 'visa';
        _master = 'master';
        _discover = 'discover';
        this.setCardClasses = function (cardClassObj) {
            _amex = cardClassObj.americanExpress || 'amex';
            _visa = cardClassObj.visa || 'visa';
            _master = cardClassObj.masterCard || 'master';
            return _discover = cardClassObj.discoverCard || 'discover';
        };
        this.$get = function () {
            return {
                americanExpressClass: _amex,
                visaClass: _visa,
                masterCardClass: _master,
                discoverCardClass: _discover,
                cardClasses: [_amex, _visa, _master, _discover].join(' ')
            };
        };
        return this;
    }).directive('type', [
        'creditCardInput', function (creditCardInput) {
            return {
                require: '?ngModel',
                link: function (scope, el, attrs, ngModel) {
                    var amexFormat, cvcParse, easeDelete, formField, format, inputType, parse, standardFormat, validity;
                    inputType = attrs.ngType || attrs.type;
                    if (!ngModel) {
                        return;
                    }
                    if (!(inputType === 'credit card' || inputType === 'cvc')) {
                        return;
                    }
                    if (inputType === 'cvc') {
                        el.on('blur keyup change', function (e) {
                            return scope.$apply(function () {
                                var text;
                                if (!(text = el.val())) {
                                    return;
                                }
                                ngModel.$setViewValue(text);
                                return el.val(cvcParse(ngModel.$viewValue));
                            });
                        });
                        cvcParse = function (val) {
                            var value;
                            value = val != null ? val.replace(/([^\d])*/g, '').slice(0, 4) : void 0;
                            ngModel.$setValidity('minlength', value.length >= 3 || ngModel.$isEmpty(value));
                            return value;
                        };
                        return ngModel.$parsers.push(cvcParse);
                    } else {
                        formField = el.parent();
                        el.on('blur keyup change', function (e) {
                            return scope.$apply(function () {
                                var text;
                                if (!(text = el.val())) {
                                    return;
                                }
                                ngModel.$setViewValue(text);
                                return el.val(format(ngModel.$viewValue));
                            });
                        });
                        parse = function (val) {
                            var ref, ref1;
                            validity(val);
                            if (formField.hasClass(creditCardInput.americanExpressClass)) {
                                return (ref = val.replace(/([^\d])*/g, '').slice(0, 15)) != null ? ref : '';
                            } else {
                                return (ref1 = val.replace(/([^\d])*/g, '').slice(0, 16)) != null ? ref1 : '';
                            }
                        };
                        ngModel.$parsers.push(parse);
                        format = function (text) {
                            var num, regAmex, regDisc, regMast, regVisa;
                            if (!text) {
                                ngModel.$setPristine();
                                return;
                            }
                            num = text.replace(/([^\d\s])*/g, '');
                            regAmex = new RegExp("^(34|37)");
                            regVisa = new RegExp("^4");
                            regMast = new RegExp("^5[1-5]");
                            regDisc = new RegExp("^60");
                            if (num.length < 2) {
                                formField.removeClass(creditCardInput.cardClasses);
                            }
                            if (num.length === 2) {
                                formField.addClass((function () {
                                    switch (false) {
                                        case !regAmex.test(num):
                                            return creditCardInput.americanExpressClass;
                                        case !regVisa.test(num):
                                            return creditCardInput.visaClass;
                                        case !regMast.test(num):
                                            return creditCardInput.masterCardClass;
                                        case !regDisc.test(num):
                                            return creditCardInput.discoverCardClass;
                                    }
                                })());
                            }
                            if (regAmex.test(num)) {
                                return amexFormat(num);
                            } else {
                                return standardFormat(num);
                            }
                        };
                        standardFormat = function (num) {
                            if (num[14] === ' ') {
                                if (num.length > 18) {
                                    return num.slice(0, 19);
                                }
                            }
                            if ((num.length === 5 || num.length === 10 || num.length === 15) && num[num.length - 1] !== ' ') {
                                return num.slice(0, -1) + ' ' + num[num.length - 1];
                            } else if ((num.length === 6 || num.length === 11 || num.length === 16) && num[num.length - 2] !== ' ') {
                                return num.slice(0, -2) + ' ' + num.slice(num.length - 2);
                            } else if ((num.length === 7 || num.length === 12 || num.length === 17) && num[num.length - 3] !== ' ') {
                                return num.slice(0, -3) + ' ' + num.slice(num.length - 3);
                            } else if ((num.length === 8 || num.length === 13 || num.length === 18) && num[num.length - 4] !== ' ') {
                                return num.slice(0, -4) + ' ' + num.slice(num.length - 4);
                            } else if ((num.length === 9 || num.length === 14 || num.length === 19) && num[num.length - 5] !== ' ') {
                                return num.slice(0, -5) + ' ' + num.slice(num.length - 5);
                            } else {
                                return easeDelete(num);
                            }
                        };
                        amexFormat = function (num) {
                            if (num.length > 16) {
                                return num.slice(0, 17);
                            }
                            if ((num.length === 5 || num.length === 12) && num[num.length - 1] !== ' ') {
                                return num.slice(0, -1) + ' ' + num[num.length - 1];
                            } else if ((num.length === 6 || num.length === 13) && num[num.length - 2] !== ' ') {
                                return num.slice(0, -2) + ' ' + num.slice(num.length - 2);
                            } else if ((num.length === 7 || num.length === 14) && num[num.length - 3] !== ' ') {
                                return num.slice(0, -3) + ' ' + num.slice(num.length - 3);
                            } else if ((num.length === 8 || num.length === 15) && num[num.length - 4] !== ' ') {
                                return num.slice(0, -4) + ' ' + num.slice(num.length - 4);
                            } else if ((num.length === 9 || num.length === 16) && num[num.length - 5] !== ' ') {
                                return num.slice(0, -5) + ' ' + num.slice(num.length - 5);
                            } else {
                                return easeDelete(num);
                            }
                        };
                        easeDelete = function (num) {
                            if (num[num.length - 1] === ' ') {
                                return num.slice(0, -1);
                            } else {
                                return num;
                            }
                        };
                        return validity = function (text) {
                            var luhnArr, sum;
                            luhnArr = [[0, 2, 4, 6, 8, 1, 3, 5, 7, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]];
                            sum = 0;
                            text.replace(/\D+/g, "").replace(/[\d]/g, function (c, p, o) {
                                return sum += luhnArr[(o.length - p) & 1][parseInt(c, 10)];
                            });
                            return ngModel.$setValidity('mod10', !!(sum % 10 === 0 && sum > 0) || ngModel.$isEmpty(text));
                        };
                    }
                }
            };
        }
    ]);

}).call(this);
//End Test Credit Cards

//test drag&drop
(function () {

    app2.directive('draggable', function () {
        return function (scope, element) {
            // this gives us the native JS object
            var el = element[0];

            el.draggable = true;

            el.addEventListener(
                'dragstart',
                function (e) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('Text', this.id);
                    this.classList.add('drag');
                    console.log("Remove old: " + this.id);
                    console.log("From id: " + this.classList + "..");
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragend',
                function (e) {
                    this.classList.remove('drag');
                    console.log("add new: " + this.id);
                    return false;
                },
                false
            );
        }
    });

    app2.directive('droppable', function () {
        return {
            scope: {
                drop: '&',
                bin: '='
            },
            link: function (scope, element) {
                // again we need the native object
                var el = element[0];

                el.addEventListener(
                    'dragover',
                    function (e) {

                        e.dataTransfer.dropEffect = 'move';
                        // allows us to drop
                        if (e.preventDefault) e.preventDefault();
                        this.classList.add('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'dragenter',
                    function (e) {
                        this.classList.add('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'dragleave',
                    function (e) {
                        this.classList.remove('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'drop',
                    function (e) {
                        // Stops some browsers from redirecting.
                        if (e.stopPropagation) e.stopPropagation();

                        this.classList.remove('over');

                        var binId = this.id;
                        console.log("To id: " + this.id + "..");
                        var item = document.getElementById(e.dataTransfer.getData('Text'));
                        this.appendChild(item);
                        //console.log("newItem: "+item.getAttribute())
                        // call the passed drop function
                        scope.$apply(function (scope) {
                            var fn = scope.drop();
                            if ('undefined' !== typeof fn) {
                                fn(item.id, binId);

                            }
                        });

                        return false;
                    },
                    false
                );
            }
        }
    });

    app2.controller('DragDropCtrl', function ($scope) {

    });

})();
//end test drag&drop

//Test Calendar
app2.controller("calendarCtrl", function($scope, $filter) {
    $scope.selectedDate = null;
    $scope.firstDayOfWeek = 0;
    $scope.setDirection = function(direction) {
        $scope.direction = direction;
    };
    $scope.dayClick = function(date) {
        $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
    };
    $scope.prevMonth = function(data) {
        $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };
    $scope.nextMonth = function(data) {
        $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };
    $scope.setDayContent = function(date) {
        // You would inject any HTML you wanted for
        // that particular date here.
        return "<p></p>";
    };
});
//End Test Calendar

app2.controller('MainCtrl', ['$scope', 'getUserData', '$http', function ($scope, getUserData, $http, $rootScope, $timeout, $modal) {
    $scope.formStatus = true; //comment out after testing

    //pre-define user's variables
    $scope.user = {
        firstname: '',
        lastname: '',
        password: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        cvc: '',
        validityDate: '',
        vegetarian: false,
        halal: false,
        height: '',
        weight: '',
        profilePicture: null
    };

    $scope.imageurl = "";
    $scope.imageurl_bak = "";

    //this will call factory
    getUserData.then(function (user) {
        $scope.name = user;
        //$scope.user.password = user[0].password;
        $scope.user.firstname = user[0].firstname;
        $scope.user.lastname = user[0].lastname;
        $scope.user.email = user[0].email;
        $scope.user.address = user[0].address[0].address1;
        $scope.user.address2 = user[0].address[1].address2;
        $scope.user.city = user[0].address[2].city;
        $scope.user.postalCode = user[0].address[3].postalcode;
        $scope.user.cardNumber = user[0].cardNumber;
        $scope.project.height = user[0].height;
        $scope.project.weight = user[0].weight;
        cardno = user[0].cardNumber;
        //console.log("cardno: " + cardno);
        $scope.user.cvc = user[0].cvc;
        $scope.user.profilePicture = user[0].profilePicture.data;
        $scope.user.validityDate = new Date(user[0].validityDate);
        $scope.imageurl_bak = user[0].imageurl
        if (user[0].profilePicture.data != null) {
            $scope.imageurl = user[0].profilePicture.data;
        } else if( user[0].imageurl != null){
            $scope.imageurl = user[0].imageurl
            $scope.imageurl_bak = user[0].imageurl
            //console.log($scope.imageurl_bak)
        }else{
            $scope.imageurl = localStorage.loginChefAtHomeimage
        }
        $scope.user.vegetarian = user[0].vegetarian;
        $scope.user.halal = user[0].halal;
        $scope.myDate = new Date();
        //$scope.myDate = user[0].birthdate;
        $scope.myDate = new Date(user[0].birthdate);
    });

    //Birthdate

    //$scope.myDate = new Date();

    //End Birthdate

    //Title

    /*    $scope.titles = ('Mr. ' +
     'Mrs. Miss ').split(' ').map(function (title) {
     return {abbrev: title};
     });*/

    //End Title

    //Slider

    var vm = this;
    //Minimal slider config
    $scope.minSlider = {
        value: 10
    };
    //Slider config with custom display function
    $scope.calories = {
        // minValue: 2100,
        // maxValue: 2900,
        options: {
            ceil: 4000,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.proteins = {
        // minValue: 40,
        // maxValue: 70,
        options: {
            ceil: 200,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.carb = {
        // minValue: 250,
        // maxValue: 450,
        options: {
            ceil: 1000,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.fats = {
        // minValue: 60,
        // maxValue: 70,
        options: {
            ceil: 100,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    $scope.cholesterols = {
        // minValue: 50,
        // maxValue: 80,
        options: {
            ceil: 300,
            floor: 0,
            translate: function (value) {
                return value;
            }
        }
    };

    getUserData.then(function (user) {
        $scope.name = user;
        //$scope.imageurl = user[0].imageurl;
        //console.log(user[0].imageurl)
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

    //Nutritions

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
    }];
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

    //End Nutrition

    //Password

    $scope.inputType = 'password';

    // Hide & show password function
    $scope.hideShowPassword = function () {
        if ($scope.inputType == 'password')
            $scope.inputType = 'text';
        else
            $scope.inputType = 'password';
    };

    //End Password

    //HealthCond
    $scope.healthcons = [{
        category: 'commoncon',
        name: 'High Blood Pressure'
    }, {
        category: 'commoncon',
        name: 'Diabetes'
    }, {
        category: 'commoncon',
        name: 'Anemia'
    }, {
        category: 'commoncon',
        name: 'High Cholesterol'
    }];
    $scope.selectedHealthCon = [];
    $scope.printSelectedHealthCons = function printSelectedHealthCons() {
        var numberOfHealthCons = this.selectedHealthCon.length;

        // If there is more than one topping, we add an 'and'
        // to be gramatically correct. If there are 3+ toppings
        // we also add an oxford comma.
        if (numberOfHealthCons > 1) {
            var needsOxfordComma = numberOfHealthCons > 2;
            var lastHealthConConjunction = (needsOxfordComma ? ',' : '') + ' and ';
            var lastHealthCon = lastHealthConConjunction +
                this.selectedHealthCon[this.selectedHealthCon.length - 1];
            return this.selectedHealthCon.slice(0, -1).join(', ') + lastHealthCon;
        }

        return this.selectedHealthCon.join('');
    };
    //End HealthCond

    //Extra
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;
    $scope.googleUrl = 'http://google.com';
    $scope.project = {
        description: 'Nuclear Missile Defense System',
    };

    //NoPrefs

    $scope.notprefs = [{
        category: 'dairyprod',
        name: 'Cheese'
    }, {
        category: 'dairyprod',
        name: 'Yoghurt'
    }, {
        category: 'dairyprod',
        name: 'Butter'
    }, {
        category: 'dairyprod',
        name: 'Milk'
    }, {
        category: 'dairyprod',
        name: 'Custard'
    }, {
        category: 'dairyprod',
        name: 'Magarine'
    }, {
        category: 'dairyprod',
        name: 'Cream'
    }, {
        category: 'dairyprod',
        name: 'Ice cream'
    }, {
        category: 'dairyprod',
        name: 'Egg'
    }, {
        category: 'seafood',
        name: 'Shrimp'
    }, {
        category: 'seafood',
        name: 'Crab'
    }, {
        category: 'seafood',
        name: 'Lobster'
    }, {
        category: 'seafood',
        name: 'Fish'
    }, {
        category: 'seafood',
        name: 'Oyster'
    }, {
        category: 'seafood',
        name: 'Clam'
    }, {
        category: 'seafood',
        name: 'Squid'
    }, {
        category: 'seafood',
        name: 'Shrimp'
    }, {
        category: 'seafood',
        name: 'Octopus'
    }, {
        category: 'seafood',
        name: 'Scallop'
    }];
    $scope.selectedNotPref = [];
    $scope.printSelectedNotPrefs = function printSelectedNotPrefs() {
        var numberOfSelectedNotPrefs = this.selectedNotPref.length;

        // If there is more than one topping, we add an 'and'
        // to be gramatically correct. If there are 3+ toppings
        // we also add an oxford comma.
        if (numberOfNotPrefs > 1) {
            var needsOxfordComma = numberOfNotPrefs > 2;
            var lastNotPrefConjunction = (needsOxfordComma ? ',' : '') + ' and ';
            var lastNotPref = lastNotPrefConjunction +
                this.selectedNotPref[this.selectedNotPref.length - 1];
            return this.selectedNotPref.slice(0, -1).join(', ') + lastNotPref;
        }

        return this.selectedNotPref.join('');
    };

    //End NoPrefs

    $scope.checkElementToUpdate = function () {
        if ($scope.user.firstname != "" &&
            $scope.user.lastname != "" &&
            $scope.project.height != "" &&
            $scope.project.weight != "" &&
            $scope.user.email != "" &&
            $scope.user.password != "" &&
            $scope.user.address != "" &&
            $scope.user.city != "" &&
            $scope.user.postalCode != "") {
            $scope.confirmUpdateProfile();

        } else {

            var dialog = document.getElementById("incomplete");
            if (dialog) {
                dialog.open();
            }
        }
    }

    $scope.confirmUpdateProfile = function () {

        var dialog = document.getElementById("confirm-update");
        if (dialog) {
            dialog.open();
        }
    }


    $scope.showSuccess = function (email) {

        var dialog = document.getElementById("update-success");
        if (dialog) {
            dialog.open();
        }
    }

    $scope.showFailed = function (err) {

        if (err = "Error Updating") {
            var dialog = document.getElementById("db-error");
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

    $scope.updateProfile = function () {
        var birthdate = $scope.myDate.toISOString()
        var valid_date = $scope.user.validityDate.toISOString()
        console.log($scope.user.profilePicture)
        return $http.post(url + "/api/update/profile", {
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email,
            password: $scope.user.password,
            birthdate: birthdate,
            imageurl: $scope.imageurl_bak,
            profilePicture: $scope.user.profilePicture.data,
            height: $scope.project.height,
            weight: $scope.project.weight,
            address1: $scope.user.address,
            address2: $scope.user.address2,
            city: $scope.user.city,
            postalcode: $scope.user.postalCode,
            vegetarian: $scope.user.vegetarian,
            halal: $scope.user.halal,
            cardNumber: $scope.user.cardNumber,
            cvc: $scope.user.cvc,
            validityDate: valid_date,
            nutritionRange: [
                {
                    name: "Calories",
                    minValue: $scope.calories.minValue,
                    maxValue: $scope.calories.maxValue
                },
                {
                    name: "Proteins",
                    minValue: $scope.proteins.minValue,
                    maxValue: $scope.proteins.maxValue
                },
                {
                    name: "Carbohydrates",
                    minValue: $scope.carb.minValue,
                    maxValue: $scope.carb.maxValue
                },
                {
                    name: "Fats",
                    minValue: $scope.fats.minValue,
                    maxValue: $scope.fats.maxValue
                },
                {
                    name: "Cholesterols",
                    minValue: $scope.cholesterols.minValue,
                    maxValue: $scope.cholesterols.maxValue
                }
            ]

        }).then(function (response) {

            console.log(response.data.success);

            if (response.data.success = true) {
                $scope.showSuccess($scope.user.email);
            } else {
                $scope.showFailed("Error Updating");
            }

        });
    }

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
    angular.bootstrap(myDiv1, ["inputBasicDemo", "ng-file-model"]);
});