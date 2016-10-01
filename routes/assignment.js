const express = require('express'),
    router = express.Router();

router.get('/login.html', function (req, res, next) {
    res.render('assignment/user_pages/login');
});

router.get('/register.html', function (req, res, next) {
    res.render('assignment/user_pages/register');
});

// WEBSITE PAGES

router.get('/website-list.html', function (req, res, next) {
    res.render('assignment/website_pages/website_list');
});

router.get('/website-edit.html', function (req, res, next) {
    res.render('assignment/website_pages/website_edit');
});

router.get('/website-new.html', function (req, res, next) {
    res.render('assignment/website_pages/website_new');
});

// PAGE PAGES

router.get('/page-list.html', function (req, res, next) {
    res.render('assignment/page_pages/page_list');
});

router.get('/page-edit.html', function (req, res, next) {
    res.render('assignment/page_pages/page_edit');
});

router.get('/page-new.html', function (req, res, next) {
    res.render('assignment/page_pages/page_new');
});



module.exports = router;
