var express = require('express'),
    router = express.Router();

router.get('/login.html', function (req, res, next) {
    res.render('assignment/user_pages/login');
});

router.get('/register.html', function (req, res, next) {
    res.render('assignment/user_pages/register');
});

module.exports = router;
