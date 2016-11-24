/**
 *
 * Created by brian on 10/13/16.
 */
const express = require('express'),
    router = express.Router(),
    util = require('./util');

router.get('/login.view.client.html', function (req, res, next) {
    res.render('assignment/user_pages/login');
});

router.get('/register.view.client.html', function (req, res, next) {
    res.render('assignment/user_pages/register');
});

router.get('/profile.view.client.html', function (req, res, next) {
    res.render('assignment/user_pages/profile');
});

module.exports = router;

