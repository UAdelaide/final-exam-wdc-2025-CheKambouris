var express = require('express');
var router = express.Router();
const db = require('../database');

router.get('/dogs', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/walkrequests/open', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/walkers/summary', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
