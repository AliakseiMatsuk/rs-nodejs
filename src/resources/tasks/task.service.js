const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getAllByBoardId = boardId => tasksRepo.getAllByBoardId(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const save = task => tasksRepo.save(task);

const update = task => tasksRepo.update(task);

const remove = id => tasksRepo.remove(id);

module.exports = { getAll, getAllByBoardId, get, save, update, remove };
