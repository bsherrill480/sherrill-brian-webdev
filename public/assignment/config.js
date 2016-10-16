(function() {
    function doConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : '/assignment/user/login.view.client.html'
            })
            .when('/login', {
                templateUrl : '/assignment/user/login.view.client.html'
            })
            .when('/default', {
                templateUrl : '/assignment/user/login.view.client.html'
            })
            .when('/user/:uid', {
                templateUrl : '/assignment/user/profile.view.client.html'
            })
            .when('/user/:uid/website', {
                templateUrl : '/assignment/website/website-list.view.client.html'
            })
            .when('/user/:uid/website/:wid', {
                templateUrl : '/assignment/website/website-edit.view.client.html'
            })
            .when('/user/:uid/website/:wid/page', {
                templateUrl : '/assignment/page/page-list.view.client.html'
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl : '/assignment/page/page-new.view.client.html'
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl : '/assignment/page/page-edit.view.client.html'
            })
            .when('')

    }
    angular
        .module('WebAppMaker')
        .config(doConfig);
})();
