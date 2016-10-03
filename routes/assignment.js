const express = require('express'),
    router = express.Router();

router.get('/login.html', function (req, res, next) {
    res.render('assignment/user_pages/login');
});

router.get('/register.html', function (req, res, next) {
    res.render('assignment/user_pages/register');
});

router.get('/profile.html', function (req, res, next) {
    res.render('assignment/user_pages/profile');
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


// WIDGET PAGES

router.get('/widget-list.html', function (req, res, next) {
    res.render('assignment/widget_pages/widget_list');
});

router.get('/widget-chooser.html', function (req, res, next) {
    res.render('assignment/widget_pages/widget_chooser');
});

router.get('/widget-heading.html', function (req, res, next) {
    res.render('assignment/widget_pages/widget_heading');
});

router.get('/widget-image.html', function (req, res, next) {
    res.render('assignment/widget_pages/widget_image');
});

router.get('/widget-youtube.html', function (req, res, next) {
    res.render('assignment/widget_pages/widget_youtube');
});

module.exports = router;
