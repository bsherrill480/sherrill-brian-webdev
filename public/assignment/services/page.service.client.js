(function() {
    'use strict';

    function PageService($http) {
        var api;
        api = {
            createPage: function (websiteId, page) {
                return $http({
                    method: 'POST',
                    url: '/assignment/api/website/' + websiteId + '/page',
                    data: page
                });
            },

            findPagesByWebsiteId: function (websiteId) {
                return $http({
                    method: 'GET',
                    url: '/assignment/api/website/' + websiteId + '/page'
                }).then(function (payload) {
                    return payload.data;
                });
            },

            findPageById: function (pageId) {
                return $http({
                    method: 'GET',
                    url: '/assignment/api/page/' + pageId
                }).then(function (payload) {
                    return payload.data;
                });
            },

            updatePage: function (pageId, page) {
                return $http({
                    method: 'PUT',
                    url: '/assignment/api/page/' + pageId,
                    data: page
                }).then(function (payload) {
                    return payload.data;
                });
            },

            deletePage: function (pageId) {
                return $http({
                    method: 'DELETE',
                    url: '/assignment/api/page/' + pageId
                });
            }
        };
        return api;
    }

    angular
        .module('WebAppMaker')
        .factory('PageService', ['$http', PageService]);

})();
