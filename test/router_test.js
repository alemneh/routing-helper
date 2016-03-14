'use strict';
const chai = require('chai');
const chaiHTTP = require('chai-http');
const fs = require('fs');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require('../server');

describe('Routing framework', () => {
  describe('Invoking .post() method', () => {
    it('should recive a POST request and add a new fighter', (done) => {
      request('localhost:3000')
        .post('/boxers/active')
        .send({boxer: 'ali'})
        .end((err, res) => {
          fs.readdir(__dirname+'/../data', (err, files) => {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(files.indexOf('ali.json')).to.not.eql(-1);
            done();
          });
        });
    });
  });
  describe('Invoking .get() method', () => {
    it('should recive a GET request and return all active figthers', (done) => {
      request('localhost:3000')
        .get('/boxers')
        .end((err, res) => {
          fs.readdir(__dirname+'/../data', (err, files) => {
            var num = files.length;
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.text.split('\n')[0]).to.eql('Current active boxers'+num+': ');
            done();
          });
        });
    });
  });
  describe('Invoking .put() method', () => {
    it('should recive a PUT request and update an active fighter', (done) => {
      request('localhost:3000')
        .put('/boxers/active')
        .send({boxer: 'ali'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.text).to.eql('ali was updated in the roster');
          done();
        });
    });
  });
  describe('Invoking .delete() method', () => {
    it('should recive a DELETE request and delete an active fighter', (done) => {
      request('localhost:3000')
        .delete('/boxers/active')
        .send({boxer: 'ali'})
        .end((err, res) => {
          fs.readdir(__dirname+'/../data', (err, files) => {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(files.indexOf('ali.json')).to.eql(-1);
            done();
          });
        });
    });
  });
});
