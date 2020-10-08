const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.get(req.params.id);
  res.status(200).json(board);
});

router.route('/').post(async (req, res) => {
  const board = await boardService.save(Board.fromRequest(req.body));
  res.status(200).json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.update(req.params.id, req.body);
  res.status(200).json(board);
});

router.route('/:id').delete(async (req, res) => {
  await boardService.remove(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
