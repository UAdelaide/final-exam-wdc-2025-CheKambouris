const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET user dogs
router.get('/', async (req, res) => {
  if (req.session.user) {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM Dogs
        INNER JOIN Users ON Dogs.owner_id = ?;`,
        req.session.user.user_id
      );
      res.json(rows);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  } else {
    res.send(401);
  }
});

module.exports = router;
