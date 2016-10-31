/**
 *
 * Created by brian on 10/30/16.
 */
const express = require('express'),
    _ = require('lodash'),
    router = express.Router(),
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

let widgetIdCounter = {
    _count: 1000,
    getCountAndIncrement() {
        let oldCount = this._count;
        this._count++;
        return oldCount;
    }
};

// widget object is schemaless so I can't say for sure what is has unless I enumerate on
// widgetType. For sake of simplicity I'll just copy over what's passed, but in production
// it should actually be enumerated.
function getWidgetObj(someObject, _id) {
    let widget = _.assign({}, someObject);
    if(_id) {
        widget._id = _id;
    }
    return widget
}

function findWidgetResponse(req, res, next, predicate) {
    let widget = _.find(widgets, (widget) => {return predicate(widget);});

    if(widget) {
        res.json(widget);
    } else {
        res.status(404).send('Widget Not Found');
    }
}

// see widget is valid
function widgetIsValidNoId(widget) {
    return widget.widgetType && widget.pageId;
}

// widget object is schemaless so I can't say for sure what is has unless I enumerate on
// widgetType. For sake of simplicity I'll just check values in common.
function widgetIsValid(widget) {
    return widget._id && widgetIsValidNoId(widget);
}


router.get('/page/:pageId/widget', function (req, res, next) {
    let pageId = req.params.websiteId;
    res.json(_.filter(widgets, function (widget) {
        return pageId == widget.pageId;
    }));
});

router.post('/page/:pageId/widget', function (req, res, next) {
    let sentWidget = req.body;
    // basic validation, not secure at all
    if(widgetIsValidNoId(sentWidget)) {
        let widget = getWidgetObj(sentWidget, widgetIdCounter.getCountAndIncrement());
        widgets.push(widget);
        res.json(widget);
    } else {
        res.status(400).send('Invalid Widget');
    }
    widgets.push()
});

router.get('/widget/:widgetId', function (req, res, next) {
    let widgetId = req.params.widgetId;
    findWidgetResponse(req, res, next, (widget) => {return widget._id === widgetId;});
});

router.put('/widget/:widgetId', function (req, res, next) {
    let sentWidget = req.body;
    if(widgetIsValid(sentWidget)) {
        let widget = _.find(widgets, (widget) => {return widget._id === sentWidget._id;});
        if(widget) {
            widget.name = sentWidget.name;
            widget.websiteId = sentWidget.websiteId;
        }
        res.json(widget);
    } else {
        res.status(400).send('Invalid Widget');
    }
});

router.delete('/widget/:widgetId', function (req, res, next) {
    let widgetId = req.params.widgetId;
    _.remove(widgets, (widget) => {return widget._id === widgetId;});
    res.send();
});


module.exports = router;
