/**
 *
 * Created by brian on 10/30/16.
 */
const express = require('express'),
    _ = require('lodash'),
    servicesUtil = require('./util'),
    router = express.Router(),
    models = require('../../../db/model/models.server'),
    userAPI = models.userAPI,
    passport = require('passport');
router.post('/login', passport.authenticate('local', {}));

// router.get('/user', function (req, res, next) {
//     let username = req.query.username,
//         password = req.query.password;
//     if(username){
//         let userQuery;
//         // if(username && password) {
//         //     userQuery = userAPI.findUserByCredentials(username, password);
//         // } else if(username) {
//             userQuery = userAPI.findUserByUsername(username);
//         // }
//         userQuery.then(servicesUtil.set404IfEmpty(res));
//         servicesUtil.queryResponse(res, userQuery);
//     } else {
//         res.status('400').send('Missing parameters');
//     }
// });

router.post('/login', passport.authenticate('local'), function (req, res, next) {
    res.status(req.isAuthenticated() ? 200 : 404).json(req.user);
});
router.post('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


router.post('/user', function (req, res, next) {
    let user = req.body;
    servicesUtil.queryResponse(res, userAPI.createUser(user));
});

router.get('/user/:userId', function (req, res, next) {
    let userId = req.params.userId;
    servicesUtil.queryResponse(res, userAPI.findUserById(userId));
});

router.put('/user/:userId', function (req, res, next) {
    let sentUser = req.body,
        userId = req.params.userId;
    servicesUtil.queryResponse(res, userAPI.updateUser(userId, sentUser));
});

router.delete('/user/:userId', function (req, res, next) {
    let userId = req.params.userId,
        sendResponse = servicesUtil.sendResponseCallback(res);
    userAPI.deleteUser(userId).then(sendResponse);
});


module.exports = router;
