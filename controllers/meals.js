const Meal = require('../models/Meal');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createMeal = async (req, res) => {
  const { name, calories, type } = req.body;

  if (!name || !calories || !type) {
    throw new BadRequestError('Please provide all required fields');
  }

  const meal = await Meal.create({ ...req.body, createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ meal });
};

const getMeals = async (req, res) => {
  const meals = await Meal.find({});
  res.status(StatusCodes.OK).json({ meals, count: meals.length });
};

const getSingleMeal = async (req, res) => {
  const { id: mealId } = req.params;
  const meal = await Meal.findOne({
    _id: mealId,
    createdBy: req.user.userId,
  });

  if (!meal) {
    throw new NotFoundError(`No meal found with id: ${mealId}`);
  }

  res.status(StatusCodes.OK).json({ meal });
};

const updateMeal = async (req, res) => {
  const { id: mealId } = req.params;
  const { name, calories, type } = req.body;

  if (!name || !calories || !type) {
    throw new BadRequestError('Please provide all required fields');
  }

  const meal = await Meal.findOneAndUpdate(
    { _id: mealId, createdBy: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!meal) {
    throw new NotFoundError(`No meal found with id: ${mealId}`);
  }

  res.status(StatusCodes.OK).json({ meal });
};

const deleteMeal = async (req, res) => {
  const { id: mealId } = req.params;

  const meal = await Meal.findOneAndRemove({
    _id: mealId,
    createdBy: req.user.userId,
  });

  if (!meal) {
    throw new NotFoundError(`No meal found with id: ${mealId}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Meal removed' });
};

module.exports = {
  createMeal,
  getMeals,
  getSingleMeal,
  updateMeal,
  deleteMeal,
};
