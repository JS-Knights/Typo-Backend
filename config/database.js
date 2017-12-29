const mongoose = require('mongoose');

mongoose.connect('mongodb://jsKnights:qwerty@ds235807.mlab.com:35807/typo_database');

function connectDB(run_server) {
  _db = mongoose.connection;

  _db.once('open', () => {
    run_server();
  });

  _db.on('error', err => {
    if(err) throw err;
  });

}

module.exports = {
    connectDB : connectDB
}
