(function () {
    'use strict';
    
    function LoginController($location, $window, UserService) {
        var vm = this;
        
        function login(userCred) {
            var user;
            userCred = userCred || {};
            user = UserService.findUserByCredentials(userCred.username, userCred.password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                $window.alert("Unable to login");
            }
        }

        vm.login = login;
    }

    function RegisterController($location, $window, UserService) {
        var vm = this;
        
        function register(userCred) {
            userCred = userCred || {};
            if(userCred.username && userCred.password && userCred.verifyPassword &&
                    userCred.password === userCred.verifyPassword
            ) {
                userCred._id = Math.floor(Math.random() * 1000); // make up a number for now
                UserService.createUser(userCred);
                $location.url("/user/" + userCred._id);
            } else {
                $window.alert("Unable to login");
            }
        }

        vm.register = register;
    }
    
    function ProfileController($routeParams, UserService) {
        var vm = this,
            userId = $routeParams["uid"];
        
        function init() {
            vm.user = UserService.findUserById(userId);
        }
        
        vm.userId = userId;
        init();
    }

    angular
        .module('WebAppMaker')
        .controller('LoginController', ['$location', '$window', 'UserService', LoginController])
        .controller(
            'RegisterController',
            ['$location', '$window', 'UserService', RegisterController]
        )
        .controller('ProfileController', ['$routeParams', 'UserService', ProfileController]);
})();
