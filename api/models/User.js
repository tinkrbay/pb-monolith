var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  firstName: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
lastName: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
emailAddress:{
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
  password: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  }
});

module.exports = mongoose.model('User', UserSchema);