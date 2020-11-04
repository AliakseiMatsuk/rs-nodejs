const { UNAUTHORIZED } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

module.exports = (req, res, next) => {
  if (require.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      res.status(UNAUTHORIZED).json({ message: 'Unauthorized user!' });
    }

    req.user = jwt.verify(token, JWT_SECRET_KEY);

    return next();
  } catch (e) {
    res.status(UNAUTHORIZED).json({ message: 'Unauthorized user!' });
  }
};
