var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TransferSchema = new Schema({
  myAccountId: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
  
    payeeName: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
payeeEmail: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
payeeBank: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
payeeAccountId: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
payeeTransferAmount: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
payeeTransferDate: {
    type: Date,
    Required: 'Kindly enter the name of the Account'
  }
});

module.exports = mongoose.model('Transfer', TransferSchema);

