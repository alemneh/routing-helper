'use strict';

/**
* Represents a Router for Http verbs
* @constructor
*/
var Router = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'DELETE': {}
  };
};

/**
* Represents the GET method
* @method
* @param {string} route - The url of the request
* @param {function} cb - Callback function
*/
Router.prototype.get = function(route, cb) {
  this.routes['GET'][route] = cb;
};

/**
* Represents the POST method
* @method
* @param {string} route - The url of the request
* @param {function} cb - Callback function
*/
Router.prototype.post = function(route, cb) {
  this.routes['POST'][route] = cb;
};

/**
* Represents the PUT method
* @method
* @param {string} route - The url of the request
* @param {function} cb - Callback function
*/
Router.prototype.put = function(route, cb) {
  this.routes['PUT'][route] = cb;
};

/**
* Represents the DELETE method
* @method
* @param {string} route - The url of the request
* @param {function} cb - Callback function
*/
Router.prototype.delete = function(route, cb) {
  this.routes['DELETE'][route] = cb;
};

/**
* Represents the DELETE method
* @method
* @param {string} route - The url of the request
* @param {function} cb - Callback function
*/
Router.prototype.log = function(url, method) {
  console.log('URL: '+url+'\n Method: '+method);
};


/**
* Represents the route method
* @method
*/
Router.prototype.route = function() {
  return (req, res) => {
    var routeFunction = this.routes[req.method][req.url];
    routeFunction(req, res);
  };
};
