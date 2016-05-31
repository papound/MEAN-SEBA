var seba = angular.module("seba", []);

seba.controller("AppCtrl", function ($http) {
    var app = this;
    var url = "http://localhost:4000";

    app.saveProduct = function (newProduct) {

        var test = document.getElementById("test");
        
        if(test != ""){
            $http.post(url + "/add", {name:newProduct}).success( function () {
                loadProducts();
                test.value = "";
            })
        }else{
            console.log("This can't be empty")
        }
    }
    
    function loadProducts() {
        $http.get(url + "/list").success(function (taste) {
            //console.dir(taste);
            app.taste = taste;
            var test = document.getElementById("test");
            test.value = "";
        })
    }
    loadProducts();
        
})