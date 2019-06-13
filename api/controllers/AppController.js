var mongoose = require('mongoose'),
  UserDetails = mongoose.model('User');
  TransferDetails = mongoose.model('Transfer');
  PayeeDetails = mongoose.model('Payee');
  BalanceDetails = mongoose.model('Balance');
  

exports.read_a_user= function(req, res) {
  UserDetails.findOne({'emailAddress':req.query.userId}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.add_a_user= function(req, res) {
  var new_task = new UserDetails(req.body);
  new_task.save(function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};

exports.read_a_transfer= function(req, res) {
  TransferDetails.find({'myAccountId':req.query.myAccountId}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.add_a_transfer= function(req, res) {
  var new_task = new TransferDetails(req.body);
  new_task.save(function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};

exports.read_a_payee= function(req, res) {
  PayeeDetails.find({'payeeAddress':req.query.payeeAddress}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.add_a_payee= function(req, res) {
  var new_task = new PayeeDetails(req.body);
  new_task.save(function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};

exports.update_a_payee= function(req, res) {
var id = req.params.id
PayeeDetails.findByIdAndUpdate(id, req.body, function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};

exports.delete_a_payee= function(req, res) {
var id = req.params.id
PayeeDetails.findByIdAndRemove(id, function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};

exports.read_a_balance= function(req, res) {
  BalanceDetails.find({'myAccountId':req.query.myAccountId}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_balance= function(req, res) {
var id = req.params.id
BalanceDetails.findByIdAndUpdate(id, req.body, function(err, task) {
    if(err)
      res.send(err)
    res.json(task);
  });
};

//Note: Balance is automatically created as a balances schema by Mongoose if not already created
//For this application, we will set the intiial balance for the account by manually creating a collection called balances
//Thereafter we will add an initial entry manually to create an amount reflecting the balance