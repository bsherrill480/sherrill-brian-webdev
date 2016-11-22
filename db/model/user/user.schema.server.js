const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: Schema.Types.ObjectId, ref: 'Website'}],
    }, {
        timestamps: true
    });

userSchema.methods.isValidPassword = function (password) {
    return this.password === password;
};

module.exports = userSchema;