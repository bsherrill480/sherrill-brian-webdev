(function() {
    'use strict';

    function PageService($http) {
        var api;
        api = {
            // adds the page parameter instance to the local pages array
            createPage: function (websiteId, page) {
                // page.websiteId = websiteId;
                // pages.push(page);
                // page.websiteId = websiteId;
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

            // takes passed page and keep it for internal use.
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
