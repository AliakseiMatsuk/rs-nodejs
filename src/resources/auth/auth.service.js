const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const User = require('../users/user.model');

const signToken = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return null;
  }

  return jwt.sign(
    {
      userId: user._id,
      login: user.login
    },
    JWT_SECRET_KEY,
    {
      expiresIn: '1h'
    }
  );
};

module.exports = {
  signToken
};
