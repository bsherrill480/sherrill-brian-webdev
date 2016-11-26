const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema,
    userSchema = new Schema({
        username: {type: String, default: ''},
        password: {type: String, default: 'someTrueRandomValueGeneratedAtInsert?'},
        firstName: {type: String, default: ''},
        lastName: {type: String, default: ''},
        email: {type: String, default: ''},
        phone: {type: String, default: ''},
        websites: [{type: Schema.Types.ObjectId, ref: 'Website'}],
        facebook: {
            id: String,
            token: String
        }
    }, {
        timestamps: true
    });

// In real use, we'd want to salt these.
userSchema.methods.isValidPassword = function (password) {
    // return this.password === password;
    return bcrypt.compareSync(password, this.password);
};

// this is a static method, but we'll attach it to the model to keep it convenient.
userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password);
};

module.exports = userSchema;