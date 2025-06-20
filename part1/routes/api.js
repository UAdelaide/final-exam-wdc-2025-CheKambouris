var express = require('express');
var router = express.Router();
const conn = require('../database');

router.get('/dogs', function(req, res, next) {
  const [rows] = conn.execute('SELECT * FROM Dogs');
  res.send(rows.map((row) => {
  
  }))
});

router.get('/walkrequests/open', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/walkers/summary', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
