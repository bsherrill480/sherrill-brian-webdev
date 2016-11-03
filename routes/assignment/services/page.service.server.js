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
    pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "title": ""},
        { "_id": "432", "name": "Post 2", "websiteId": "456", "title": ""},
        { "_id": "543", "name": "Post 3", "websiteId": "456", "title": ""}
    ];

let pageIdCounter = {
    _count: 1000,
    getCountAndIncrement() {
        let oldCount = this._count;
        this._count++;
        return String(oldCount);
    }
};

// only want page's attributes from object, ignore all others
function getPageObj(someObject, _id) {
    let page = {
        name: someObject.name,
        websiteId: someObject.websiteId,
        title: ifUndefinedThenDefault(someObject.title, '')
    };
    if(_id) {
        page._id = _id;
    }
    return page;
}

function findPageResponse(req, res, next, predicate) {
    let page = _.find(pages, (page) => {return predicate(page);});

    if(page) {
        res.json(page);
    } else {
        res.status(404).send('Page Not Found');
    }
}

function pageIsValidNoId(page) {
    return page.name && page.websiteId && ifHasAttrThenIsString(page, 'title')
}

function pageIsValid(page) {
    return page._id && pageIsValidNoId(page);
}


router.get('/website/:websiteId/page', function (req, res, next) {
    let websiteId = req.params.websiteId;
    res.json(_.filter(pages, function (page) {
        return websiteId == page.websiteId;
    }));
});

router.post('/website/:websiteId/page', function (req, res, next) {
    let sentPage = req.body;
    // basic validation, not secure at all
    if(pageIsValidNoId(sentPage)) {
        let page = getPageObj(sentPage, pageIdCounter.getCountAndIncrement());
        pages.push(page);
        res.json(page);
    } else {
        res.status(400).send('Invalid Page');
    }
    pages.push()
});

router.get('/page/:pageId', function (req, res, next) {
    let pageId = req.params.pageId;
    findPageResponse(req, res, next, (page) => {return page._id === pageId;});
});

router.put('/page/:pageId', function (req, res, next) {
    let sentPage = req.body;
    if(pageIsValid(sentPage)) {
        let page = _.find(pages, (page) => {return page._id === sentPage._id;});
        if(page) {
            page.name = sentPage.name;
            page.websiteId = sentPage.websiteId;
            page.title = ifUndefinedThenDefault(sentPage.title, '');
        }
        res.json(page);
    } else {
        res.status(400).send('Invalid Page');
    }
});

router.delete('/page/:pageId', function (req, res, next) {
    let pageId = req.params.pageId;
    _.remove(pages, (page) => {return page._id === pageId;});
    res.send();
});


module.exports = router;
