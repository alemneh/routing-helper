'use strict';
const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require('../server');

describe('Routing framework', () => {
  describe('Invoking .get() method', () => {
    it('should recive a GET request', () => {
      request('localhost:3000')
        .get('/boxers')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(404);
        });
    });
  });
  describe('Invoking .post() method', () => {
    it('should recive a POST request', () => {
      request('localhost:3000')
        .post('/boxers/message')
        .send({msg: 'Im the greatest!'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(404);
          console.log(req.text);
        });
    });
  });
});
