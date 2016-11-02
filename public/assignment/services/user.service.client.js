(function() {
    'use strict';

    function UserService($http) {
        var api;
        api = {
            // adds the user parameter instance to the local users array
            createUser: function (user) {
                return $http({
                    method: 'POST',
                    url: '/assignment/api/user',
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

            findUserByCredentials: function (username, password) {
                return $http({
                    method: 'GET',
                    url: '/assignment/api/user' ,
                    params: {
                        username: username,
                        password: password
                    }
                }).then(function (payload) {
                    return payload.data;
                });
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
