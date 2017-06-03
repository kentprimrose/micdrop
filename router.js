let getBase = (route) => {
  return '/' + route.path;
};

module.exports = (app, route) => {

  app.get(getBase(route) + '/:id', (req, res) => {
    try {
      if (!route.handler.getOne) return res.sendStatus(405);

      let id = req.params.id;

      return route.handler.getOne(id, (result) => {
        if (!result) return res.sendStatus(404);
        return res.status(200).send(result);
      }, req);
    }
    catch (ex) {
      console.error(ex);
      return res.sendStatus(500);
    }
  });

  app.get(getBase(route), (req, res) => {
    try {
      if (!route.handler.get) return res.sendStatus(405);

      return route.handler.get(req, (result) => {
        return res.status(200).send(result);
      }, req);
    }
    catch (ex) {
      console.error(ex);
      return res.sendStatus(500);
    }
  });

  app.post(getBase(route), (req, res) => {
    try {
      if (!route.handler.post) return res.sendStatus(405);

      if (!Object.keys(req.body).length) {
        return res.status(400).send('No body');
      }

      return route.handler.post(req.body, (id) => {
        return res.status(200).set({'Location': id}).send('No Body');
      }, req);
    }
    catch (ex) {
      console.error(ex);
      return res.sendStatus(500);
    }
  });

  app.put(getBase(route) + '/:id', (req, res) => {
    try {
      if (!route.handler.put) return res.sendStatus(405);

      if (!Object.keys(req.body).length) {
        return res.status(400).send('No body');
      }

      let id = req.params.id;

      return route.handler.put(id, req.body, (result) => {
        if (!result) return res.sendStatus(404);
        return res.status(200).send(result);
      }, req);
    }
    catch (ex) {
      console.error(ex);
      return res.sendStatus(500);
    }
  });

  app.patch(getBase(route) + '/:id', (req, res) => {
    try {
      if (!route.handler.patch) return res.sendStatus(405);

      if (!Object.keys(req.body).length) {
        return res.status(400).send('No body');
      }

      let id = req.params.id;

      return route.handler.patch(id, req.body, (result) => {
        if (!result) return res.sendStatus(404);
        return res.status(200).send(result);
      }, req);
    }
    catch (ex) {
      console.error(ex);
      return res.sendStatus(500);
    }
  });

  app.delete(getBase(route) + '/:id', (req, res) => {
    try {
      if (!route.handler.delete) return res.sendStatus(405);

      let id = req.params.id;

      return route.handler.delete(id, (result) => {
        let status = result ? 204 : 404;
        return res.sendStatus(status);
      }, req);
    }
    catch (ex) {
      console.error(ex);
      return res.sendStatus(500);
    }
  });

  // Complain about PUT with no id.
  app.put(getBase(route), (req, res) => {
    return res.status(400).send('Bad request');
  });

  // Complain about PATCH with no id.
  app.patch(getBase(route), (req, res) => {
    return res.status(400).send('Bad request');
  });

  // Complain about DELETE with no id.
  app.delete(getBase(route), (req, res) => {
    return res.status(400).send('Bad request');
  });

};
