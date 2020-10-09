const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const save = task => tasksRepo.save(task);

const update = task => tasksRepo.update(task);

const remove = id => tasksRepo.remove(id);

module.exports = { getAll, get, save, update, remove };
