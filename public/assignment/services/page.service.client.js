(function() {
    'use strict';

    function PageService($http) {
        var api;
        api = {
            // adds the page parameter instance to the local pages array
            createPage: function (websiteId, page) {
                // page.websiteId = websiteId;
                // pages.push(page);
                return $http({
                    method: 'POST',
                    url: '/assignment/api/website/' + websiteId + '/page',
                    data: {
                        websiteId: websiteId,
                        page: page
                    }
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
                // var pageIndex = _.findIndex(pages, function (loopedPage) {
                //     return loopedPage._id === pageId;
                // });
                // if(pageIndex !== -1) {
                //     page._id = pageId;
                //     pages[pageIndex] = page;
                // }
            },

            deletePage: function (pageId) {
                _.remove(pages, function (page) {
                    return page._id === pageId;
                })
            }
        };
        return api;
    }

    angular
        .module('WebAppMaker')
        .factory('PageService', ['$http', PageService]);

})();
