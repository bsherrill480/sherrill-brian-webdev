const express = require('express'),
    router = express.Router();

// I am so disagree with how we are doing these files & routes but I'll go along with it.
router.use('', require('./user.service.server'));
router.use('', require('./page.service.server'));
router.use('', require('./website.service.server'));
router.use('', require('./widget.service.server'));

module.exports = router;
