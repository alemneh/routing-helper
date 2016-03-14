'use strict';
var http = require('http');
var Router = require('./lib/router-helper');
var BoxersRouter = new Router();
var fs = require('fs');
var counter = 0;

BoxersRouter.get('/boxers', (req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  fs.readdir('data', (err, files) => {
    var num = files.length;
    res.write('Current active boxers'+num+': \n');
    if(err) throw err;
    files.forEach( (file) => {
      fs.readFile('data/' + file, 'utf8', (err, data) => {
        if(err) throw err;
        res.write(JSON.parse(data).boxer + '\n');
        counter++;
        if(counter == files.length){
          res.end();
        }
      }); // end readFile
    });// end forEach
  });// end readdir
});// end GET

BoxersRouter.post('/boxers/active', (req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  req.on('data', (data) => {
    var boxer = JSON.parse(data).boxer;
    fs.writeFile('data/' + boxer + '.json', data, (err) => {
      if(err) throw err;
      res.writeHead(200, {'content-type': 'text/html'});
      res.write(boxer+' was added to the roster');
      return res.end();
    });// end writeFile
  });// end on data
});// end POST

BoxersRouter.put('/boxers/active', (req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  req.on('data', (data) => {
    var boxer = JSON.parse(data).boxer;
    fs.writeFile('data/' + boxer + '.json', data, (err) => {
      if(err) throw err;
      res.writeHead(200, {'content-type': 'text/html'});
      res.write(boxer+' was updated in the roster');
      return res.end();
    });// end writeFile
  });// end on data
});// end PUT


BoxersRouter.delete('/boxers/active', (req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  req.on('data', (data) => {
    var fighter = JSON.parse(data).boxer;
    fs.unlink('data/'+fighter+'.json', (err) => {
      if(err) throw err;
      res.writeHead(200, {'content-type': 'text/html'});
      res.write(fighter+' was deleted from the roster');
      return res.end();
    });// end unlink
  });// end data
});// end DELETE


http.createServer(BoxersRouter.route()).listen(3000, () => {
  console.log('Server running on port 3000');
});
