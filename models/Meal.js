const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide meal name'],
    maxlength: 100,
  },
  calories: {
    type: Number,
    required: [true, 'Please provide calorie count'],
  },
  type: {
    type: String,
    enum: ['meal','snack'],
    required: [true, 'Please provide meal type'],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Meal', MealSchema);
