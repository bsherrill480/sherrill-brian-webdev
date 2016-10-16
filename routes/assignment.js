const express = require('express'),
    router = express.Router();


router.use('/user', require('./user.js'));
router.use('/website', require('./website.js'));
router.use('/page', require('./page.js'));
router.use('/widget', require('./widget.js'));

router.get(`/`, function (req, res, next) {
    res.render('assignment/index');
});

module.exports = router;
