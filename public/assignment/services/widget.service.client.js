(function() {
    'use strict';

    function WidgetService($http) {
        var api;

        function createUpdateWidgetAbstract(method, url, widget) {
            return $http({
                method: method,
                url: url,
                data: widget
            }).then(function (payload) {
                return payload.data;
            });
        }

        function updateWidgetCallback(widget, widgetId) {
            return function () {
                return createUpdateWidgetAbstract(
                    'PUT',
                    '/assignment/api/widget/' + widgetId,
                    widget
                );
            };
        }
        function createWidgetCallback(widget, pageId) {
            return function () {
                return createUpdateWidgetAbstract(
                    'POST',
                    '/assignment/api/page/' + pageId + '/widget',
                    widget
                );
            };
        }

        //pre: widget has upload. Check with widgetHasUpload(widget)
        function uploadWidgetFile(widget) {
            var formData;
            formData = new FormData();
            formData.append('upload', widget.upload);
            return $http.post('/assignment/api/widget/upload', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function(payload) {
                widget.url = payload.data.uploadUrl;
            });
        }

        function widgetHasUpload(widget) {
            return widget.upload && widget.upload.name;
        }

        api = {
            createWidget: function (pageId, widget) {
                var createWidget = createWidgetCallback(widget, pageId);

                if(widgetHasUpload(widget)) {
                    return uploadWidgetFile(widget).then(createWidget)
                } else {
                    return createWidget();
                }
            },

            findWidgetsByPageId: function (pageId) {
                return $http({
                    method: 'GET',
                    url: '/assignment/api/page/' + pageId + '/widget'
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
            },

            updateWidget: function (widgetId, widget) {
                var updateWidget = updateWidgetCallback(widget, widgetId);

                if(widgetHasUpload(widget)) {
                    return uploadWidgetFile(widget).then(updateWidget)
                } else {
                    return updateWidget();
                }
            },

            deleteWidget: function (widgetId) {
                return $http({
                    method: 'DELETE',
                    url: '/assignment/api/widget/' + widgetId
                });
            },
            
            changeWidgetPosition(pageId, start, end) {
                return $http({
                    method: 'PUT',
                    url: '/assignment/api/page/' + pageId + '/widget',
                    data: {
                        start: start,
                        end: end
                    }
                });
            }
        };
        return api;
    }

    angular
        .module('WebAppMaker')
        .factory('WidgetService', ['$http', WidgetService]);

})();
