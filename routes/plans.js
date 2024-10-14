const express = require('express');
const router = express.Router();
const {
  createOrUpdatePlan,
  getPlan,
  deletePlan, // Import the deletePlan function
} = require('../controllers/plans');

// Route to create or update a plan (POST)
router.route('/').post(createOrUpdatePlan);

// Route to get a plan by date (GET)
router.route('/').get(getPlan);

// Route to delete a plan by ID (DELETE)
router.route('/:id').delete(deletePlan); // Add this line for DELETE requests

module.exports = router;
