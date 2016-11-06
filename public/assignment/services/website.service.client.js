(function() {
    'use strict';

    function WebsiteService($http) {
        var api;
        api = {
            createWebsite: function (userId, website) {
                return $http({
                    method: 'POST',
                    url: '/assignment/api/user/' + userId + '/website',
                    data: website
                }).then(function (payload) {
                    return payload.data;
                });
            },

            findWebsitesByUserId: function (userId) {
                return $http({
                    method: 'GET',
                    url: '/assignment/api/user/' + userId + '/website'
                }).then(function (payload) {
                    return payload.data;
                });
            },

            findWebsiteById: function (websiteId) {
                return $http({
                    method: 'GET',
                    url: '/assignment/api/website/' + websiteId
                }).then(function (payload) {
                    return payload.data;
                });
            },

            updateWebsite: function (websiteId, website) {
                return $http({
                    method: 'PUT',
                    url: '/assignment/api/website/' + websiteId,
                    data: website
                });
            },

            deleteWebsite: function (websiteId) {
                return $http({
                    method: 'DELETE',
                    url: '/assignment/api/website/' + websiteId
                });
            }
        };
        return api;
    }

    angular
        .module('WebAppMaker')
        .factory('WebsiteService', ['$http', WebsiteService]);

})();
