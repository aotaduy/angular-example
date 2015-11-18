'use strict';

var express = require('express');

var router = express.Router();

var controller = require('./random.controller');
router.get('/', controller.fast);
router.get('/faulty', controller.faulty);
router.get('/fast', controller.fast);
router.get('/slow', controller.slow);

module.exports = router;
