(function () {
    'use strict';


    function redirToPages($location, userId, websiteId) {
        $location.url('/user/' + userId + '/website/' + websiteId + '/page');
    }

    function PageListController($routeParams, PageService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'];

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(websiteId);
        }
    
        vm.userId = userId;
        vm.websiteId = websiteId;
        init();
    }

    function NewPageController($routeParams, $location, $window, PageService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'];

        function done(newPage) {
            if(newPage && newPage.name) {
                newPage._id = Math.floor(Math.random() * 1000); // make up a number for now
                PageService.createPage(websiteId, newPage);
                redirToPages($location, userId, websiteId);
            } else {
                $window.alert('Page not filled out.')
            }
        }
        
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.done = done;
    }

    function EditPageController($routeParams, $location, $window, PageService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'],
            pageId = $routeParams['pid'];

        function done(newPage) {
            if(newPage && newPage.name) {
                PageService.updatePage(pageId, newPage);
                redirToPages($location, userId, websiteId);
            } else {
                $window.alert('Website not filled out.')
            }
        }

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            redirToPages($location, userId, websiteId);
        }

        function init() {
            var page = PageService.findPageById(pageId);
            if(page) {
                vm.page = _.clone(page);
            } else { // not found. We don't have a 404 page so lets do this.
                redirToPages($location, userId, websiteId);
            }
        }

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.done = done;
        vm.deletePage = deletePage;
        init();
    }

    angular
        .module('WebAppMaker')
        .controller('PageListController',
            ['$routeParams', 'PageService', PageListController])
        .controller('NewPageController',
            ['$routeParams', '$location', '$window', 'PageService', NewPageController])
        .controller('EditPageController',
            ['$routeParams', '$location', '$window', 'PageService', EditPageController]);
})();
