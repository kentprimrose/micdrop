let getBase = (route) => {
  return '/' + route.name;
};

module.exports = (app, route) => {

  app.get(getBase(route), (req, res) => {
    if (!route.handler.get) return res.sendStatus(405);

    return res
      .status(200)
      .send(route.handler.get());
  });

  app.get(getBase(route) + '/:id', (req, res) => {
    if (!route.handler.getOne) return res.sendStatus(405);

    let id = req.params.id;
    let result = route.handler.getOne(id);

    if (!result) return res.sendStatus(404);

    return res
      .status(200)
      .send(result);
  });

  app.post(getBase(route), (req, res) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .send('No body');
    }

    if (!route.handler.post) return res.sendStatus(405);
    let id = route.handler.post(req.body);

    return res
      .status(200)
      .set({'Location': id})
      .send(req.body);
  });

  app.put(getBase(route) + '/:id', (req, res) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .send('No body');
    }

    let id = req.params.id;
    if (!route.handler.post) return res.sendStatus(405);
    let result = route.handler.post(id, req.body);

    if (!result) return res.sendStatus(404);

    return res
      .status(200)
      .send(result);
  });

  app.patch(getBase(route) + '/:id', (req, res) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .send('No body');
    }

    let id = req.params.id;
    if (!route.handler.post) return res.sendStatus(405);
    let result = route.handler.patch(id, req.body);

    if (!result) return res.sendStatus(404);

    return res
      .status(200)
      .send(result);
  });

  app.delete(getBase(route) + '/:id', (req, res) => {
    let id = req.params.id;
    if (!route.handler.post) return res.sendStatus(405);

    let result = route.handler.delete(id);
    let status = result ? 204 : 404;

    return res
      .sendStatus(status);
  });
};