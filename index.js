const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./router');

let setDefault = (obj, key, def) => {
  if (!(obj.hasOwnProperty(key))) {
    obj[key] = process.env[key] || def;
  }
};

module.exports = {
  init: (config={}) => {

    // Set constants
    setDefault(config, 'PORT', 3000);
    setDefault(config, 'LOGFMT', 'dev');

    const app = express();
    app.use(bodyParser.json());

    if (config.LOGFMT != 'none') {
      console.log('LOGFMT: "%s"', config.LOGFMT);
      app.use(morgan(config.LOGFMT));
    }

    if (config.hasOwnProperty('routes')) {
      for (let route of config.routes) {
        router(app, route);
      }
    }

    app.listen(config.PORT, () => {
      console.log('Listening on port %s', config.PORT);
    });

  }
};
