const { OK, FORBIDDEN } = require('http-status-codes');
const router = require('express').Router();
const { signToken } = require('./auth.service');

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const token = await signToken(login, password);

  if (token) {
    res.status(OK).json({ token });
  } else {
    res.status(FORBIDDEN).send('Wrong login/password!');
  }
});

module.exports = router;
