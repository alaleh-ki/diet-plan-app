const express = require('express');
const router = express.Router();
const {
  createMeal,
  deleteMeal,
  getMeals,
  updateMeal,
  getSingleMeal,
} = require('../controllers/meals.js');

// Routes for meals
router.route('/').post(createMeal).get(getMeals);
router.route('/:id').get(getSingleMeal).delete(deleteMeal).patch(updateMeal);

module.exports = router;
