const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const describe = mocha.describe;
const it = mocha.it;
const assert = chai.assert;

chai.use(chaiHttp);

const URI = '/person/';
const BASE = {
  FirstName: 'First',
  LastName: 'Last',
  BirthDate: '01/01/1970'
};

let deleteEntry = (id) => {
  chai.request(server)
    .delete(URI + id)
    .end( (err, res) => {
      assert.isNull(err);
    });
};

describe('HTTP service', () => {
  let ids;

  it('should allow creation of new item', (done) => {
    chai.request(server)
      .post(URI)
      .send(BASE)
      .end( (err, res) => {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        assert.property(res.headers, 'location');

        deleteEntry(res.headers.location);
        done();
      });
  });

  it('should complain if you try to create with no body', (done) => {
    chai.request(server)
      .post(URI)
      .end( (err, res) => {
        assert.isNotNull(err);
        assert.equal(res.statusCode, 400);

        done();
      });
  });

  it('should return an existing item', (done) => {
    chai.request(server)
      .post(URI)
      .send(BASE)
      .end( (err, res) => {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        assert.property(res.headers, 'location');

        let id = res.headers.location;
        chai.request(server)
          .get(URI + id)
          .end( (err, res) => {
            assert.isNull(err);
            assert.deepEqual(res.body, BASE);

            deleteEntry(id);
            done();
          });
      });
  });

  it('should complain if you try to GET all (not implemented)', (done) => {
    chai.request(server)
      .get(URI)
      .end( (err, res) => {
        assert.isNotNull(err);
        assert.equal(err.response.statusCode, 405);
        done();
      });
  });

  it('should complain if you try to PUT without an id', (done) => {
    chai.request(server)
      .put(URI)
      .send(BASE)
      .end( (err, res) => {
        assert.isNotNull(err);
        assert.equal(err.response.statusCode, 400);
        done();
      });
  });

  it('should complain if you try to PUT (not implemented)', (done) => {
    chai.request(server)
      .put(URI + '1234')
      .send(BASE)
      .end( (err, res) => {
        assert.isNotNull(err);
        assert.equal(err.response.statusCode, 405);
        done();
      });
  });

  it('should complain if you try to PATCH without an id', (done) => {
    chai.request(server)
      .patch(URI)
      .send(BASE)
      .end( (err, res) => {
        assert.isNotNull(err);
        assert.equal(err.response.statusCode, 400);
        done();
      });
  });

  it('should complain if you try to PATCH (not implemented)', (done) => {
    chai.request(server)
      .patch(URI + '1234')
      .send(BASE)
      .end( (err, res) => {
        assert.isNotNull(err);
        assert.equal(err.response.statusCode, 405);
        done();
      });
  });

  it('should complain if you try to DELETE without an id', (done) => {
    chai.request(server)
      .delete(URI)
      .send(BASE)
      .end( (err, res) => {
        assert.isNotNull(err);
        assert.equal(err.response.statusCode, 400);
        done();
      });
  });

});
