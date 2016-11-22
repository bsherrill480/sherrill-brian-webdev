/**
 *
 * Created by brian on 10/30/16.
 */
const express = require('express'),
    _ = require('lodash'),
    servicesUtil = require('./util'),
    ifUndefinedThenDefault = servicesUtil.ifUndefinedThenDefault,
    ifHasAttrThenIsString = servicesUtil.ifHasAttrThenIsString,
    router = express.Router(),
    models = require('../../../db/model/models.server'),
    pageAPI = models.pageAPI;
    // pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456", "title": ""},
    //     { "_id": "432", "name": "Post 2", "websiteId": "456", "title": ""},
    //     { "_id": "543", "name": "Post 3", "websiteId": "456", "title": ""}
    // ];
//
// let pageIdCounter = {
//     _count: 1000,
//     getCountAndIncrement() {
//         let oldCount = this._count;
//         this._count++;
//         return String(oldCount);
//     }
// };
//
// // only want page's attributes from object, ignore all others
// function getPageObj(someObject, _id) {
//     let page = {
//         name: someObject.name,
//         websiteId: someObject.websiteId,
//         title: ifUndefinedThenDefault(someObject.title, '')
//     };
//     if(_id) {
//         page._id = _id;
//     }
//     return page;
// }
//
// function findPageResponse(req, res, next, predicate) {
//     let page = _.find(pages, (page) => {return predicate(page);});
//
//     if(page) {
//         res.json(page);
//     } else {
//         res.status(404).send('Page Not Found');
//     }
// }
//
// function pageIsValidNoId(page) {
//     return page.name && page.websiteId && ifHasAttrThenIsString(page, 'title')
// }
//
// function pageIsValid(page) {
//     return page._id && pageIsValidNoId(page);
// }
//

router.get('/website/:websiteId/page', function (req, res, next) {
    let websiteId = req.params.websiteId;
    servicesUtil.queryResponse(res, pageAPI.findAllPagesForWebsite(websiteId));
});

router.post('/website/:websiteId/page', function (req, res, next) {
    let sentPage = req.body,
        websiteId = req.params.websiteId;
    servicesUtil.queryResponse(res, pageAPI.createPage(websiteId, sentPage));

});

router.get('/page/:pageId', function (req, res, next) {
    let pageId = req.params.pageId;
    servicesUtil.queryResponse(res, pageAPI.findPageById(pageId));
});

router.put('/page/:pageId', function (req, res, next) {
    let sentPage = req.body,
        pageId = req.params.pageId;
    servicesUtil.queryResponse(res, pageAPI.updatePage(pageId, sentPage));

});

router.delete('/page/:pageId', function (req, res, next) {
    let pageId = req.params.pageId,
        sendResponse = servicesUtil.sendResponseCallback(res);
    
    pageAPI.deletePage(pageId).then(sendResponse);
});


module.exports = router;
