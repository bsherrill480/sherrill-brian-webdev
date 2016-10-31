// /**
//  *
//  * Created by brian on 10/30/16.
//  */
// const express = require('express'),
//     router = express.Router();
//
// router.get('/user/:userId/website', function (req, res, next) {
//     // findAllWebsitesForUser
// });
//
// router.post('/user/:userId/website', function (req, res, next) {
//     // createWebsite
// });
//
// router.get('/website/:websiteId', function (req, res, next) {
//     // findWebsiteById
// });
//
// router.put('/website/:websiteId', function (req, res, next) {
//     // updateWebsite
// });
//
// router.delete('/website/:websiteId', function (req, res, next) {
//     // deleteWebsite
// });
//
//
// module.exports = router;

/**
 *
 * Created by brian on 10/30/16.
 */
const express = require('express'),
    _ = require('lodash'),
    router = express.Router(),
    websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

let websiteIdCounter = {
    _count: 1000,
    getCountAndIncrement() {
        let oldCount = this._count;
        this._count++;
        return oldCount;
    }
};

// only want website's attributes from object, ignore all others
function getWebsiteObj(someObject, _id) {
    let website = {
        name: someObject.name,
        developerId: someObject.developerId
    };
    if(_id) {
        website._id = _id;
    }
    return website;
}

function findWebsiteResponse(req, res, next, predicate) {
    let website = _.find(websites, (website) => {return predicate(website);});

    if(website) {
        res.json(website);
    } else {
        res.status(404).send('Website Not Found');
    }
}

function websiteIsValidNoId(website) {
    return website.name && website.developerId
}

function websiteIsValid(website) {
    return website._id && websiteIsValidNoId(website);
}


router.get('/user/:userId/website', function (req, res, next) {
    let userId = req.params.userId;
    res.json(_.filter(websites, function (website) {
        return userId === website.websiteId;
    }));
});

router.post('/user/:userId/website', function (req, res, next) {
    let sentWebsite = req.body;
    // basic validation, not secure at all
    if(websiteIsValidNoId(sentWebsite)) {
        let website = getWebsiteObj(sentWebsite, websiteIdCounter.getCountAndIncrement());
        websites.push(website);
        res.json(website);
    } else {
        res.status(400).send('Invalid Website');
    }
    websites.push()
});

router.get('/website/:websiteId', function (req, res, next) {
    let websiteId = req.params.websiteId;
    findWebsiteResponse(req, res, next, (website) => {return website._id === websiteId;});
});

router.put('/website/:websiteId', function (req, res, next) {
    let sentWebsite = req.body;
    if(websiteIsValid(sentWebsite)) {
        let website = _.find(websites, (website) => {return website._id === sentWebsite._id;});
        if(website) {
            website.name = sentWebsite.name;
            website.websiteId = sentWebsite.websiteId;
        }
        res.json(website);
    } else {
        res.status(400).send('Invalid Website');
    }
});

router.delete('/website/:websiteId', function (req, res, next) {
    let websiteId = req.params.websiteId;
    _.remove(websites, (website) => {return website._id === websiteId;});
    res.send();
});


module.exports = router;
