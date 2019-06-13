module.exports = function(app) {
  var TransferController = require('../controllers/TransferController');

  app.route('/transfer/')
    .get(TransferController.read_a_transfer);

app.route('/transfer')
.post(TransferController.add_a_transfer);

};
