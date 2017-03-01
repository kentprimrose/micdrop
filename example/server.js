const micdrop = require('..');

module.exports = micdrop.init({
  PORT: 3500,
  routes: [{
    name: 'person',
    handler: require('./handlers/person_handler'),
    subs: {
      task: null,
      org: {
        role: null
      }
    }
  },{
    name: 'task',
    handler: require('./handlers/task_handler')
  }]
});
