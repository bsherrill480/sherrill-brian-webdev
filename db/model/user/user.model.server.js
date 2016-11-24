const userSchema = require('./user.schema.server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User', userSchema),
    Promise = require('bluebird');

//all functions return promises
module.exports = {
    createUser(newUser) {
        const user = new User(newUser);
        return user.save();
    },

    findUserById(userId) {
        return User.findById(userId).exec();
    },

    findUserByUsername(username) {
        return User.findOne({username}).exec();
    },

    findUserByCredentials(username, password) {
        return User.findOne({username, password}).exec();
    },

    updateUser(userId, user) {
        return User.findByIdAndUpdate(userId, user).exec();
    },

    deleteUser(userId) {
        return User.findByIdAndRemove(userId).exec();
    },

    findOrCreate(user) {
        // return User.findOrCreate(user).exec();
        // should replace with my own func so I can return real promise
        let promise = new Promise();
        User.findOne(user).then(function (returnedUser) {
            if(returnedUser) {
                promise.resolve(returnedUser);
            } else {
                User.createUser(user)
                    .then(function (createdUser) {
                        promise.resolve(createdUser)
                    })
                    .catch(function (err) {
                        promise.reject(err);
                    })
            }
            return null;
        });
        return promise
    },

    findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId}).exec();
    }
};
