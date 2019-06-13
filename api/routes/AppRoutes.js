module.exports = function(app) {
  var AppController = require('../controllers/AppController');

app.route('/users/').get(AppController.read_a_user);

app.route('/users').post(AppController.add_a_user);

app.route('/transfer/').get(AppController.read_a_transfer);

app.route('/transfer').post(AppController.add_a_transfer);

app.route('/payee/').get(AppController.read_a_payee);

app.route('/payee').post(AppController.add_a_payee);

app.route('/payee/:id').put(AppController.update_a_payee);

app.route('/payee/:id').delete(AppController.delete_a_payee);

app.route('/balance/').get(AppController.read_a_balance);

app.route('/balance/:id').put(AppController.update_a_balance);

};