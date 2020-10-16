const { OK } = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(OK).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.status(OK).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.save(User.fromRequest(req.body));
  res.status(OK).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.status(OK).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.remove(req.params.id);
  res.sendStatus(OK);
});

module.exports = router;
