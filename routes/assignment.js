const express = require('express'),
    router = express.Router(),
    userFolder = 'user',
    websiteFolder = 'website',
    pageFolder = 'page',
    widgetFolder = 'widget';


router.get(`/${userFolder}/login.view.client.html`, function (req, res, next) {
    res.render('assignment/user_pages/login');
});

router.get(`/${userFolder}/register.view.client.html`, function (req, res, next) {
    res.render('assignment/user_pages/register');
});

router.get(`/${userFolder}/profile.view.client.html`, function (req, res, next) {
    res.render('assignment/user_pages/profile');
});

// WEBSITE PAGES

router.get(`/${websiteFolder}/website-list.view.client.html`, function (req, res, next) {
    res.render('assignment/website_pages/website_list');
});

router.get(`/${websiteFolder}/website-edit.view.client.html`, function (req, res, next) {
    res.render('assignment/website_pages/website_edit');
});

router.get(`/${websiteFolder}/website-new.view.client.html`, function (req, res, next) {
    res.render('assignment/website_pages/website_new');
});

// PAGE PAGES

router.get(`/${pageFolder}/page-list.view.client.html`, function (req, res, next) {
    res.render('assignment/page_pages/page_list');
});

router.get(`/${pageFolder}/page-edit.view.client.html`, function (req, res, next) {
    res.render('assignment/page_pages/page_edit');
});

router.get(`/${pageFolder}/page-new.view.client.html`, function (req, res, next) {
    res.render('assignment/page_pages/page_new');
});


// WIDGET PAGES

router.get(`/${widgetFolder}/widget-list.view.client.html`, function (req, res, next) {
    res.render('assignment/widget_pages/widget_list');
});

router.get(`/${widgetFolder}/widget-chooser.view.client.html`, function (req, res, next) {
    res.render('assignment/widget_pages/widget_chooser');
});

router.get(`/${widgetFolder}/widget-heading.view.client.html`, function (req, res, next) {
    res.render('assignment/widget_pages/widget_heading');
});

router.get(`/${widgetFolder}/widget-image.view.client.html`, function (req, res, next) {
    res.render('assignment/widget_pages/widget_image');
});

router.get(`/${widgetFolder}/widget-youtube.view.client.html`, function (req, res, next) {
    res.render('assignment/widget_pages/widget_youtube');
});

router.get(`/`, function (req, res, next) {
    res.render('assignment/index');
});

module.exports = router;
