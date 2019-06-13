var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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

//Note: Balance is automatically created as a balances schema by Mongoose if not already created
//For this application, we will set the intiial balance for the account by manually creating a collection called balances
//Thereafter we will add an initial entry manually to create an amount reflecting the balance
