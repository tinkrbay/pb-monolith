module.exports = function(app) {
  var PayeeController = require('../controllers/PayeeController');

  app.route('/payee/')
    .get(PayeeController.read_a_payee);

app.route('/payee')
.post(PayeeController.add_a_payee);

app.route('/payee/:id').put(PayeeController.update_a_payee);

app.route('/payee/:id').delete(PayeeController.delete_a_payee);
};
