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

module.exports = userSchema;