const micdrop = require('..');

module.exports = micdrop({
  PORT: 3500,
  middleware: [
    require('cors')(),
    require('./middleware/sample_middleware')
  ],
  routes: [{
    path: 'person',
    handler: require('./handlers/person_handler')
  },{
    path: 'task',
    handler: require('./handlers/task_handler')
  }]
});
