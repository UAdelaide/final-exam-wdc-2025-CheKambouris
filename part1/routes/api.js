var express = require('express');
var router = express.Router();
const conn = require('../database');

router.get('/dogs', function(req, res, next) {
  const [rows] = conn.execute(`SELECT * FROM Dogs');
  res.send(rows.map((row) => ({
    dog_name: row.dog_name,
    size: row.size,
    owner_username: row.owner_username
  })));
});

router.get('/walkrequests/open', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/walkers/summary', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
