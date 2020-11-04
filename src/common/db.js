const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const User = require('../resources/users/user.model');
const admin = new User({
  name: 'Admin',
  login: 'admin',
  password: 'admin'
});

module.exports.connectDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    db.dropDatabase();
    admin.save();
    cb();
  });
};
