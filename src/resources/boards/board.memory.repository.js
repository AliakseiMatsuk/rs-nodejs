const DB = require('../../utils/inMemoryDb');
const NOT_FOUND_ERROR = require('../../errors/appError');

const TABLE_NAME = 'Boards';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const get = async id => {
  const board = await DB.getEntity(TABLE_NAME, id);

  if (!board) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${id}`);
  }

  return board;
};

const save = async board => await DB.saveEntity(TABLE_NAME, board);

const update = async (id, board) => {
  const updatedBoard = await DB.updateEntity(TABLE_NAME, id, board);

  if (!updatedBoard) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${id}`);
  }

  return updatedBoard;
};

const remove = async id => {
  const deletedBoard = await DB.removeEntity(TABLE_NAME, id);
  if (!deletedBoard) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${id}`);
  }
};

module.exports = { getAll, get, save, update, remove };
