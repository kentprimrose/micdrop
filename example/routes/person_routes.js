const store = require('memrest')();

module.exports = (app, url) => {

  app.get(url, (req, res) => {
    return res
      .status(200)
      .send(store.get());
  });

  app.get(url + '/:id', (req, res) => {
    let id = req.params.id;
    let result = store.getOne(id);

    if (!result) return res.sendStatus(404);

    return res
      .status(200)
      .send(result);
  });

  app.post(url, (req, res) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .send('No body');
    }

    let id = store.post(req.body);

    return res
      .status(200)
      .set({'Location': id})
      .send(req.body);
  });

  app.put(url + '/:id', (req, res) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .send('No body');
    }

    let id = req.params.id;
    let result = store.post(id, req.body);

    if (!result) return res.sendStatus(404);

    return res
      .status(200)
      .send(result);
  });

  app.patch(url + '/:id', (req, res) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .send('No body');
    }

    let id = req.params.id;
    let result = store.patch(id, req.body);

    if (!result) return res.sendStatus(404);

    return res
      .status(200)
      .send(result);
  });

  app.delete(url + '/:id', (req, res) => {
    let id = req.params.id;

    let result = store.delete(id);
    let status = result ? 204 : 404;

    return res
      .sendStatus(status);
  });
};
