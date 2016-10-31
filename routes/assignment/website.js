const express = require('express'),
    router = express.Router();

router.get('/website-list.view.client.html', function (req, res, next) {
    res.render('assignment/website_pages/website_list');
});

router.get('/website-edit.view.client.html', function (req, res, next) {
    res.render('assignment/website_pages/website_edit');
});

router.get('/website-new.view.client.html', function (req, res, next) {
    res.render('assignment/website_pages/website_new');
});

module.exports = router;

