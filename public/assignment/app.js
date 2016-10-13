/**
 * Created by brian on 10/10/16.
 */
(function () {
    var app = angular.module("myApp", ["ngRoute"]);
    console.log("app.js init 2");
    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "main.htm"
        })
        .when("/login", {
            templateUrl : "/assignment/user/login.view.client.html"
        })
        .when("/green", {
            templateUrl : "green.htm"
        })
        .when("/blue", {
            templateUrl : "blue.htm"
        });
    });
})();

