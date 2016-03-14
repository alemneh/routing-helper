# routing-helper
This is a framework for routing

Features
HTTP verbs

##Installation

```
npm install routing-helper
```
##Setting up basic router
```javascript
var Router = requier('router-helper');

// responds with "Welcome" when a get request is made to homepage
Router.get('/', (req, res) => {
  res.send('Welcome')
});
```
## Other HTTP verb methods
```javascript
// Makes a POST request
Router.post('/messages', (req, res) => {

});

// Makes a PUT request
Router.put('/messages/:id', (req,res) => {

});

// Makes a DELETE request
Router.delete('/messages/:id', (req,res) => {

});
```
