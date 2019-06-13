module.exports = function(app) {
  var UserController = require('../controllers/UserController');

  app.route('/users/')
    .get(UserController.read_a_user);

app.route('/users')
.post(UserController.add_a_user);

};