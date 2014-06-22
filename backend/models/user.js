var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    facebookUserId : String,
	username       : String,
	email          : String,
	authToken      : String
});

module.exports = mongoose.model('user', UserSchema);
