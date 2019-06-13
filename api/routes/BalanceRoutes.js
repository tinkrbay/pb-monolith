module.exports = function(app) {
  var BalanceController = require('../controllers/BalanceController');

  app.route('/balance/')
    .get(BalanceController.read_a_balance);

app.route('/balance/:id').put(BalanceController.update_a_balance);

};
