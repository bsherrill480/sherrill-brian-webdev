const userSchema = require('./user.schema.server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User', userSchema);

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
    }
};
