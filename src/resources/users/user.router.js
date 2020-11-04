const { OK, NO_CONTENT, BAD_REQUEST } = require('http-status-codes');
const router = require('express').Router();
const usersService = require('./user.service');
const { id, user } = require('../../utils/validation/sсhemas');
const validator = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  await res.status(OK).json(users.map(u => u.toResponse()));
});

router.get('/:id', validator(id, 'params'), async (req, res) => {
  const userEntity = await usersService.get(req.params.id);
  res.status(OK).json(userEntity.toResponse());
});

router.post('/', async (req, res) => {
  const candidate = await usersService.getByLogin(req.body.login);

  if (candidate) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'This user already exists' });
  }
  const userEntity = await usersService.save(req.body);
  res.status(OK).json(userEntity.toResponse());
});

router.put(
  '/:id',
  validator(id, 'params'),
  validator(user, 'body'),
  async (req, res) => {
    const userEntity = await usersService.update(req.params.id, req.body);
    res.status(OK).json(userEntity.toResponse());
  }
);

router.delete('/:id', validator(id, 'params'), async (req, res) => {
  await usersService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
