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

describe('HTTP service middleware', () => {
  let ids;

  it('should set expected headers', (done) => {
    chai.request(server)
      .post(URI)
      .send(BASE)
      .end( (err, res) => {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        assert.propertyVal(res.headers, 'test', 'OK');

        deleteEntry(res.headers.location);
        done();
      });
  });
});
