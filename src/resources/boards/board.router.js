const { OK } = require('http-status-codes');
const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { id } = require('../../utils/validation/sсhemas');
const validator = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const boards = await boardService.getAll();
  res.status(OK).json(boards);
});

router.get('/:id', validator(id, 'params'), async (req, res) => {
  const board = await boardService.get(req.params.id);
  res.status(OK).json(board);
});

router.route('/').post(async (req, res) => {
  const board = await boardService.save(Board.fromRequest(req.body));
  res.status(OK).json(board);
});

router.put('/:id', validator(id, 'params'), async (req, res) => {
  const board = await boardService.update(req.params.id, req.body);
  res.status(OK).json(board);
});

router.delete('/:id', validator(id, 'params'), async (req, res) => {
  await boardService.remove(req.params.id);
  res.sendStatus(OK);
});

module.exports = router;
