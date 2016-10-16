/**
 *
 * Created by brian on 10/13/16.
 */
const express = require('express'),
    router = express.Router();

router.get('/page-list.view.client.html', function (req, res, next) {
    res.render('assignment/page_pages/page_list');
});

router.get('/page-edit.view.client.html', function (req, res, next) {
    res.render('assignment/page_pages/page_edit');
});

router.get('/page-new.view.client.html', function (req, res, next) {
    res.render('assignment/page_pages/page_new');
});
module.exports = router;

