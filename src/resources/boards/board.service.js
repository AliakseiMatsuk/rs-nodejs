const boardsRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const save = board => boardsRepo.save(board);

const update = (id, board) => boardsRepo.update(id, board);

const remove = async id => {
  const removedBoard = await boardsRepo.remove(id);
  const tasks = await taskService.getAllByBoardId(removedBoard.id);

  tasks.forEach(task => taskService.remove(task.id));

  return removedBoard;
};

module.exports = { getAll, get, save, update, remove };
