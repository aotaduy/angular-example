/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var express = require('express');
var serveIndex = require('serve-index')
var demoDir = path.resolve(__dirname + '/../client/demo/');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/movies', require('./api/movies')(app));
  app.use('/api/random', require('./api/random'));
  // Serve demo directory
  app.use('/demo/', serveIndex(demoDir, {'icons': true}));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
