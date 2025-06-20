var logger = require('morgan');
const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const db = require('./models/db');


const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(logger('dev'));
app.use(session({
  secret: 'supersecret'
}));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dogs', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT
        Dogs.*,
        Users.username AS owner_username
      FROM Dogs
      INNER JOIN Users
      ON Dogs.owner_id = Users.user_id;`
    );
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Export the app instead of listening here
module.exports = app;
