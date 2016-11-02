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
                    url: '/assignment/website/:websiteId/page',
                    data: {
                        websiteId: websiteId,
                        page: page
                    }
                });
            },

            findPagesByWebsiteId: function (websiteId) {
                return _.filter(pages, function (page) {
                    return websiteId == page.websiteId;
                });
            },

            findPageById: function (pageId) {
                return _.find(pages, function (page) {
                    return pageId === page._id;
                });
            },

            // takes passed page and keep it for internal use.
            updatePage: function (pageId, page) {
                var pageIndex = _.findIndex(pages, function (loopedPage) {
                    return loopedPage._id === pageId;
                });
                if(pageIndex !== -1) {
                    page._id = pageId;
                    pages[pageIndex] = page;
                }
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
