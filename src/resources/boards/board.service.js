const boardsRepo = require('./board.db.repository');
const { removeByBoard } = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const save = board => boardsRepo.save(board);

const update = (id, board) => boardsRepo.update(id, board);

const remove = async id => {
  await boardsRepo.remove(id);
  await removeByBoard(id);
};

module.exports = { getAll, get, save, update, remove };
