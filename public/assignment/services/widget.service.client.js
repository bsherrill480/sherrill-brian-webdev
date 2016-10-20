(function() {
    'use strict';

    function WidgetService() {
        var widgets,
            api;
        widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://www.youtube.com/embed/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        api = {
            // adds the widget parameter instance to the local widgets array
            createWidget: function (pageId, widget) {
                widget.pageId = pageId;
                widgets.push(widget);
            },

            findWidgetsByPageId: function (pageId) {
                return _.filter(widgets, function (widget) {
                    return pageId == widget.pageId;
                });
            },

            findWidgetById: function (widgetId) {
                return _.find(widgets, function (widget) {
                    return widgetId === widget._id;
                });
            },

            // takes passed widget and keep it for internal use.
            updateWidget: function (widgetId, widget) {
                var widgetIndex = _.findIndex(widgets, function (loopedWidget) {
                    return loopedWidget._id === widgetId;
                });
                if(widgetIndex !== -1) {
                    widget._id = widgetId;
                    widgets[widgetIndex] = widget;
                }
            },

            deleteWidget: function (widgetId) {
                _.remove(widgets, function (widget) {
                    return widget._id === widgetId;
                })
            }
        };
        return api;
    }

    angular
        .module('WebAppMaker')
        .factory('WidgetService', WidgetService);

})();
