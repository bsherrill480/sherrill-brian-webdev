const userSchema = require('./user.schema.server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User', userSchema);

mongoose.Promise = require('bluebird');


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

    deleteUser(userId) {
        function removeUser(user) {
            user.remove();
        }
        return this.findUserById(userId).then(removeUser);
    }
};
