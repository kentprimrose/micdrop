const micdrop = require('..');

module.exports = micdrop.init({
  PORT: 3500,
  middleware: [
    require('cors')(),
    require('./middleware/test_middleware')
  ],
  routes: [{
    path: 'person',
    handler: require('./handlers/person_handler')
  },{
    path: 'task',
    handler: require('./handlers/task_handler')
  }]
});
