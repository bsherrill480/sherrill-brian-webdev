(function() {
    'use strict';

    function WidgetService($http) {
        var api;

        api = {
            // adds the widget parameter instance to the local widgets array
            createWidget: function (pageId, widget) {
                return $http({
                    method: 'POST',
                    url: '/assignment/api/page/' + pageId + '/widget',
                    data: widget
                }).then(function (payload) {
                    return payload.data;
                });
                // widget.pageId = pageId;
                // widgets.push(widget);
            },

            findWidgetsByPageId: function (pageId) {
                return $http({
                    method: 'GET',
                    url: '/assignment/api/page/' + pageId + '/widget',
                }).then(function (payload) {
                    return payload.data;
                });
            },

            findWidgetById: function (widgetId) {
                return $http({
                    method: 'GET',
                    url: '/assignment/api/widget/' + widgetId
                }).then(function (payload) {
                    return payload.data;
                });
                // return _.find(widgets, function (widget) {
                //     return widgetId === widget._id;
                // });
            },

            // takes passed widget and keep it for internal use.
            updateWidget: function (widgetId, widget) {
                return $http({
                    method: 'PUT',
                    url: '/assignment/api/widget/' + widgetId,
                    data: widget
                }).then(function (payload) {
                    return payload.data;
                });
                // var widgetIndex = _.findIndex(widgets, function (loopedWidget) {
                //     return loopedWidget._id === widgetId;
                // });
                // if(widgetIndex !== -1) {
                //     widget._id = widgetId;
                //     widgets[widgetIndex] = widget;
                // }
            },

            deleteWidget: function (widgetId) {
                return $http({
                    method: 'DELETE',
                    url: '/assignment/api/widget/' + widgetId
                });
                // _.remove(widgets, function (widget) {
                //     return widget._id === widgetId;
                // })
            }
        };
        return api;
    }

    angular
        .module('WebAppMaker')
        .factory('WidgetService', ['$http', WidgetService]);

})();
