const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    findOrCreate = require('mongoose-findorcreate'),
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

userSchema.methods.isValidPassword = function (password) {
    return this.password === password;
};

userSchema.plugin(findOrCreate);

module.exports = userSchema;