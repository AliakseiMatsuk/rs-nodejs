const DB = require('../../utils/inMemoryDb');
const NOT_FOUND_ERROR = require('../../errors/appError');

const TABLE_NAME = 'Users';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const get = async id => {
  const user = await DB.getEntity(TABLE_NAME, id);

  if (!user) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);
  }

  return user;
};

const remove = async id => {
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);
  }
};

const save = async user => await DB.saveEntity(TABLE_NAME, user);

const update = async (id, user) => {
  const updatedUser = await DB.updateEntity(TABLE_NAME, id, user);

  if (!updatedUser) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);
  }

  return updatedUser;
};

module.exports = { getAll, get, remove, save, update };
