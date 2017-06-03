const storage = require('memrest')();

module.exports = {
  getOne: (id, next, req) => {

    // Example of accessing multi-level parameters.
    // console.log('task, person: %s, %s', id, req.params.personId);

    next(storage.get(id));
  },

  post: (item, next) => {
    next(storage.post(item));
  }
};
