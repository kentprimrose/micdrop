const storage = require('memrest')();

module.exports = {
  getOne: (id) => {
    return storage.get(id);
  },

  post: (item) => {
    return storage.post(item);
  }
};
