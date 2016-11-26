(function () {
    'use strict';
    
    function LoginController($location, $window, UserService) {
        var vm = this;
        
        function login(userCred) {
            var promise;
            userCred = userCred || {};
            promise = UserService.loginUserByCredentials(userCred.username, userCred.password);
            promise
                .then(function (user) {
                    $location.url("/user/" + user._id);
                })
                .catch(function (response) {
                    $window.alert("Unable to login");
                    return response;
                });
        }

        vm.login = login;
    }

    function RegisterController($location, $window, UserService) {
        var vm = this;

        function register(userCred) {
            var promise,
                user;
            userCred = userCred || {};
            if(userCred.username && userCred.password && userCred.verifyPassword &&
                    userCred.password === userCred.verifyPassword
            ) {
                user = {
                    username: userCred.username,
                    password: userCred.password
                };
                promise = UserService.createUser(user);
                promise
                    .then(function (payload) {
                        $location.url("/user/" + payload._id);
                    })
                    .catch(function (response) {
                        $window.alert("Unable to login");
                    });
            } else {
                $window.alert("Unable to login");
            }
        }
        vm.register = register;
    }
    
    function ProfileController($routeParams, $window, $location, UserService) {
        var vm = this,
            userId = $routeParams["uid"];
        
        function init(user) {
            vm.user = user;
        }

        function logout() {
            UserService
                .logoutUser()
                .then(function () {
                    $location.url("/login");
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        
        function update(user) {
            if(vm.profile.$valid) {
                UserService.updateUser(userId, user)
                    .catch(function () {
                        $window.alert('Unable to save');
                    });
            } else {
                $window.alert('Please check profile ');
            }
        }

        vm.validation = {
            emailValid: false
        };

        vm.logout = logout;
        vm.userId = userId;
        vm.update = update;
        UserService.findUserById(userId).then(init);
    }

    function RedirectToUserPageController($location, UserService) {
        UserService
            .getUserId()
            .then(function (userId) {
                if(userId) {
                    $location.url('/user/' + userId);
                } else {
                    $location.url('/login');
                }
            });
    }

    angular
        .module('WebAppMaker')
        .controller('LoginController', ['$location', '$window', 'UserService', LoginController])
        .controller(
            'RegisterController',
            ['$location', '$window', 'UserService', RegisterController]
        )
        .controller(
            'ProfileController', 
            ['$routeParams', '$window', '$location', 'UserService', ProfileController]
        )
        .controller(
            'RedirectToUserPageController',
            ['$location', 'UserService', RedirectToUserPageController]
        );
})();
