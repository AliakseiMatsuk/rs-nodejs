const taskRepo = require('./task.db.repository');

const getAllByBoardId = boardId => taskRepo.getAllByBoardId(boardId);

const get = (boardId, id) => taskRepo.get(boardId, id);

const save = task => taskRepo.save(task);

const update = (boardId, id, task) => taskRepo.update(boardId, id, task);

const remove = (boardId, id) => taskRepo.remove(boardId, id);

const updateMany = (filter, updates) => taskRepo.updateMany(filter, updates);

const removeByBoard = boardId => taskRepo.removeByBoard(boardId);

module.exports = {
  getAllByBoardId,
  get,
  save,
  update,
  remove,
  updateMany,
  removeByBoard
};
