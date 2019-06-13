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

var BalanceSchema = new Schema({
  myAccountId: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  },
myAccountBalance: {
    type: String,
    Required: 'Kindly enter the name of the Account'
  }
});

module.exports = mongoose.model('Balance', BalanceSchema);
