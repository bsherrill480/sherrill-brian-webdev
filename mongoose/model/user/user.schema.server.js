const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

module.exports = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    // websites: [{type: Schema.Types.ObjectId, ref: 'Website'}],
    dateCreated: Date
});
