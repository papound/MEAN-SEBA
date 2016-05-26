var seba = angular.module("seba", []);

seba.controller("AppCtrl", function ($http) {
    var app = this;
    var url = "http://localhost:3000";

    app.saveProduct = function (newProduct) {
        $http.post(url + "/add", {name:newProduct}).success( function () {
            loadProducts();
            var test = document.getElementById("test");
            test.value = "";
        })
    }
    
    function loadProducts() {
        $http.get(url + "/list").success(function (products) {
            app.products = products;
            var test = document.getElementById("test");
            test.value = "";
        })
    }
    loadProducts();
        
})