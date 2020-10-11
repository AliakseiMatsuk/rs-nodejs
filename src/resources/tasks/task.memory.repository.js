const DB = require('../../utils/inMemoryDb');
const NOT_FOUND_ERROR = require('../../errors/appError');

const TABLE_NAME = 'Tasks';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const getAllByBoardId = async boardId => {
  return DB.getAllEntities(TABLE_NAME).filter(task => task.boardId === boardId);
};

const get = async (boardId, id) => {
  const task = await DB.getEntity(TABLE_NAME, id);

  if (!task || task.boardId !== boardId) {
    throw new NOT_FOUND_ERROR(
      `Couldn't find a task with id: ${id} and boardId: ${boardId}`
    );
  }

  return task;
};

const save = async task => await DB.saveEntity(TABLE_NAME, task);

const update = async task => {
  await get(task.boardId, task.id);
  return await DB.updateEntity(TABLE_NAME, task.id, task);
};

const remove = async id => {
  const deletedTask = await DB.removeEntity(TABLE_NAME, id);

  if (!deletedTask) {
    throw new NOT_FOUND_ERROR(`Couldn't find a task with id: ${id}`);
  }
};

module.exports = { getAll, getAllByBoardId, get, save, update, remove };
