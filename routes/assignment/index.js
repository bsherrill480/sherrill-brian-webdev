const express = require('express'),
    router = express.Router();


router.use('/user', require('./user'));
router.use('/website', require('./website'));
router.use('/page', require('./page'));
router.use('/widget', require('./widget'));
router.use('/api', require('./services'));

router.get(`/`, function (req, res, next) {
    res.render('assignment/index');
});

module.exports = router;
