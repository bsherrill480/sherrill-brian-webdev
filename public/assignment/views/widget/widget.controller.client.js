(function () {
    'use strict';


    function redirToWidgets($location, userId, websiteId, pageId) {
        $location.url('/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
    }

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'],
            pageId = $routeParams['pid'];

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(pageId);
            _.each(vm.widgets, function (widget) {
                if(widget.widgetType === 'HTML') { // so tempted to use underscore chain method
                    widget.textTrusted = $sce.trustAsHtml(widget.text);
                }
            });
        }
    
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
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
                redirToWidgets($location, userId, websiteId);
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
                redirToWidgets($location, userId, websiteId);
            } else {
                $window.alert('Website not filled out.')
            }
        }

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            redirToWidgets($location, userId, websiteId);
        }

        function init() {
            var page = PageService.findPageById(pageId);
            if(page) {
                vm.page = _.clone(page);
            } else { // not found. We don't have a 404 page so lets do this.
                redirToWidgets($location, userId, websiteId);
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
        .controller('WidgetListController',
            ['$routeParams', '$sce', 'WidgetService', WidgetListController])
        .controller('NewPageController',
            ['$routeParams', '$location', '$window', 'WidgetService', NewPageController])
        .controller('EditPageController',
            ['$routeParams', '$location', '$window', 'WidgetService', EditPageController]);
})();
