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

    function WidgetChooserController($routeParams, $sce, WidgetService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'],
            pageId = $routeParams['pid'];

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
    }

    function NewWidgetController($routeParams, $location, $window, WidgetService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'],
            pageId = $routeParams['pid'],
            widgetType = $routeParams['wgtype'];

        function done(newWidget) {
            if(newWidget && (newWidget.text || newWidget.url)) {
                newWidget._id = Math.floor(Math.random() * 1000); // make up a number for now
                WidgetService.createWidget(pageId, newWidget);
                redirToWidgets($location, userId, websiteId, pageId);
            } else {
                $window.alert('Widget not filled out.')
            }
        }
        
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widget = {
            widgetType: widgetType
        };
        vm.done = done;
    }

    function EditWidgetController($routeParams, $location, $window, WidgetService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'],
            pageId = $routeParams['pid'],
            widgetId = $routeParams['wgid'];


        function done(newWidget) {
            if(newWidget && (newWidget.text || newWidget.url)) {
                WidgetService.updateWidget(widgetId, newWidget);
                redirToWidgets($location, userId, websiteId, pageId);
            } else {
                $window.alert('Widget not filled out.')
            }
        }

        function deleteWidget(pageId) {
            WidgetService.deleteWidget(pageId);
            redirToWidgets($location, userId, websiteId, pageId);
        }

        function init() {
            var widget = WidgetService.findWidgetById(widgetId);
            if(widget) {
                vm.widget = _.clone(widget);
            } else { // not found. We don't have a 404 page so lets do this.
                redirToWidgets($location, userId, websiteId, pageId);
            }
        }

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widgetId = widgetId;
        vm.done = done;
        vm.deleteWidget = deleteWidget;
        init();
    }

    angular
        .module('WebAppMaker')
        .controller('WidgetListController',
            ['$routeParams', '$sce', 'WidgetService', WidgetListController])
        .controller('WidgetChooserController', ['$routeParams', WidgetChooserController])
        .controller('NewWidgetController',
            ['$routeParams', '$location', '$window', 'WidgetService', NewWidgetController])
        .controller('EditWidgetController',
            ['$routeParams', '$location', '$window', 'WidgetService', EditWidgetController]);
})();
