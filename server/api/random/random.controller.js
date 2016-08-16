/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';
var xml = require('xml')

// Get list of things
exports.fast = fast;
exports.slow = slow;
exports.faulty = faulty;
exports.xml = xmlRoute;


function fast(req, res) {
        res.json({value: Math.random()});
}

function slow(req, res) {
    setTimeout(function() {
        res.json({value: Math.random()});
    }, Math.floor(2000 * Math.random()));
}

function faulty(req, res) {
    setTimeout(function() { // Add some delay just to add suspense
        var value = Math.random(),
            status;
        if (value < 0.5) {
            status = [401, 403, 404, 500, 503][Math.floor(Math.random() * 5)];
            res.status(status);
        }
        res.json({value: value});
    }, Math.floor(1000 * Math.random()));
}

function xmlRoute(req, res) {
      res.set('Content-Type', 'text/xml');
        console.log(xml({value: Math.random()}));
        res.send(xml({value: Math.random()}));
}
