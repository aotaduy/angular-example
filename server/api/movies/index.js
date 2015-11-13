'use strict';

var express = require('express');

var router = express.Router();
function createRouter(app) {
    if (!process.env.MOVIEDB_API) {
        router.get('/', function(req, res){
            res.status({status: 404});
            res.json({error: 404})
        });
    } else {
        var controller = require('./movies.controller')(app) ;
        router.get('/', controller.index);
        router.get('/info/:movieId', controller.get);
        router.get('/configuration', controller.configuration);
        router.get('/playing', controller.nowPlaying);
        router.get('/search/:query', controller.search);
    }
    return router;
}
module.exports = createRouter;
