(function () {
    'use strict';
    var USERNAME_REQUIRED_MSG = "Username required.",
        PASSWORD_REQUIRED_MSG = "Password required.",
        VERIFY_PASSWORD_REQUIRED_MSG = "Verify password required.",
        VERIFY_PASSWORD_NOT_MATCHING_MSG = "Verify password must match password.",
        BAD_CREDENTIALS_ALERT_MSG = "Email or password incorrect.";
;

    function LoginController($location, ValidationService, UserService) {
        var vm = this;

        function init() {
            vm.errors = {
                username: '',
                password: '',
                alertError: ''
            };
            vm.user = {
                username: '',
                password: ''
            };
        }

        function validInputs() {
            var usernameValid = vm.user.username,
                passwordValid = vm.user.password,
                allValid = usernameValid && passwordValid;
            vm.errors.username = usernameValid ? '' : USERNAME_REQUIRED_MSG;
            vm.errors.password = passwordValid ? '' : PASSWORD_REQUIRED_MSG;
            vm.errors.alertError = allValid ? '' : ValidationService.alertMessages.INVALID_ALERT;
            return allValid;
        }
        
        function login(userCred) {
            var promise;
            if(validInputs()) {
                userCred = userCred || {};
                promise = UserService.loginUserByCredentials(userCred.username, userCred.password);
                promise
                    .then(function (user) {
                        $location.url("/user/" + user._id);
                    })
                    .catch(function (response) {
                        vm.errors.alertError =
                            response.status === 401 ? 
                                BAD_CREDENTIALS_ALERT_MSG : 
                                UserService.alertMessages.SERVER_ERROR_ALERT;
                        return response;
                    });
            }
        }

        vm.login = login;
        init();
    }

    function RegisterController($location, $window, ValidationService,UserService) {
        var vm = this;
        
        function init() {
            vm.user = {
                username: '',
                password: '',
                verifyPassword: ''
            },
            vm.errors = {
                username: '',
                password: '',
                verifyPassword: '',
                alertError: ''
            };
        }
        
        function validInputs() {
            var usernameValid = vm.user.username,
                passwordValid = vm.user.password,
                verifyPasswordRequired = vm.user.verifyPassword,
                verifyPasswordMatches = vm.user.verifyPassword === vm.user.password,
                allValid = usernameValid && passwordValid && verifyPasswordMatches,
                verifyPasswordMsg;
            vm.errors.username = usernameValid ? '' : USERNAME_REQUIRED_MSG;
            vm.errors.password = passwordValid ? '' : PASSWORD_REQUIRED_MSG;
            if(!verifyPasswordRequired) {
                verifyPasswordMsg = VERIFY_PASSWORD_REQUIRED_MSG;
            } else if(!verifyPasswordMatches) {
                verifyPasswordMsg = VERIFY_PASSWORD_NOT_MATCHING_MSG;
            } else {
                verifyPasswordMsg = '';
            }
            vm.errors.verifyPassword = verifyPasswordMsg;
            vm.errors.alertError = allValid ? '' : ValidationService.alertMessages.INVALID_ALERT;
            return allValid;
        }
        

        function register(userCred) {
            var promise,
                user;
            if(validInputs()) {
                userCred = userCred || {};
                if (userCred.username && userCred.password && userCred.verifyPassword &&
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
        }
        
        vm.register = register;
        init();
    }
    
    function ProfileController($routeParams, $window, $location, UserService) {
        var vm = this,
            userId = $routeParams["uid"];
        
        function init(user) {
            vm.user = user;
            vm.errors = {};
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
        .controller(
            'LoginController', 
            ['$location', 'ValidationService', 'UserService', LoginController]
        )
        .controller(
            'RegisterController',
            ['$location', '$window', 'ValidationService', 'UserService', RegisterController]
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
