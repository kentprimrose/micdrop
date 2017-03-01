process.env.LOGFMT = 'none';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = chai.assert;

chai.use(chaiHttp);

const URI = '/task/';
const BASE = {
  PersonId: '1234',
  Description: 'This is a cool task',
  DueDate: '01/01/2018',
  DoneDate: null
};

let deleteEntry = (id) => {
  chai.request(server)
    .delete(URI + id)
    .end( (err, res) => {
      assert.isNull(err);
    });
}

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
        assert.deepEqual(res.body, BASE);

        deleteEntry(res.headers.location);
        done();
      });
  });

  it('should complain if you try to create with no body', (done) => {
    chai.request(server)
      .post(URI)
      .end( (err, res) => {
        assert.equal(res.statusCode, 400);

        assert.notProperty(res.headers, 'location');
        done();
      });
  });

  it('should return an existing item', (done) => {
    chai.request(server)
      .post(URI)
      .send(BASE)
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);

        let id = res.headers.location;
        chai.request(server)
          .get(URI + id)
          .end( (err, res) => {
            assert.deepEqual(res.body, BASE);

            deleteEntry(id);
            done();
          });
      });
  });

  it('should return an existing item', (done) => {
    chai.request(server)
      .post(URI)
      .send(BASE)
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);

        let id = res.headers.location;
        chai.request(server)
          .get(URI + id)
          .end( (err, res) => {
            assert.deepEqual(res.body, BASE);

            deleteEntry(id);
            done();
          });
      });
  });
});
