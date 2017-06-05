const storage = require('memrest')();

module.exports = {
  getOne: (id, next, req) => {

    // Example of accessing multi-level parameters.
    // console.log('task, person: %s, %s', id, req.params.personId);

    next(storage.get(id));
  },

  // Simulation for testing.
  get: (next) => {

    let result = [
      {id: 1, description: 'First task', status: 'done'},
      {id: 2, description: 'Second task', status: 'open'},
      {id: 3, description: 'Third task', status: 'open'}
    ];

    next(result);
  },

  post: (item, next) => {
    next(storage.post(item));
  }
};
