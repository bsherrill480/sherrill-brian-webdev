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

    findUser: function (user) {
        return User.findOne(user).exec();
    },

    findOrCreate(user) {
        return new Promise((resolve, reject) => {
            this.findUser(user)
                .then((returnedUser) => {
                    if(returnedUser) {
                        resolve(returnedUser);
                    } else {
                        this.createUser(user)
                            .then((createdUser) => {
                                resolve(createdUser)
                            })
                            .catch(function (err) {
                                reject(err);
                            })
                    }
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    },

    findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId}).exec();
    }
};
