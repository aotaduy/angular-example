'use strict';

var express = require('express');

var router = express.Router();
function createRouter(app) {

    var controller = require('./movies.controller')(app) ;
    router.get('/', controller.index);
    router.get('/info/:movieId', controller.get);
    router.get('/configuration', controller.configuration);
    router.get('/playing', controller.nowPlaying);
    router.get('/search/:query', controller.search);
    router.post('/review/:movieId', controller.review);
    return router;
}
module.exports = createRouter;
