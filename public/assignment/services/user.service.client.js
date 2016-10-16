(function() {
    'use strict';

    function UserService() {
        var users,
            api;
        users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        api = {
            // adds the user parameter instance to the local users array
            createUser: function (user) {
                users.push(user);
            },


            findUserById: function (userId) {
                return _.find(users, function (user) {
                    return userId == user._id;
                });
                // var i,
                //     user;
                //
                // for(i=0; i<users.length; i++) {
                //     user = users[i];
                //     if(user._id == userId) {
                //         return user;
                //     }
                // }
                //
                // return false;
            },

            findUserByUsername: function (username) {
                return _.find(users, function (user) {
                    return username === user.username;
                });
            },

            findUserByCredentials: function (username, password) {
                return _.find(users, function (user) {
                    return username === user.username && password === user.password;
                });
            },

            // takes passed user and keep it for internal use.
            updateUser: function (userId, user) {
                var userIndex = _.findIndex(users, function (loopedUser) {
                    return loopedUser._id === userId;
                });
                if(userIndex !== -1) {
                    user._id = userId;
                    users[userIndex] = user;
                }
            },

            deleteUser: function (userId) {
                _.remove(users, function (user) {
                    return user._id === userId;
                })
            }
        };
        return api;
    }

    angular
        .module('WebAppMaker')
        .factory('UserService', UserService);

})();
