var express = require('express');
var router = express.Router();
const pool = require('../database');

router.get('/dogs', async function(req, res, next) {
  const [rows] = await pool.query(
    `SELECT
      Dogs.name AS dog_name,
      Dogs.size,
      Users.username AS owner_username
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

/**
Return all open walk requests, including the dog name, requested time,
 location, and owner's username.

Sample Response:

[
  {
    "request_id": 1,
    "dog_name": "Max",
    "requested_time": "2025-06-10T08:00:00.000Z",
    "duration_minutes": 30,
    "location": "Parklands",
    "owner_username": "alice123"
  }
]
 */
router.get('/walkrequests/open', async function(req, res, next) {
  const [rows] = await pool.query(
    `SELECT
      Dogs.name AS dog_name,
      Dogs.size,
      Users.username AS owner_username
    FROM WalkRequests
    INNER JOIN Users
    ON WalkRequests.owner_id = Users.user_id;`
  );
  res.send(rows.map((row) => ({
    request_id:
    dog_name:
    requested_time:
    duration_minutes:
    location:
    owner_username:
  })));
});

router.get('/walkers/summary', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
