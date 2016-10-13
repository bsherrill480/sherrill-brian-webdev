(function() {
    function doConfig($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "/assignment/user/login.view.client.html"
            })
            .when("/login", {
                templateUrl : "/assignment/user/login.view.client.html"
            })
            .when("/default", {
                templateUrl : "/assignment/user/login.view.client.html"
            })
            .when("/green", {
                templateUrl : "green.htm"
            })
            .when("/blue", {
                templateUrl : "blue.htm"
            });
    }
    angular
        .module('WebAppMaker')
        .config(doConfig);
})();
