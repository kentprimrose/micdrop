const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');

let setDefault = (obj, key, def) => {
  if (!(obj.hasOwnProperty(key))) {
    obj[key] = process.env[key] || def;
  }
};

module.exports = {
  init: (config={}) => {

    // Configuration
    setDefault(config, 'PORT', 3000);

    const app = express();
    app.use(bodyParser.json());

    if (config.hasOwnProperty('middleware')) {
      for (let middleware of config.middleware) {
        app.use(middleware);
      }
    }

    if (config.hasOwnProperty('routes')) {
      for (let route of config.routes) {
        router(app, route);
      }
    }

    // Allows external control and 'watch' testing.
    if (!module.parent.parent) {
      app.listen(config.PORT, () => {
        console.log('Listening on port %s', config.PORT);
      });
    }

    return app;
  }
};
