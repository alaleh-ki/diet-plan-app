const express = require('express');
const router = express.Router();
const {
  createOrUpdatePlan,
  getPlan,
} = require('../controllers/plans');

// Route to create or update a plan (POST)
router.route('/').post(createOrUpdatePlan);

// Route to get a plan by date (GET)
router.route('/').get(getPlan);

module.exports = router;
