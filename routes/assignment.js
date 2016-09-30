var express = require('express'),
    router = express.Router();

router.get('/login.html', function (req, res, next) {
    res.render('assignment/user_pages/login');
});

router.get('/register.html', function (req, res, next) {
    res.render('assignment/user_pages/register');
});

router.get('/website-list.html', function (req, res, next) {
    res.render('assignment/website_pages/website_list');
});

module.exports = router;
