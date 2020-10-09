const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  fixUsersStructure(user) {
    if (user) {
      db.Tasks.forEach(task => {
        if (task.userId === user.id) {
          task.userId = null;
        }
      });
    }
  },
  fixBoardsStructure(board) {
    if (board) {
      db.Tasks = db.Tasks.filter(({ boardId }) => boardId !== board.id);
    }
  }
};

// init DB with mock data
(() => {
  const board = new Board();
  db.Boards.push(board);

  for (let i = 0; i < 3; i++) {
    db.Users.push(new User());
    db.Tasks.push(new Task({ boardId: board.id }));
  }
})();
const getAllEntities = tableName => db[tableName].filter(entity => entity);

const getEntity = (tableName, id) => {
  const entities = db[tableName]
    .filter(entity => entity)
    .filter(entity => entity.id === id);

  if (entities.length > 1) {
    console.error(
      `The DB data is damaged. Table: ${tableName}. Entity ID: ${id}`
    );
    throw Error('The DB data is wrong!');
  }

  return entities[0];
};

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);
  if (entity) {
    if (db[`fix${tableName}Structure`]) {
      db[`fix${tableName}Structure`](entity);
    }
    const index = db[tableName].indexOf(entity);
    db[tableName] = [
      ...db[tableName].slice(0, index),
      ...(db[tableName].length > index + 1
        ? db[tableName].slice(index + 1)
        : [])
    ];
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
    db[tableName][db[tableName].indexOf(oldEntity)] = {
      id: oldEntity.id,
      ...entity
    };
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
