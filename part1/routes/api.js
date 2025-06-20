var express = require('express');
var router = express.Router();
const pool = require('../database');

router.get('/dogs', async function(req, res, next) {
  try {
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
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/walkrequests/open', async function(req, res, next) {
  try {
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
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/walkers/summary', async function(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT
        Users.username AS walker_username,
        (SELECT SUM(rating) FROM WalkRatings WHERE WalkRatings.walker_id = Users.user_id) AS total_ratings,
        (SELECT AVG(rating) FROM WalkRatings WHERE WalkRatings.walker_id = Users.user_id) as average_rating,
        (SELECT COUNT(*) FROM WalkApplications
          INNER JOIN WalkRequests
          ON WalkApplications.request_id = WalkRequests.request_id
          WHERE WalkApplications.status = 'accepted' AND WalkRequests.status = 'completed'
        ) as completed_walks
      FROM Users
      WHERE Users.role = 'walker';` // Implicit if there was a constraint
    );
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
