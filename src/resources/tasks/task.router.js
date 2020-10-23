const { OK } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const { taskId } = require('../../utils/validation/sсhemas');
const validator = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const tasks = await taskService.getAllByBoardId(req.params.boardId);
  res.status(OK).json(tasks);
});

router.get('/:id', validator(taskId, 'params'), async (req, res) => {
  const task = await taskService.get(req.params.boardId, req.params.id);
  res.status(OK).json(task);
});

router.route('/').post(async (req, res) => {
  const task = await taskService.save(
    Task.fromRequest({
      ...req.body,
      boardId: req.params.boardId
    })
  );
  res.status(OK).json(task);
});

router.put('/:id', validator(taskId, 'params'), async (req, res) => {
  const task = await taskService.update({
    ...req.body,
    id: req.params.id,
    boardId: req.params.boardId
  });
  res.status(OK).json(task);
});

router.delete('/:id', validator(taskId, 'params'), async (req, res) => {
  await taskService.remove(req.params.id);
  res.sendStatus(OK);
});

module.exports = router;
