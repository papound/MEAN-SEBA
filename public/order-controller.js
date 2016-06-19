/**
 * Created by Pimprapai on 13-06-16.
 */
var app2 = angular.module("materialExample", ["ngMaterial", "materialCalendar"]);

var url = "http://localhost:4000";

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

//Calendar controller
//app2.controller("calendarCtrl", function ($scope, $filter, $q, $timeout, $log, MaterialCalendarData) {
app2.controller('calendarCtrl', function ($scope, getOrderData, $filter, $q, $timeout, $log, MaterialCalendarData) {
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

    //this will call factory
    //initiate counter
    var count = 0;
    var orderList_arr = [];

    getOrderData.then(function (order) {

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
                    "name": "1 <br>ORDER",
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
        }
        console.log(noOfOrder)
    });

    //Calendar part
    $scope.selectedDate = new Date();
    $scope.weekStartsOn = 0;
    $scope.dayFormat = "d";
    $scope.tooltips = true;
    $scope.disableFutureDates = false;


    //variables to display in Dialog box
    $scope.full_data = "";
    // $scope.outerTime = [];
    // $scope.innerItem = [];

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
        $scope.show_date_dialog = $filter("date")(date, "MMM d, y");
        date.setDate(date.getDate() + 1);
        var dateInOrder = (date.toISOString()).substring(0, 10);
        //if there exists order(s)
        if (noOfOrder[dateInOrder]) {

            var open_span = '<span>';
            var close_span = "</span>";
            var data = "";


            for (var i = 0; i < (noOfOrder[dateInOrder][0].orderItems).length; i++) {
                //console.log("i="+i+",time="+noOfOrder[dateInOrder][0].orderItems[i].time+",length="+(noOfOrder[dateInOrder][0].orderItems.items).length);
                //$scope.outerTime[i] = noOfOrder[dateInOrder][0].orderItems[i].time;
                data += "<p><h4><i class='material-icons'>alarm</i><i>" + " <b>" + noOfOrder[dateInOrder][0].orderItems[i].time + "</b> &nbsp;&nbsp; <i class='material-icons'>euro_symbol</i> <b>" + noOfOrder[dateInOrder][0].orderItems[i].price + "</b></i></h4><br>";

                for (var j = 0; j < (noOfOrder[dateInOrder][0].orderItems[i].items).length; j++) {
                    //console.log("name=" + noOfOrder[dateInOrder][0].orderItems[i].items[j].name);
                    data += noOfOrder[dateInOrder][0].orderItems[i].items[j].name + " X " + noOfOrder[dateInOrder][0].orderItems[i].items[j].amount + "<br>";
                }

                data += "<br></p>"
                //console.log("each="+);
            }
            //$scope.items_orderInDate = noOfOrder[dateInOrder][0].orderItems;
            $scope.full_data = open_span.concat(data).concat(close_span);
            //console.log($scope.full_data)

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

