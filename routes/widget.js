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

// router.get('/widget-heading.view.client.html', function (req, res, next) {
//     res.render('assignment/widget_pages/widget_heading');
// });
//
// router.get('/widget-image.view.client.html', function (req, res, next) {
//     res.render('assignment/widget_pages/widget_image');
// });
//
// router.get('/widget-youtube.view.client.html', function (req, res, next) {
//     res.render('assignment/widget_pages/widget_youtube');
// });

router.get('/widget-heading.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/display_heading');
});

router.get('/widget-image.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/display_image');
});

router.get('/widget-youtube.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/display_youtube');
});

router.get('/widget-html.view.client.html', function (req, res, next) {
    res.render('assignment/widget_pages/components/angular_widgets/display_html');
});

module.exports = router;

