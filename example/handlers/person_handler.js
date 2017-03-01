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
  },

  put: (id, item) => {
    return storage.put(id, item);
  },

  patch: (id, item) => {
    return storage.patch(id, item);
  },

  delete: (id) => {
    return storage.delete(id);
  }
};
