/**
 *
 * Created by brian on 10/30/16.
 */
const express = require('express'),
    _ = require('lodash'),
    router = express.Router(),
    users = [
    {_id: '123', username: 'alice',    password: 'alice',    firstName: 'Alice',  lastName: 'Wonder'  },
    {_id: '234', username: 'bob',      password: 'bob',      firstName: 'Bob',    lastName: 'Marley'  },
    {_id: '345', username: 'charly',   password: 'charly',   firstName: 'Charly', lastName: 'Garcia'  },
    {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose',   lastName: 'Annunzi' }
];

let userIdCounter = {
    _count: 1000,
    getCountAndIncrement() {
        let oldCount = this._count;
        this._count++;
        return oldCount;
    }
};

// only want user's attributes from object, ignore all others
function getUserObj(someObject, _id) {
    let user = {
        username: someObject.username,
        password: someObject.password,
        firstName: someObject.firstName,
        lastName: someObject.lastName
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

function userIsValidNoId(user) {
    return user.username && user.password && user.firstName && user.lastName;
}

function userIsValid(user) {
    return user._id && userIsValidNoId(user);
}


router.get('/user', function (req, res, next) {
    let username = req.query.username,
        password = req.query.password;
    console.log("users:", users);
    if(username && password) {
        // findUserByCredentials(req, res, next);
        findUserResponse(req, res, next,
            (user) => {return user.username === username && user.password === password;});
    } else if(username) {
        findUserResponse(req, res, next,
            (user) => {return user.username === username;});
    } else {
        res.status('400').send('Missing parameters');
    }
});

router.post('/user', function (req, res, next) {
    let sentUser = req.body;
    console.log("sentUser:", sentUser);
    // basic validation, not secure at all
    if(userIsValidNoId(sentUser)) {
        let user = getUserObj(sentUser, userIdCounter.getCountAndIncrement());
        users.push(user);
        res.json(user);
    } else {
        res.status(400).send('Invalid User');
    }
    users.push()
});

router.get('/user/:userId', function (req, res, next) {
    let userId = req.params.userId;
    findUserResponse(req, res, next, (user) => {return user._id === userId;});
});

router.put('/user/:userId', function (req, res, next) {
    let sentUser = req.body;
    if(userIsValid(sentUser)) {
        let user = _.find(users, (user) => {return user._id === sentUser._id;});
        if(user) {
            user.username = sentUser.username;
            user.password = sentUser.password;
            user.firstName = sentUser.firstName;
            user.lastName = sentUser.lastName;
        }
        res.json(user);
    } else {
        res.status(400).send('Invalid User');
    }
});

router.delete('/user/:userId', function (req, res, next) {
    let userId = req.params.userId;
    _.remove(users, (user) => {return user._id === userId;});
    res.send();
});


module.exports = router;
