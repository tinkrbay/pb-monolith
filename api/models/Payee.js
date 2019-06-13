var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PayeeSchema = new Schema({
  payeeAddress: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
payeeBank: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
payeeAccountId:{
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
payeeName:{
    type: String
  }
});

module.exports = mongoose.model('Payee', PayeeSchema);
