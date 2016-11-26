let PassportLocalStategy = require('passport-local'),
    models = require('../db/model/models.server'),
    userAPI = models.userAPI,
    localStrategy,
    deserializeUser,
    serializeUser,
    FacebookStrategy = require('passport-facebook').Strategy,
    facebookStrategy;

serializeUser = function (user, done) {
    console.log("serializeUser", user);
    done(null, user._id);
};

deserializeUser = function (id, done) {
    console.log("deserializeUser", id);
    userAPI
        .findUserById(id)
        .then(function (returnedUser) {
            done(null, returnedUser);
            return returnedUser;
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
    console.log("localStrat");
    userAPI
        .findUserByUsername(username)
        .then(function(user) {
            console.log("localStrat user:", user);
            if (!user) {
                done(null, false, { message: 'Incorrect username.' });
            } else {
                console.log("userIsValidPassword", user.isValidPassword);
                if (!user.isValidPassword(password)) {
                    done(null, false, {message: 'Incorrect password.'});
                }
                done(null, user);
            }
        })
        .catch(function (err) {
            console.log("localStrat err", err);
            done(err);
        });
});

// in real app would use environmental variable for variables here
facebookStrategy = new FacebookStrategy({
    clientID: '320404104996627', // facebook app id
    clientSecret: 'caad76cc56f16b1d46abfe917d556cfb',
    callbackURL: 'http://localhost:3000/assignment/api/auth/facebook/callback',
    profileFields: ['id', 'emails']

},
    function(accessToken, refreshToken, profile, done) {
        let emails = profile.emails, // for simplicity sake we'll just take the first email
            fbId = profile.id,
            email;
        email = emails[0] ? emails[0].value : '';
        console.log("profile", profile, profile.emails);
        if(email && fbId) {
            userAPI
                .findOrCreate({
                    email: email,
                    facebook: {
                        id: fbId
                    }
                })
                .then(function (user) {
                    done(null, user);
                })
                .catch(function (err) {
                    done(err);
                });
        } else {
            done("email/fbId Invalid or missing.")
        }
});

module.exports = {
    serializeUser,
    deserializeUser,
    localStrategy,
    facebookStrategy
};

