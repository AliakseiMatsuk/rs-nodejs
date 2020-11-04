const bcrypt = require('bcryptjs');
const { model, Schema } = require('mongoose');
const { addMethods } = require('../../utils/toResponse');

const User = new Schema(
  {
    name: String,
    login: String,
    password: String
  },
  {
    collection: 'users'
  }
);

// eslint-disable-next-line func-names
User.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

addMethods(User);

module.exports = model('users', User);
