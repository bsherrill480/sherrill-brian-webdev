/**
 *
 * Created by brian on 10/13/16.
 */
const express = require('express'),
    router = express.Router();

router.get('/widget-list.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/widget_list');
});

router.get('/widget-chooser.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/widget_chooser');
});

router.get('/widget-new.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/widget_new');
});

router.get('/widget-edit.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/widget_edit');
});

// ------
// Should refactor these into their own routes
// ------

//display

router.get('/widget-heading.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/display/display_heading');
});

router.get('/widget-image.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/display/display_image');
});

router.get('/widget-youtube.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/display/display_youtube');
});

router.get('/widget-html.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/display/display_html');
});

router.get('/widget-text.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/display/display_text');
});

//new

router.get('/new-widget-heading.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/new/new_heading');
});

router.get('/new-widget-image.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/new/new_image');
});

router.get('/new-widget-youtube.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/new/new_youtube');
});

router.get('/new-widget-html.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/new/new_html');
});

router.get('/new-widget-text.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/new/new_text');
});

//edit

router.get('/edit-widget-heading.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/edit/edit_heading');
});

router.get('/edit-widget-image.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/edit/edit_image');
});

router.get('/edit-widget-youtube.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/edit/edit_youtube');
});

router.get('/edit-widget-html.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/edit/edit_html');
});

router.get('/edit-widget-text.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/edit/edit_text');
});
module.exports = router;

