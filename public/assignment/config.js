(function() {
    function doConfig($routeProvider) {
        var landingRoute = {
            templateUrl : '/assignment/user/login.view.client.html',
            controller: 'LoginController',
            controllerAs: 'model'
        };
        // All top level controllers should be named model and bind all route params

        $routeProvider
            .when('/', landingRoute)
            .when('/login', landingRoute)
            .when('/default', landingRoute)
            .when('/register', {
                templateUrl : '/assignment/user/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when('/user/:uid', {
                templateUrl: '/assignment/user/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website', {
                templateUrl : '/assignment/website/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/new', {
                templateUrl : '/assignment/website/website-new.view.client.html',
                controller: 'NewWebsiteController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/:wid', {
                templateUrl : '/assignment/website/website-edit.view.client.html',
                controller: 'EditWebsiteController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/:wid/page', {
                templateUrl : '/assignment/page/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl : '/assignment/page/page-new.view.client.html',
                controller: 'NewPageController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl : '/assignment/page/page-edit.view.client.html',
                controller: 'EditPageController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl : '/assignment/widget/widget-list.view.client.html'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                templateUrl : '/assignment/widget/widget-chooser.view.client.html'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl : '/assignment/widget/widget-edit.view.client.html'
            });
    }
    angular
        .module('WebAppMaker')
        .config(doConfig)
        // http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
        .directive('myEnter', function () {  // my-enter="doSomething()
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13) {
                        scope.$apply(function (){
                            scope.$eval(attrs.myEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
        });
})();
