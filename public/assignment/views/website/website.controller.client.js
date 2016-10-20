(function () {
    'use strict';


    function redirToWebsites($location, userId) {
        $location.url('/user/' + userId + '/website');
    }

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this,
            userId = $routeParams['uid'];


        function init() {
            vm.websites = WebsiteService.findWebsitesByUserId(userId);
        }
    
        vm.userId = userId;
        init();
    }

    function NewWebsiteController($routeParams, $location, $window, WebsiteService) {
        var vm = this,
            userId = $routeParams['uid'];

        function done(newWebsite) {
            if(newWebsite && newWebsite.name) {
                newWebsite._id = String(Math.floor(Math.random() * 1000)); // make up a number
                // for now
                WebsiteService.createWebsite(userId, newWebsite);
                redirToWebsites($location, userId);
            } else {
                $window.alert('Website not filled out.')
            }
        }

        vm.userId = userId;
        vm.done = done;
    }

    function EditWebsiteController($routeParams, $location, $window, WebsiteService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'];

        function done(newWebsite) {
            if(newWebsite && newWebsite.name) {
                WebsiteService.updateWebsite(websiteId, newWebsite);
                redirToWebsites($location, userId);
            } else {
                $window.alert('Website not filled out.')
            }
        }

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            redirToWebsites($location, userId);
        }

        function init() {
            var website = WebsiteService.findWebsiteById(websiteId);
            if(website) {
                vm.website = _.clone(website);
            } else { // not found. We don't have a 404 page so lets do this.
                redirToWebsites($location, userId);
            }
        }

        vm.userId = userId;
        vm.done = done;
        vm.deleteWebsite = deleteWebsite;
        init();
    }

    angular
        .module('WebAppMaker')
        .controller('WebsiteListController',
            ['$routeParams', 'WebsiteService', WebsiteListController])
        .controller('NewWebsiteController',
            ['$routeParams', '$location', '$window', 'WebsiteService', NewWebsiteController])
        .controller('EditWebsiteController',
            ['$routeParams', '$location', '$window', 'WebsiteService', EditWebsiteController]);
})();
