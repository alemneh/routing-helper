'use strict';
var http = require('http');
var Router = require('./router-helper');
var BoxersRouter = new Router();

BoxersRouter.get('/boxers', (req, res) => {
  console.log('/boxers GET route hit');

  res.end();
});

BoxersRouter.post('/boxers', (req, res) => {
  console.log('/boxers POST route hit');

  res.end();
});

BoxersRouter.put('/boxers', (req, res) => {
  console.log('/boxers PUT route hit');

  res.end();
});

BoxersRouter.patch('/boxers', (req, res) => {
  console.log('/boxers PATCH route hit');

  res.end();
});

BoxersRouter.delete('/boxers', (req, res) => {
  console.log('/boxers DELETE route hit');

  res.end();
});

http.createServer(BoxersRouter.route()).listen(3000, () => {
  console.log('Server running on port 3000');
});
