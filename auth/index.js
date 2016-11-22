let PassportLocalStategy = require('passport-local'),
    models = require('../db/model/models.server'),
    userAPI = models.userAPI,
    localStrategy,
    deserializeUser,
    serializeUser;

serializeUser = function (user, done) {
    console.log("serializeUser");
    done(null, user._id);
};

deserializeUser = function (id, done) {
    console.log("deSerializeUser", id);
    userAPI
        .findUserById(id)
        .then(function (returnedUser) {
            console.log("returnedUser", returnedUser);
            done(null, returnedUser);
        })
        .catch(function (err) {
            console.log("err", err);
            done(err);
        });
};

localStrategy = new PassportLocalStategy({
    userNameField: 'email',
    passwordField: 'password'
}, function(username, password, done) {
    userAPI
        .findUserByCredentials(username, password)
        .then(function(user) {
            console.log("user:", user);
            if (!user) {
                done(null, false, { message: 'Incorrect username.' });
            }
            console.log("userIsValidPassword", user.isValidPassword);
            if (!user.isValidPassword(password)) {
                done(null, false, { message: 'Incorrect password.' });
            }
            done(null, user);
        })
        .catch(function (err) {
            done(err);
        });
});

module.exports = {
    serializeUser,
    deserializeUser,
    localStrategy
};

