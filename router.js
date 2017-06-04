let getBase = (route) => {
  return '/' + route.path;
};

let responder = (route, name, action) => {
  return (req, res) => {
    try {
      if (!route.handler[name]) return res.sendStatus(405);
      return action(req, res);
    }
    catch (ex) {
      console.error(ex);
      return res.sendStatus(500);
    }
  };
};

module.exports = (app, route) => {

  app.get(getBase(route) + '/:id', responder(route, 'getOne', (req, res) => {
    let id = req.params.id;
    return route.handler.getOne(id, (result) => {
      if (!result) return res.sendStatus(404);
      return res.status(200).send(result);
    }, req);
  }));

  app.get(getBase(route), responder(route, 'get', (req, res) => {
    return route.handler.get((result) => {
      return res.status(200).send(result);
    }, req);
  }));

  app.post(getBase(route), responder(route, 'post', (req, res) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).send('No body');
    }
    return route.handler.post(req.body, (id) => {
      return res.set({'Location': id}).sendStatus(200);
    }, req);
  }));

  app.put(getBase(route) + '/:id', responder(route, 'put', (req, res) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).send('No body');
    }
    let id = req.params.id;
    return route.handler.put(id, req.body, (result) => {
      if (!result) return res.sendStatus(404);
      return res.status(200).send(result);
    }, req);
  }));

  app.patch(getBase(route) + '/:id', responder(route, 'patch', (req, res) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).send('No body');
    }
    let id = req.params.id;
    return route.handler.patch(id, req.body, (result) => {
      if (!result) return res.sendStatus(404);
      return res.status(200).send(result);
    }, req);
  }));

  app.delete(getBase(route) + '/:id', responder(route, 'delete', (req, res) => {
    let id = req.params.id;
    return route.handler.delete(id, (result) => {
      let status = result ? 204 : 404;
      return res.sendStatus(status);
    }, req);
  }));

  // Complain about PUT with no id.
  app.put(getBase(route), (req, res) => {
    return res.status(400).send('No id');
  });

  // Complain about PATCH with no id.
  app.patch(getBase(route), (req, res) => {
    return res.status(400).send('No id');
  });

  // Complain about DELETE with no id.
  app.delete(getBase(route), (req, res) => {
    return res.status(400).send('No id');
  });

};
