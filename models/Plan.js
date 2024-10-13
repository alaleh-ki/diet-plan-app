const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please provide a date for the plan'],
  },
  meals: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Meal',
    }
  ],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  asignedTo: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Plan', PlanSchema);
