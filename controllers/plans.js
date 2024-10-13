const Plan = require('../models/Plan');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const createOrUpdatePlan = async (req, res) => {
  const { date, meals } = req.body;

  // Debugging request body
  console.log('Request Body:', req.body);

  if (!date || !meals || meals.length === 0) {
    throw new BadRequestError('Please provide a date, at least one meal, and a user ID.');
  }

  let plan = await Plan.findOneAndUpdate(
    { date, createdBy: req.user.userId},
    { meals },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ plan });
};


// Get Plan by Date
const getPlan = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    throw new BadRequestError('Please provide a date');
  }

  const plan = await Plan.findOne({
    date,
    createdBy: req.user.userId,
  }).populate('meals'); // Populate the meals field

  if (!plan) {
    return res.status(StatusCodes.OK).json({ msg: 'No plan found for this date', plan: null });
  }

  res.status(StatusCodes.OK).json({ plan });
};

module.exports = {
  createOrUpdatePlan,
  getPlan,
};
