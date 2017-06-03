const storage = require('memrest')();

module.exports = {
  getOne: (id, next) => {
    next(storage.get(id));
  },

  post: (item, next) => {
    next(storage.post(item));
  }
};
