/**
 *
 * Created by brian on 10/30/16.
 */
const express = require('express'),
    _ = require('lodash'),
    router = express.Router(),
    fs = require('fs'),
    servicesUtil = require('./util'),
    multer = require('multer'),
    UPLOADS_FOLDER = 'uploads',
    models = require('../../../db/model/models.server'),
    widgetAPI = models.widgetAPI,
    upload = multer({dest: `public/${UPLOADS_FOLDER}/`});

router.get('/page/:pageId/widget', function (req, res, next) {
    let pageId = req.params.pageId;
    servicesUtil.queryResponse(res, widgetAPI.findAllWidgetsForPage(pageId));
});

router.post('/page/:pageId/widget', function (req, res, next) {
    let sentWidget = req.body,
        pageId = req.params.pageId;
    
    sentWidget._page = pageId;
    widgetAPI.findAllWidgetsForPage(pageId).then(function (result) {
        sentWidget.order = result.length;
        servicesUtil.queryResponse(res, widgetAPI.createWidget(pageId, sentWidget));
    });
    // // basic validation, not secure at all
    // if(widgetIsValidNoId(sentWidget)) {
    //     let widget = getWidgetObj(sentWidget, widgetIdCounter.getCountAndIncrement());
    //     widgets.push(widget);
    //     res.json(widget);
    // } else {
    //     res.status(400).send('Invalid Widget');
    // }
    // widgets.push()
});

router.put('/page/:pageId/widget', function (req, res, next) {
    let positionInfo = req.body,
        pageId = req.params.pageId,
        start = positionInfo.start,
        end = positionInfo.end,
        queryFailed = servicesUtil.queryFailedCallback(res);
    function reorderElements(result) {
        servicesUtil.reorderItemInArr(start, end, result);
        _.each(result, function (model) {
            model.save().catch(function (err) {
                console.log("order save err:", err);
            });
        });
        res.json(result)
    }

    widgetAPI.findAllWidgetsForPage(pageId).then(reorderElements).catch(queryFailed);


});

router.get('/widget/:widgetId', function (req, res, next) {
    let widgetId = req.params.widgetId;
    servicesUtil.queryResponse(res, widgetAPI.findWidgetById(widgetId));
    // findWidgetResponse(req, res, next, (widget) => {return widget._id === widgetId;});
});

router.post('/widget/upload', upload.single('upload'), function (req, res, next) {
    res.json({
        uploadUrl: `/${UPLOADS_FOLDER}/${req.file.filename}`
    });
});

router.put('/widget/:widgetId', function (req, res, next) {
    let sentWidget = req.body,
       widgetId = req.params.widgetId;
    servicesUtil.queryResponse(res, widgetAPI.updateWidget(widgetId, sentWidget));
    // if(widgetIsValid(sentWidget)) {
    //     let widget = _.find(widgets, (widget) => {return widget._id === sentWidget._id;});
    //     if(widget) {
    //         let key;
    //         for(key in sentWidget) {
    //             if(sentWidget.hasOwnProperty(key)) {
    //                 widget[key] = sentWidget[key];
    //             }
    //         }
    //     }
    //     res.json(widget);
    // } else {
    //     res.status(400).send('Invalid Widget');
    // }
});

router.delete('/widget/:widgetId', function (req, res, next) {
    let widgetId = req.params.widgetId,
        sendResponse = servicesUtil.sendResponseCallback(res),
        queryFailed = servicesUtil.queryFailedCallback(res);
    widgetAPI.deleteWidget(widgetId).then(sendResponse).catch(queryFailed);
    // _.remove(widgets, (widget) => {return widget._id === widgetId;});
    // res.send();
});


module.exports = router;
