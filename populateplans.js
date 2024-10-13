require('dotenv').config();
const connectDB = require('./db/connect');
const Plan = require('./models/plans'); // Adjust the path as necessary
const jsonPlans = require('./plans.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Plan.deleteMany(); // Clear existing plans
    await Plan.create(jsonPlans); // Insert new plans
    console.log('Plan data populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating plan data:', error);
    process.exit(1);
  }
};

start();
