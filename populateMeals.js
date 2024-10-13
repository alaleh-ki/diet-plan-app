require('dotenv').config();
const connectDB = require('./db/connect');
const Meal = require('./models/Meal'); // Adjust the path as necessary
const jsonMeals = require('./meals.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Meal.deleteMany(); // Clear the existing meals collection
    await Meal.create(jsonMeals); // Insert the new meals
    console.log('Meal data populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating meal data:', error);
    process.exit(1);
  }
};

start();
