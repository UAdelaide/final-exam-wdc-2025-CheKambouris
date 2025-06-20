const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET user dogs
router.get('/', async (req, res) => {
  if (req.session.user) {

  }
  
});
