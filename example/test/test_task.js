const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const describe = mocha.describe;
const it = mocha.it;
const assert = chai.assert;

chai.use(chaiHttp);

const URI = '/person/123/task/';
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
      assert.equal(res.statusCode, 405);
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

        let id = res.headers.location;
        assert.isNotNull(id);

        done(deleteEntry(id));
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
        assert.isNotNull(id);
        
        chai.request(server)
          .get(URI + id)
          .end( (err, res) => {
            assert.isNull(err);
            assert.deepEqual(res.body, BASE);

            done(deleteEntry(id));
          });
      });
  });

  it('should return an existing item', (done) => {
    chai.request(server)
      .post(URI)
      .send(BASE)
      .end( (err, res) => {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        let id = res.headers.location;
        assert.isNotNull(id);
        
        chai.request(server)
          .get(URI + id)
          .end( (err, res) => {
            assert.isNull(err);
            assert.deepEqual(res.body, BASE);

            done(deleteEntry(id));
          });
      });
  });

  it('should not allow modification of an existing item', (done) => {
    chai.request(server)
      .post(URI)
      .send(BASE)
      .end( (err, res) => {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        let id = res.headers.location;
        assert.isNotNull(id);
        
        let modified = BASE;
        BASE.Description = 'Changed';
        
        chai.request(server)
          .put(URI + id)
          .send(modified)
          .end( (err, res) => {
            assert.equal(res.statusCode, 405);

            chai.request(server)
              .patch(URI + id)
              .send({ Description: 'Changed again'})
              .end( (err, res) => {
                assert.equal(res.statusCode, 405);
                
                done(deleteEntry(id));
              });
          });
      });
  });
});
