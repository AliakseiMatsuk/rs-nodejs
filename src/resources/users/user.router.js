const { OK } = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { id, user } = require('../../utils/validation/sсhemas');
const validator = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  res.status(OK).json(users.map(User.toResponse));
});

router.get('/:id', validator(id, 'params'), async (req, res) => {
  const userEntity = await usersService.get(req.params.id);
  res.status(OK).json(User.toResponse(userEntity));
});

router.route('/').post(async (req, res) => {
  const userEntity = await usersService.save(User.fromRequest(req.body));
  res.status(OK).json(User.toResponse(userEntity));
});

router.put(
  '/:id',
  validator(id, 'params'),
  validator(user, 'body'),
  async (req, res) => {
    const userEntity = await usersService.update(req.params.id, req.body);
    res.status(OK).json(User.toResponse(userEntity));
  }
);

router.delete('/:id', validator(id, 'params'), async (req, res) => {
  await usersService.remove(req.params.id);
  res.sendStatus(OK);
});

module.exports = router;
