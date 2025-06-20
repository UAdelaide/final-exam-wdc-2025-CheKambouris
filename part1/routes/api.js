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
  res.send(rows);
});

router.get('/walkrequests/open', async function(req, res, next) {
  const [rows] = await pool.query(
    `SELECT
      WalkRequests.request_id,
      Dogs.name AS dog_name,
      WalkRequests.requested_time,
      WalkRequests.duration_minutes,
      WalkRequests.location,
      Users.username AS owner_username
    FROM WalkRequests
    INNER JOIN Dogs
      ON WalkRequests.dog_id = Dogs.dog_id
    INNER JOIN Users
      ON Dogs.owner_id = Users.user_id
    WHERE WalkRequests.status = 'open';`
  );
  res.send(rows);
});

/**
/api/walkers/summary

Return a summary of each walker with their average rating and number of completed walks.

Sample Response:

[
  {
    "walker_username": "bobwalker",
    "total_ratings": 2,
    "average_rating": 4.5,
    "completed_walks": 2
  },
  {
    "walker_username": "newwalker",
    "total_ratings": 0,
    "average_rating": null,
    "completed_walks": 0
  }
]

 */
router.get('/walkers/summary', async function(req, res, next) {
  const [rows] = await pool.query(
    `SELECT
      Users.username AS walker_username,
      (SELECT SUM(rating) FROM WalkRatings WHERE WalkRatings.walker_id = Users.user_id) AS total_ratings,
      (SELECT AVG(rating) FROM WalkRatings WHERE WalkRatings.walker_id = Users.user_id) as average_rating,
      (SELECT COUNT(*) FROM WalkApplications
        INNER JOIN WalkRequests
        ON WalkApplications.request_id = WalkRequests.request_id
        WHERE WalkApplications.status = 'accepted'
          ) as completed_walks
    FROM Users
    WHERE Users.role = 'walker';` // Implicit if there was a constraint
  );
  res.send(rows);
});

module.exports = router;
