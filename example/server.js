const micdrop = require('..');

micdrop.init({
  PORT: 3500,
  routes: [{
    name: 'person',
    handler: require('./person_handler'),
    subs: {
      task: null,
      org: {
        role: null
      }
    }
  },{
    name: 'task',
    handler: require('./task_handler')
  }]
});
