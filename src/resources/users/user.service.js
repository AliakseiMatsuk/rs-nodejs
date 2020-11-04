const usersRepo = require('./user.db.repository');
const { updateMany } = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const getByLogin = login => usersRepo.getByLogin(login);

const save = user => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  await usersRepo.remove(id);
  await updateMany({ userId: id }, { userId: null });
};

module.exports = { getAll, get, getByLogin, save, update, remove };
