const storage = require('memrest')();

module.exports = {
  get: () => {
    return storage.getAll();
  },

  getOne: (id) => {
    return storage.get(id);
  },

  post: (item) => {
    return storage.post(item);
  }
};
