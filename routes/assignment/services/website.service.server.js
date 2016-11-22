/**
 *
 * Created by brian on 10/30/16.
 */
const express = require('express'),
    _ = require('lodash'),
    router = express.Router(),
    servicesUtil = require('./util'),
    models = require('../../../db/model/models.server'),
    websiteAPI = models.websiteAPI;

router.get('/user/:userId/website', function (req, res, next) {
    let userId = req.params.userId;
    servicesUtil.queryResponse(res, websiteAPI.findAllWebsitesForUser(userId));
});

router.post('/user/:userId/website', function (req, res, next) {
    let userId = req.params.userId,
        website = req.body;
    servicesUtil.queryResponse(res, websiteAPI.createWebsiteForUser(userId, website));
});

router.get('/website/:websiteId', function (req, res, next) {
    let websiteId = req.params.websiteId;
    servicesUtil.queryResponse(res, websiteAPI.findWebsiteById(websiteId));
});

router.put('/website/:websiteId', function (req, res, next) {
    let websiteId = req.params.websiteId,
        sentWebsite = req.body;
    servicesUtil.queryResponse(res, websiteAPI.updateWebsite(websiteId, sentWebsite));
});

router.delete('/website/:websiteId', function (req, res, next) {
    let websiteId = req.params.websiteId,
        sendResponse = servicesUtil.sendResponseCallback(res),
        queryFailed = servicesUtil.queryFailedCallback(res);
    
    websiteAPI.deleteWebsite(websiteId).then(sendResponse).catch(queryFailed);
});


module.exports = router;
