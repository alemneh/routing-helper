'use strict';
var http = require('http');
var Router = require('./lib/router-helper');
var BoxersRouter = new Router();
var fs = require('fs');
var counter = 0;

BoxersRouter.get('/boxers', (req, res) => {
  console.log(req.params);
  res.writeHead(200, {'content-type': 'text/html'});
  fs.readdir('data', (err, files) => {
    res.write('Current active boxers: \n');
    if(err) throw err;
    files.forEach( (file) => {
      fs.readFile('data/' + file, 'utf8', (err, data) => {
        if(err) throw err;
        console.log(data);
        res.write(JSON.parse(data).boxer + '\n');
        counter++;
        if(counter == files.length){
          res.end();
        }
      }); // end readFile
    });// end forEach
  });// end readdir
});

BoxersRouter.post('/boxers', (req, res) => {
  req.on('data', (data) => {
    var boxer = JSON.parse(data).boxer;
    fs.writeFile('data/' + boxer + '.json', data, (err) => {
      if(err) throw err;
      res.writeHead(200, {'content-type': 'text/html'});
      res.write(boxer+' was added to the roster');
      return res.end();
    });// end writeFile
  });// end on data
});

BoxersRouter.put('/boxers', (req, res) => {
  console.log('/boxers PUT route hit');

  res.end();
});


BoxersRouter.delete('/boxers/mayweather', (req, res) => {
  var record = req.url.slice(8);
  fs.unlink('data/'+record+'.json', (err) => {
    if(err) throw err;
    res.writeHead(200, {'content-type': 'text/html'});
    res.write(record+' was deleted from the roster');
    return res.end();
  });
});


http.createServer(BoxersRouter.route()).listen(3000, () => {
  console.log('Server running on port 3000');
});
