(function () {
    'use strict';

    function redirToPagesCallback($location, userId, websiteId) {
        return function() {
            $location.url('/user/' + userId + '/website/' + websiteId + '/page');
        };
    }

    function PageListController($routeParams, PageService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'];

        function init(pages) {
            vm.pages = pages;
        }
    
        vm.userId = userId;
        vm.websiteId = websiteId;
        PageService.findPagesByWebsiteId(websiteId).then(init);
    }

    function NewPageController($routeParams, $location, $window, PageService, ValidationService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'],
            redirToPages = redirToPagesCallback($location, userId, websiteId);

        function init() {
            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.page = {};
            vm.page.websiteId = websiteId;
            ValidationService.nameOnlyValidation.initNameOnlyValidation(vm);
        }

        function done(newPage) {
            if(ValidationService.nameOnlyValidation.validInputs(vm, newPage)) {
                PageService.createPage(websiteId, newPage).then(redirToPages);
            }
        }
        

        vm.done = done;
        init();
    }

    function EditPageController($routeParams, $location, $window, PageService, ValidationService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'],
            pageId = $routeParams['pid'],
            redirToPages = redirToPagesCallback($location, userId, websiteId);

        function done(newPage) {
            if(ValidationService.nameOnlyValidation.validInputs(vm, newPage)) {
                PageService.updatePage(pageId, newPage).then(redirToPages);
            }
        }

        function deletePage(pageId) {
            PageService.deletePage(pageId).then(redirToPages);
        }

        function init(page) {
            if(page) {
                vm.page = _.clone(page);
                ValidationService.nameOnlyValidation.initNameOnlyValidation(vm);
            } else { // not found. We don't have a 404 page so lets do this.
                redirToPages();
            }
        }

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.done = done;
        vm.deletePage = deletePage;

        PageService.findPageById(pageId).then(init);
    }

    angular
        .module('WebAppMaker')
        .controller('PageListController',
            ['$routeParams', 'PageService', PageListController])
        .controller('NewPageController',
            ['$routeParams', '$location', '$window', 'PageService', 'ValidationService',
                NewPageController])
        .controller('EditPageController',
            ['$routeParams', '$location', '$window', 'PageService', 'ValidationService',
                EditPageController]);
})();
