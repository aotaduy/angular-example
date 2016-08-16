'use strict';

var express = require('express');

var router = express.Router();

var controller = require('./random.controller');
router.get('/', controller.fast);
router.get('/faulty', controller.faulty);
router.post('/faulty', controller.faulty);
router.get('/fast', controller.fast);
router.post('/fast', controller.fast);
router.get('/slow', controller.slow);
router.post('/slow', controller.slow);
router.put('/slow', controller.slow);
router.get('/xml', controller.xml);


module.exports = router;
