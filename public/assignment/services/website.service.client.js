(function() {
    'use strict';

    function WebsiteService() {
        var websites,
            api;
        websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];
        api = {
            // adds the website parameter instance to the local websites array
            createWebsite: function (userId, website) {
                website.developerId = userId;
                websites.push(website);
            },

            findWebsitesByUserId: function (userId) {
                return _.filter(websites, function (website) {
                    return userId == website.developerId;
                });
            },

            findWebsiteById: function (websiteId) {
                return _.find(websites, function (website) {
                    return websiteId === website._id;
                });
            },

            // takes passed website and keep it for internal use.
            updateWebsite: function (websiteId, website) {
                var websiteIndex = _.findIndex(websites, function (loopedWebsite) {
                    return loopedWebsite._id === websiteId;
                });
                if(websiteIndex !== -1) {
                    website._id = websiteId;
                    websites[websiteIndex] = website;
                }
            },

            deleteWebsite: function (websiteId) {
                _.remove(websites, function (website) {
                    return website._id === websiteId;
                })
            }
        };
        return api;
    }

    angular
        .module('WebAppMaker')
        .factory('WebsiteService', WebsiteService);

})();
