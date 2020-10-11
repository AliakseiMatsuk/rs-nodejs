const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const save = user => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  const removedUser = await usersRepo.remove(id);
  const tasks = await taskService.getAll();

  tasks.forEach(task => {
    if (task.userId === removedUser.id) {
      taskService.update({ ...task, userId: null });
    }
  });

  return removedUser;
};

module.exports = { getAll, get, save, update, remove };
