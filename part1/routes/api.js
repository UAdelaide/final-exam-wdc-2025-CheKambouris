var express = require('express');
var router = express.Router();
const pool = require('../database');

router.get('/dogs', async function(req, res, next) {
  const [rows] = await pool.query(
    `SELECT Dogs.name, Dogs.size, User.username AS owner_username
    FROM Dogs
    INNER JOIN Users
    ON Dogs.owner_id = Users.user_id;`
  );
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
