const tasksRepo = require('./task.db.repository');

const getAllByBoardId = boardId => tasksRepo.getAllByBoardId(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const save = task => tasksRepo.save(task);

const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

const updateMany = (filter, updates) => tasksRepo.updateMany(filter, updates);

const removeByBoard = boardId => tasksRepo.removeByBoardId(boardId);

module.exports = {
  getAllByBoardId,
  get,
  save,
  update,
  updateMany,
  removeByBoard
};
