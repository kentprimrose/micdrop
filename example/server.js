const micdrop = require('..');

module.exports = micdrop.init({
  PORT: 3500,
  middleware: [
    require('./middleware/cors_middleware'),
    require('./middleware/second_middleware')
  ],
  routes: [{
    path: 'person',
    handler: require('./handlers/person_handler')
  },{
    path: 'task',
    handler: require('./handlers/task_handler')
  }]
});
