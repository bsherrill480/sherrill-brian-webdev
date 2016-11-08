/**
 *
 * Created by brian on 10/30/16.
 */
const express = require('express'),
    _ = require('lodash'),
    servicesUtil = require('./util'),
    ifUndefinedThenDefault = servicesUtil.ifUndefinedThenDefault,
    ifHasAttrThenIsString = servicesUtil.ifHasAttrThenIsString,
    router = express.Router(),
    models = require('../../../mongoose/model/models.server'),
    userModelAPI = models.user;

    users = [
        {
            _id: '123',
            username: 'alice',
            password: 'alice',
            firstName: 'Alice',
            lastName: 'Wonder',
            email: ''
        },
        {
            _id: '234',
            username: 'bob',
            password: 'bob',
            firstName: 'Bob',
            lastName: 'Marley',
            email: ''
        },

        {
            _id: '345',
            username: 'charly',
            password: 'charly',
            firstName: 'Charly',
            lastName: 'Garcia',
            email: ''
        },

        {
            _id: '456',
            username: 'jannunzi',
            password: 'jannunzi',
            firstName: 'Jose',
            lastName: 'Annunzi',
            email: ''
        }
    ],
    userIdCounter = servicesUtil.getIdCounter();

// only want user's attributes from object, ignore all others
function getUserObj(someObject, _id) {
    let user = {
        username: someObject.username,
        password: someObject.password,
        firstName: ifUndefinedThenDefault(someObject.firstName, ''),
        lastName: ifUndefinedThenDefault(someObject.lastName, ''),
        email: ifUndefinedThenDefault(someObject.email, '')
    };
    if(_id) {
        user._id = _id;
    }
    return user;
}

function findUserResponse(req, res, next, predicate) {
    let user = _.find(users, (user) => {return predicate(user);});

    if(user) {
        res.json(user);
    } else {
        res.status(404).send('User Not Found');
    }
}

// function ifHasAttrThenIsString(obj, attr) {
//     var attrVal = obj[attr];
//     return _.isUndefined(attrVal) || _.isString(attrVal);
// }

function userIsValidNoId(user) {
    return user.username && user.password && _.isString(user.username) && _.isString(user.password)
        && ifHasAttrThenIsString(user, 'firstName')
        && ifHasAttrThenIsString(user, 'lastName')
        && ifHasAttrThenIsString(user, 'email');
}

function userIsValid(user) {
    return user._id && userIsValidNoId(user);
}


router.get('/user', function (req, res, next) {
    let username = req.query.username,
        password = req.query.password;
    if(username){
        let userQuery;
        if(username && password) {
            userQuery = userModelAPI.findUserByCredentials(username, password);
            // userModelAPI.findUserByCredentials(username, password)
            //     .then(function (user) {
            //         console.log("found user ", user);
            //         res.json(user);
            //     })
            //     .catch(function (err) {
            //         console.log("find user error")
            //     });
            // findUserResponse(req, res, next,
            //     (user) => {return user.username === username && user.password === password;});
        } else if(username) {
            userQuery = userModelAPI.findUserByUsername(username);
            // findUserResponse(req, res, next,
            //     (user) => {return user.username === username;});
        }
        userQuery.then(servicesUtil.set404IfEmpty(res));
        servicesUtil.queryResponse(res, userQuery);
    } else {
        res.status('400').send('Missing parameters');
    }
});

router.post('/user', function (req, res, next) {
    let user = req.body;
    servicesUtil.queryResponse(res,  userModelAPI.createUser(user));
    // let sentUser = req.body;
    // // basic validation, not secure at all
    // if(userIsValidNoId(sentUser)) {
    //     let user = getUserObj(sentUser, userIdCounter.getCountAndIncrement());
    //     users.push(user);
    //     res.json(user);
    // } else {
    //     res.status(400).send('Invalid User');
    // }
    // users.push()
});

router.get('/user/:userId', function (req, res, next) {
    servicesUtil.queryResponse(res,  userModelAPI.findUserById(userId));
    // let userId = req.params.userId;
    // findUserResponse(req, res, next, (user) => {return user._id === userId;});
});

router.put('/user/:userId', function (req, res, next) {
    console.log("TODO");
    // let sentUser = req.body;
    // if(userIsValid(sentUser)) {
    //     let user= _.find(users, (user) => {return user._id === sentUser._id;});
    //     if(user) {
    //         _.assign(user, getUserObj(sentUser));
    //     }
    //     res.json(user);
    // } else {
    //     res.status(400).send('Invalid User');
    // }
});

router.delete('/user/:userId', function (req, res, next) {
    let userId = req.params.userId;
    userModelAPI.deleteUser(userId).then(() => {res.send()});
    // let userId = req.params.userId;
    // _.remove(users, (user) => {return user._id === userId;});
    // res.send();
});


module.exports = router;
