(function() {
    'use strict';

    function UserService($http) {
        var api;
        api = {
            createUser: function (user) {
                return $http({
                    method: 'POST',
                    url: '/assignment/api/register',
                    data: user
                }).then(function (payload) {
                    return payload.data;
                });
            },


            findUserById: function (userId) {
                return $http({
                    method: 'GET',
                    url: '/assignment/api/user/' + userId
                }).then(function (payload) {
                    return payload.data;
                });
            },

            findUserByUsername: function (username) {
                return $http({
                    method: 'GET',
                    url: '/assignment/api/user' ,
                    data: {
                        username: username
                    }
                });
            },

            loginUserByCredentials: function (username, password) {
                return $http({
                    method: 'POST',
                    url: '/assignment/api/login' ,
                    data: {
                        username: username,
                        password: password
                    }
                }).then(function (payload) {
                    return payload.data;
                });
            },
            
            logoutUser: function () {
                return $http({
                    method: 'POST',
                    url: '/assignment/api/logout'
                })
            },

            updateUser: function (userId, user) {
                return $http({
                    method: 'PUT',
                    url: '/assignment/api/user/' + userId,
                    data: user
                });
            },

            deleteUser: function (userId) {
                return $http({
                    method: 'DELETE',
                    url: '/assignment/api/user/' + userId
                });
            }
        };
        return api;
    }

    angular
        .module('WebAppMaker')
        .factory('UserService', ['$http', UserService]);

})();
