const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: []
};

(() => {
  const board = new Board();
  db.Boards.push(board);

  for (let i = 0; i < 3; i++) {
    db.Users.push(new User());
    db.Tasks.push(new Task({ boardId: board.id }));
  }
})();

const getAllEntities = tableName => db[tableName];

const getEntity = (tableName, id) => db[tableName].find(e => e.id === id);

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);
  if (entity) {
    db[tableName].splice(db[tableName].indexOf(entity), 1);
  }

  return entity;
};

const saveEntity = (tableName, entity) => {
  db[tableName].push(entity);
  return getEntity(tableName, entity.id);
};

const updateEntity = async (tableName, id, entity) => {
  const oldEntity = getEntity(tableName, id);

  if (oldEntity) {
    db[tableName][db[tableName].indexOf(oldEntity)] = { id, ...entity };
  }
  return getEntity(tableName, id);
};

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  saveEntity,
  updateEntity
};
