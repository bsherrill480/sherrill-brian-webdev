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

function getLoginUserThenSendResponseCallback(req, res) {
    return function (user) {
        req.login(user, function (err) {
            if(err) {
                res.status(400).send(err);
            } else {
                res.json(user)
            }
        });
        console.log("beforeReturn", user);
        return user;
    };
}

router.post('/login', passport.authenticate('local'), function (req, res, next) {
    res.status(req.isAuthenticated() ? 200 : 404).json(req.user);
});

router.post('/logout', function (req, res) {
    req.logout();
    res.send();
});

router.post('/register', function (req, res, next) {
    let user = req.body,
        loginUser = getLoginUserThenSendResponseCallback(req, res);
    // res.send();
    userAPI.createUser(user).then(loginUser);
    // userAPI.createUser(user);
});

router.get('/loggedin', function (req, res, next) {
    // console.log("loggedin",req.isAuthenticated() ? 'isLoggedIn' : 'notIsLoggedIn', req.user, 'id: ', req.user._id);
    res.send(req.isAuthenticated() ? req.user._id : '');
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: 'http://localhost:3000/assignment/#/user',
                                      failureRedirect: 'http://localhost:3000/assignment/#/login' }));

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
