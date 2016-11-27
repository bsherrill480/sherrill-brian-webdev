(function () {
    'use strict';

    function redirToWidgetsCallback($location, userId, websiteId, pageId) {
        return function() {
            $location.url('/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
        };
    }

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'],
            pageId = $routeParams['pid'];
        
        function onSort (start, end) {
            WidgetService.changeWidgetPosition(pageId, start, end);
        }
        
        function init(widgets) {
            vm.widgets = widgets;
            vm.onSort = onSort;
            _.each(widgets, function(widget) {
                if(widget.widgetType === 'HTML') { // tempted to use underscore chain method
                    widget.textTrusted = $sce.trustAsHtml(widget.text);
                }
            });
        }
        
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        WidgetService.findWidgetsByPageId(pageId).then(init);
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

    function NewWidgetController($routeParams, $location, $window, WidgetService,
                                 ValidationService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'],
            pageId = $routeParams['pid'],
            widgetType = $routeParams['wgtype'],
            redirToWidgets = redirToWidgetsCallback($location, userId, websiteId, pageId);

        function init() {
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.pageId = pageId;
            vm.widget = {
                widgetType: widgetType,
                pageId: pageId
            };
            ValidationService.nameOnlyValidation.initNameOnlyValidation(vm);
        }

        function done(newWidget) {
            if(ValidationService.nameOnlyValidation.validInputs(vm, newWidget)) {
                WidgetService.createWidget(pageId, newWidget).then(redirToWidgets);
            }
        }

        vm.done = done;
        init();
    }

    function editWidgetController($routeParams, $location, $window, WidgetService,
                                  ValidationService) {
        var vm = this,
            userId = $routeParams['uid'],
            websiteId = $routeParams['wid'],
            pageId = $routeParams['pid'],
            widgetId = $routeParams['wgid'],
            redirToWidgets = redirToWidgetsCallback($location, userId, websiteId, pageId);


        function done(newWidget) {
            if(ValidationService.nameOnlyValidation.validInputs(vm, newWidget)) {
                WidgetService.updateWidget(widgetId, newWidget).then(redirToWidgets);
            }
        }

        function deleteWidget(widgetId) {
            WidgetService.deleteWidget(widgetId).then(redirToWidgets);
        }

        function init(widget) {
            if(widget) {
                vm.widget = _.clone(widget);
                ValidationService.nameOnlyValidation.initNameOnlyValidation(vm);
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
        WidgetService.findWidgetById(widgetId).then(init);
    }

    angular
        .module('WebAppMaker')
        .controller('WidgetListController',
            ['$routeParams', '$sce', 'WidgetService', WidgetListController])
        .controller('WidgetChooserController', ['$routeParams', WidgetChooserController])
        .controller('NewWidgetController',
            ['$routeParams', '$location', '$window', 'WidgetService', 'ValidationService',
                NewWidgetController])
        .controller('EditWidgetController',
            ['$routeParams', '$location', '$window', 'WidgetService', 'ValidationService',
                editWidgetController]);
})();
