const Plan = require('../models/Plan');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const createOrUpdatePlan = async (req, res) => {
  const { date, meals, asignedTo } = req.body;

  // Ensure required fields for creating a new plan
  if (!date || !meals || meals.length === 0) {
    throw new BadRequestError('Please provide a date and at least one meal.');
  }

  // Check if the plan already exists for the given date and user
  const existingPlan = await Plan.findOne({ date, asignedTo: req.user.userId });

  // If updating, asignedTo is not required
  if (!existingPlan && !asignedTo) {
    throw new BadRequestError('Please provide a user ID when creating a new plan.');
  }

  // Create or update the plan
  const plan = await Plan.findOneAndUpdate(
    { date, createdBy: req.user.userId },
    { meals, asignedTo: existingPlan ? existingPlan.asignedTo : asignedTo },
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
    asignedTo: req.user.userId,
  }).populate('meals'); // Populate the meals field

  if (!plan) {
    return res.status(StatusCodes.OK).json({ msg: 'No plan found for this date', plan: null });
  }

  res.status(StatusCodes.OK).json({ plan });
};

// Delete Plan by ID
const deletePlan = async (req, res) => {
  const { id } = req.params; // Get the plan ID from the URL parameters

  // Check if the plan exists for the given ID and user
  const plan = await Plan.findOneAndDelete({
    _id: id,
    createdBy: req.user.userId, // Ensure the user is authorized to delete this plan
  });

  if (!plan) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No plan found with this ID' });
  }

  res.status(StatusCodes.OK).json({ msg: 'Plan deleted successfully' });
};


module.exports = {
  createOrUpdatePlan,
  getPlan,
  deletePlan, // Add this line
};

