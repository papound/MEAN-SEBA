var seba = angular.module("seba", []);

seba.controller("AppCtrl", function ($http) {
    var app = this;
    var url = "http://localhost:4000";

    app.saveEntry = function (newEntry) {

        var textfield_test_var = document.getElementById("textfield_test");
        
        if(textfield_test_var != ""){
            $http.post(url + "/add", {name:newEntry}).success( function () {
                loadEntry();
                textfield_test_var.value = "";
            })
        }else{
            console.log("This can't be empty")
        }
    }
    
    function loadEntry() {
        $http.get(url + "/list/database").success(function (db_lists) {
            //console.dir(taste);
            //console.log(db_lists);
            app.db_lists = db_lists;

            var textfield_test_var = document.getElementById("textfield_test");
            textfield_test_var.value = "";
        })
    }
    loadEntry();
        
})