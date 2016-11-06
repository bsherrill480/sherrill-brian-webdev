/**
 *
 * Created by brian on 10/30/16.
 */
const express = require('express'),
    _ = require('lodash'),
    router = express.Router(),
    fs = require('fs'),
    multer = require('multer'),
    UPLOADS_FOLDER = 'uploads',
    upload = multer({dest: `public/${UPLOADS_FOLDER}/`}),
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
        return String(oldCount);
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
    let pageId = req.params.pageId;
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

router.put('/page/:pageId/widget', function (req, res, next) {
    let positionInfo = req.body,
        start = positionInfo.start,
        end = positionInfo.end,
        movedItem,
        i;
    
    if(_.isInteger(start) && _.isInteger(end) && start >= 0 && end < widgets.length) {
        if (start < end) {
            // shift all elements between [start + 1, end] down by 1
            // note: loop doesn't assign anything to widgets[end]
            movedItem = widgets[start];
            for (i = start + 1; i <= end; i++) {
                widgets[i - 1] = widgets[i];
            }
            widgets[end] = movedItem; // now assign widgets[end]
        } else if (start > end) {
            // shift all elements between [end, start - 1] up by 1
            // note: loop doesn't assign anything to widgets[end]
            // note: loop is traversing end to front
            movedItem = widgets[start];
            for (i = start; i >= end + 1; i--) {
                widgets[i] = widgets[i - 1];
            }
            widgets[end] = movedItem; // now assign widgets[end]
        }
        res.send();
    } else {
        res.status(400).send('Invalid start or end');
    }
});

router.get('/widget/:widgetId', function (req, res, next) {
    let widgetId = req.params.widgetId;
    findWidgetResponse(req, res, next, (widget) => {return widget._id === widgetId;});
});

router.post('/widget/upload', upload.single('upload'), function (req, res, next) {
    res.json({
        uploadUrl: `/${UPLOADS_FOLDER}/${req.file.filename}`
    });
});

router.put('/widget/:widgetId', function (req, res, next) {
    let sentWidget = req.body;
    if(widgetIsValid(sentWidget)) {
        let widget = _.find(widgets, (widget) => {return widget._id === sentWidget._id;});
        if(widget) {
            let key;
            for(key in sentWidget) {
                if(sentWidget.hasOwnProperty(key)) {
                    widget[key] = sentWidget[key];
                }
            }
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
