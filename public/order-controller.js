/**
 * Created by Pimprapai on 13-06-16.
 */
var app2 = angular.module("materialExample", ["ngMaterial", "materialCalendar"]);

var url = "http://localhost:4000";

//Test CURRENT function Data initialize
// var current_dish =
//     [
//         {
//             "name": "Caesar Salad",
//             "amount": 3,
//             "price": 3.00
//         },
//         {
//             "name": "Dish 2",
//             "amount": 3,
//             "price": 5.00
//         },
//         {
//             "name": "Dish 3",
//             "amount": 1,
//             "price": 7.00
//         }
//
//     ]
// var current_ingredient =
//     [
//         {
//             "name": "Butter",
//             "amount": 150,
//             "price": 3.95
//         },
//         {
//             "name": "Mustard",
//             "amount": 50,
//             "price": 15.00
//         },
//         {
//             "name": "Black Pepper",
//             "amount": 20,
//             "price": 10.00
//         }
//
//     ]

//var to localStorage
//localStorage.setItem('current_dish', JSON.stringify(current_dish));
var retrieve_dish = localStorage.getItem('current_dish');  //String
console.log('local_current_dish: ',JSON.parse(retrieve_dish));

//localStorage.setItem('current_ingredient', JSON.stringify(current_ingredient));
var retrieve_ingredient = localStorage.getItem('current_ingredient'); //String
console.log('local_current_ingredient: ',JSON.parse(retrieve_ingredient));
//End var to localStorage

app2.factory('getOrderData', ['$http', function ($http) {
    //Create request for Order data then send it to other Controller
    //More info http://stackoverflow.com/questions/33843861/why-is-this-factory-returning-a-state-object-instead-of-response-data
    //localStorage.loginChefAtHomeEmail = "chanawatnpound@gmail.com";
    var this_email = "";

    if (localStorage.loginChefAtHomeEmail) {
        //if already logged in
        this_email = localStorage.loginChefAtHomeEmail;
    } else {
        //link back to homepage on accessing unauthorized url
        window.location.href = "http://localhost:4000/"
    }
    
    return $http.post(url + "/list/order", {customer: this_email})
        .then(function (response) {
            return response.data;
        });
}]);

app2.factory('getUserData', ['$http', function ($http) {
    //Create request for Order data then send it to other Controller
    //More info http://stackoverflow.com/questions/33843861/why-is-this-factory-returning-a-state-object-instead-of-response-data
    //localStorage.loginChefAtHomeEmail = "chanawatnpound@gmail.com";
    var this_email = "";

    if (localStorage.loginChefAtHomeEmail) {
        //if already logged in
        this_email = localStorage.loginChefAtHomeEmail;
    } else {
        //link back to homepage on accessing unauthorized url
        window.location.href = "http://localhost:4000/"
    }

    return $http.post(url + "/list/user", {email: this_email})
        .then(function (response) {
            return response.data;
        });
}]);

//Calendar controller
//app2.controller("calendarCtrl", function ($scope, $filter, $q, $timeout, $log, MaterialCalendarData) {
app2.controller('calendarCtrl', function ($scope, getOrderData, getUserData, $filter, $q, $timeout, $log, MaterialCalendarData, $http) {
    //Check Credit Card, CVC Status
    getUserData.then(function (user) {
        $scope.user = {
            cardNumber : user[0].cardNumber,
            cvc : user[0].cvc
        };

        //$scope.user.cardNumber = ""
        
        if($scope.user.cardNumber == "" || $scope.user.cvc == "" || !user[0].cardNumber || !user[0].cvc){
            $('#creditcard').attr('disabled', 'true');
        }
    });
    //End Check Credit Card, CVC Status

    $scope.order_status = true
    if(localStorage.current_dish && localStorage.current_ingredient){
        $scope.order_status = true
        console.log($scope.order_status)
        //CURRENT Scope
        $scope.amount = '';
        $scope.totalIngredients = 0;
        $scope.itemTotal = 0;
        $scope.paymentType = "cash";

        $scope.dishes = JSON.parse(retrieve_dish); //parse back to JSON Object
        $scope.ingredients = JSON.parse(retrieve_ingredient); //parse back to JSON Object

        //Set Price Ratio of Dishes
        var ratio = 0;
        for(var i=0 ; i< $scope.dishes.length; i++){
            ratio = ($scope.dishes[i].price / $scope.dishes[i].amount)*1.00;
            $scope.dishes[i]["ratio"] = ratio
        }
        console.log("Scope Dishes");
        console.log($scope.dishes);
        //Set Price Ratio of Dishes

        //Set Price Ratio of Ingredients
        var ratio = 0;

        for(var i=0 ; i< $scope.ingredients.length; i++){
            ratio = ($scope.ingredients[i].price / $scope.ingredients[i].amount)*1.00;
            $scope.ingredients[i]["ratio"] = ratio
        }
        console.log("Scope Ingredients");
        console.log($scope.ingredients);
        //Set Price Ratio of Ingredients

        //calculate total price of current order
        $scope.calTotalPrice = function () {
            $scope.totalprice = 0;
            for(var i =0; i<$scope.dishes.length ; i++){
                $scope.totalprice += $scope.dishes[i].price;
                //console.log("tt="+totalprice);
            }
            for(var i =0; i<$scope.ingredients.length ; i++){
                $scope.totalprice += $scope.ingredients[i].price;
                //console.log("tt="+totalprice);
            }
            console.log("Total Price: "+$scope.totalprice);
        };
        //end calculate

        $scope.calTotalPrice(); //Calculate totalPrice

        //Change Quantity
        $scope.quantityChanged = function(dishName){
            console.debug(this.amount);
            //console.debug(this.price);
            for(var i=0 ; i< $scope.dishes.length; i++){
                if($scope.dishes[i]["name"] == dishName){
                    $scope.dishes[i]["amount"] = this.amount;
                    $scope.dishes[i]["price"] = this.amount * $scope.dishes[i]["ratio"];
                    localStorage.setItem('current_dish', JSON.stringify($scope.dishes));
                    console.log(dishName+"'s amount changed to "+this.amount);
                    console.log(dishName+"'s price also changed to "+($scope.dishes[i]["price"]).toFixed(2));
                }
            }
            for(var i=0 ; i< $scope.ingredients.length; i++){
                if($scope.ingredients[i]["name"] == dishName){
                    $scope.ingredients[i]["amount"] = this.amount;
                    $scope.ingredients[i]["price"] = this.amount * $scope.ingredients[i]["ratio"];
                    localStorage.setItem('current_ingredient', JSON.stringify($scope.ingredients));
                    console.log(dishName+"'s amount changed to "+this.amount);
                    console.log(dishName+"'s price also changed to "+($scope.ingredients[i]["price"]).toFixed(2));
                }
            }
            $scope.calTotalPrice()
        };
        //End Change Quantity
    }else{
        $scope.order_status = false;
        console.log($scope.order_status);
    }

    //console.log($scope.dishes)

    //pre-define order's variables
    $scope.order = {
        dateTime: [],
        status: [],
        totalPrice: [],
        orderItems: [],
        paymentType: [],
        paymentStatus: [],
        customer: []
    };

    $scope.show_date_dialog = "";
    //Variable for number of order
    var noOfOrder = {};
    //var for unique days with noOfOrder
    //var date_order = {};
    $scope.setContentViaService = function (date, name) {
        MaterialCalendarData.setDayContent(date, '<span><i class="material-icons">shopping_cart</i><span class="cal_order_color">' + "&nbsp;&nbsp;" + name + '</span></span>')
    }

    //initiate counter and Order List Array
    var count = 0;
    var orderList_arr = [];

    //this will call factory
    getOrderData.then(function (order) {

        $scope.setBasket = function (refresh) {

            if(refresh == "false"){
                noOfOrder = {};
                count = 0;
                orderList_arr = [];
                console.log("refresh")
            }else{}

            for (var i = 0; i < order.length; i++) {
                $scope.order.dateTime[i] = order[i].dateTime;
                $scope.order.status[i] = order[i].status;
                $scope.order.totalPrice[i] = order[i].totalPrice;
                $scope.order.orderItems[i] = order[i].orderItems;
                $scope.order.paymentType[i] = order[i].paymentType;
                $scope.order.paymentStatus[i] = order[i].paymentStatus;
                $scope.order.customer[i] = order[i].customer;
                console.log("i=" + i);
                //console.log("date=" + $scope.order.dateTime[i]);
                //console.log("customer=" + $scope.order.customer[i]);

                $scope.date_name = $scope.order.dateTime[i].substring(0, 10); //yyyy-mm-dd

                //field_name = specific date
                var field_name = $scope.date_name;

                //check no.of order for each day
                if (!noOfOrder[field_name]) {
                    //First Order of that day
                    count = 1;

                    //Modified time
                    var time_mod = new Date($scope.order.dateTime[i])
                    time_mod.setHours(time_mod.getHours() - 2);

                    var orderList = {
                        time: $filter("date")((time_mod), "HH:mm"),
                        items: $scope.order.orderItems[i],
                        price: $scope.order.totalPrice[i]
                    };

                    orderList_arr.push(orderList);

                    noOfOrder[field_name] = [{
                        "name": "1 ORDER",
                        "date": $scope.date_name,
                        "orderCount": count,
                        "orderItems": orderList_arr
                    }];

                } else {
                    //Next Order of that day
                    count = noOfOrder[field_name][0].orderCount + 1;

                    //Modified time
                    var time_mod = new Date($scope.order.dateTime[i])
                    time_mod.setHours(time_mod.getHours() - 2);

                    var orderList = {
                        time: $filter("date")((time_mod), "HH:mm"),
                        items: $scope.order.orderItems[i],
                        price: $scope.order.totalPrice[i]
                    };

                    orderList_arr = noOfOrder[field_name][0].orderItems;

                    orderList_arr.push(orderList);

                    noOfOrder[field_name] = [{
                        "name": count + " ORDERS",
                        "date": $scope.date_name,
                        "orderCount": count,
                        "orderItems": orderList_arr
                    }];
                }
                //end check no.of order for each day

                var date = new Date($scope.order.dateTime[i]);

                //write to calendar
                $scope.setContentViaService(date, noOfOrder[field_name][0].name);

                //reset counter
                count = 0;
                orderList_arr = []
                //console.log("noOfOrder["+field_name+"]: "+JSON.stringify(noOfOrder[field_name]))
            }
        }

        $scope.setBasket()

    });

    $scope.totalOrder = []

    //Place Order
    $scope.placeOrder = function () {

        for(var i=0; i<$scope.dishes.length; i++){
            //($scope.totalOrder).push($scope.dishes[i])
            if($scope.dishes[i].amount > 0){
                ($scope.totalOrder).push($scope.dishes[i])
            }
        }

        for(var i=0; i<$scope.ingredients.length; i++){
            //($scope.totalOrder).push($scope.ingredients[i])
            if($scope.ingredients[i].amount > 0){
                ($scope.totalOrder).push($scope.ingredients[i])
            }
        }

        console.log("$scope.totalOrder="+JSON.stringify($scope.totalOrder))

        if($scope.paymentType == "cash"){
            $scope.paymentStatus = false
        }else{
            $scope.paymentStatus = true
        }

        return $http.post(url + "/place/order", {
            customer: localStorage.loginChefAtHomeEmail,
            orderItems: $scope.totalOrder,
            paymentType: $scope.paymentType,
            paymentStatus: $scope.paymentStatus,
            totalPrice: $scope.totalprice

        }).then(function (response) {
            localStorage.removeItem('current_dish');
            localStorage.removeItem('current_ingredient');
            console.log(response.data);
            window.location.href = "http://localhost:4000/order"
        });
    };
    //End Place Order

    //Calendar part
    $scope.selectedDate = new Date();
    $scope.weekStartsOn = 0;
    $scope.dayFormat = "d";
    $scope.tooltips = true;
    $scope.disableFutureDates = false;


    //variables to display in Dialog box
    $scope.full_data = "";

    $scope.fullscreen = function () {
        var elem = document.querySelector("#calendar-demo");
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    };
    $scope.setDirection = function (direction) {
        $scope.direction = direction;
        $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };
    $scope.dayClick = function (date) {
        $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
        //console.log($scope.msg)
        $scope.show_date_dialog = $filter("date")(date, "MMM d, y");
        date.setDate(date.getDate() + 1);
        var dateInOrder = (date.toISOString()).substring(0, 10);
        //if there exists order(s)
        //console.log(dateInOrder)
        if (noOfOrder[dateInOrder]) {

            var open_span = '<span>';
            var close_span = "</span>";
            var data = "";


            for (var i = 0; i < (noOfOrder[dateInOrder][0].orderItems).length; i++) {
                //console.log("i="+i+",time="+noOfOrder[dateInOrder][0].orderItems[i].time+",length="+(noOfOrder[dateInOrder][0].orderItems.items).length);
                //$scope.outerTime[i] = noOfOrder[dateInOrder][0].orderItems[i].time;
                data += "<p><h5><i class='material-icons'>alarm</i><i>" + " <b>" + noOfOrder[dateInOrder][0].orderItems[i].time + "</b> &nbsp;&nbsp; <i class='material-icons'>euro_symbol</i> <b>" + noOfOrder[dateInOrder][0].orderItems[i].price + "</b></i></h5><br>";

                for (var j = 0; j < (noOfOrder[dateInOrder][0].orderItems[i].items).length; j++) {
                    //console.log("name=" + noOfOrder[dateInOrder][0].orderItems[i].items[j].name);
                    if( i == (noOfOrder[dateInOrder][0].orderItems).length -1 && j == (noOfOrder[dateInOrder][0].orderItems[i].items).length - 1){
                        data += noOfOrder[dateInOrder][0].orderItems[i].items[j].amount + " X " + noOfOrder[dateInOrder][0].orderItems[i].items[j].name;
                    }else{
                        data += noOfOrder[dateInOrder][0].orderItems[i].items[j].amount + " X " + noOfOrder[dateInOrder][0].orderItems[i].items[j].name + "<br>";
                    }

                }

                data += "<br></p>"
                //console.log("each="+);
            }
            //$scope.items_orderInDate = noOfOrder[dateInOrder][0].orderItems;
            $scope.full_data = open_span.concat(data).concat(close_span);
            console.log($scope.full_data)

            //alert("Orders");
            var dialog = document.getElementById("calendar_popup");
            if (dialog) {
                dialog.open();
            }
        }
    };
    $scope.prevMonth = function (data) {
        $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };
    $scope.nextMonth = function (data) {
        $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };
    // $scope.setContentViaService = function () {
    //     var today = new Date();
    //     MaterialCalendarData.setDayContent(today, '<span> :oD </span>')
    // }
    var holidays = {
        //"2016-06-14": [{"name": "2 orders", "country": "US", "date": "2016-06-14"}],
        //"2016-06-19": [{"name": "Father's Day", "country": "US", "date": "2016-06-19"}],
        //"2016-06-27": [{"name": "Helen Keller Day", "country": "US", "date": "2016-06-27"}]
    };
    //console.log("holidays="+JSON.stringify(holidays));
    //var holidays = noOfOrder;
    var numFmt = function (num) {
        num = num.toString();
        if (num.length < 2) {
            num = "0" + num;
        }
        return num;
    };
    //setTimeout(1000, $scope.setDayContent);
    var loadContentAsync = true;
    $log.info("setDayContent.async", loadContentAsync);
    $scope.setDayContent = function (date) {
        var key = [date.getFullYear(), numFmt(date.getMonth() + 1), numFmt(date.getDate())].join("-");
        var data = (holidays[key] || [{name: ""}])[0].name;
        if (loadContentAsync) {
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(data);
            });
            return deferred.promise;
        }
        return data;
    };

});
// });

//config color for calendar
app2.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme("default").primaryPalette("cyan").accentPalette("light-green");
});

//config Data binding symbol
app2.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})

//export modules -- ng-app, in order for html to access all controllers on this file
angular.element(document).ready(function () {
    var myDiv1 = document.getElementById("all_modules");
    angular.bootstrap(myDiv1, ["materialExample"]);
});

