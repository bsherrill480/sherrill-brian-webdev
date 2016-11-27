(function () {
    'use strict';

    function redirToWebsitesCallback($location, userId) {
        return function() {
            $location.url('/user/' + userId + '/website');
        };
    }

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this,
            userId = $routeParams['uid'];


        function init(websites) {
            vm.websites = websites
        }
    
        vm.userId = userId;
        WebsiteService.findWebsitesByUserId(userId).then(init);
    }

    function NewWebsiteController($routeParams, $location, $window, WebsiteService, 
                                  ValidationService) {
        var vm = this,
            userId = $routeParams['uid'],
            redirToWebsites = redirToWebsitesCallback($location, userId);
        
        function init() {
            vm.userId = userId;
            vm.website = {};
            vm.website.developerId = userId;
            ValidationService.nameOnlyValidation.initNameOnlyValidation(vm);
        }

        function done(newWebsite) {
            if(ValidationService.nameOnlyValidation.validInputs(vm, newWebsite)) {
                WebsiteService.createWebsite(userId, newWebsite).then(redirToWebsites);
            }
        }

        
        vm.done = done;
        init();
    }

    function EditWebsiteController($routeParams, $location, $window, WebsiteService,
                                   ValidationService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'],
            redirToWebsites = redirToWebsitesCallback($location, userId);

        function done(newWebsite) {
            if(ValidationService.nameOnlyValidation.validInputs(vm, newWebsite)) {
                WebsiteService.updateWebsite(websiteId, newWebsite).then(redirToWebsites);
            }
        }

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId).then(redirToWebsites);
        }

        function init(website) {
            if(website) {
                vm.website = website;
                ValidationService.nameOnlyValidation.initNameOnlyValidation(vm);
            } else { // not found. We don't have a 404 page so lets do this.
                redirToWebsites();
            }
        }

        vm.userId = userId;
        vm.done = done;
        vm.deleteWebsite = deleteWebsite;
        WebsiteService.findWebsiteById(websiteId).then(init)
    }

    angular
        .module('WebAppMaker')
        .controller('WebsiteListController',
            ['$routeParams', 'WebsiteService', WebsiteListController])
        .controller('NewWebsiteController',
            ['$routeParams', '$location', '$window', 'WebsiteService', 'ValidationService', 
                NewWebsiteController])
        .controller('EditWebsiteController',
            ['$routeParams', '$location', '$window', 'WebsiteService', 'ValidationService', 
                EditWebsiteController]);
})();
