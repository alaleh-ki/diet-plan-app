require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
const cors = require('cors');
app.use(cors()); // Add this line to enable CORS

app.use(express.static('./public'));

// Routers
const authRouter = require('./routes/auth');
const mealsRouter = require('./routes/meals');
const plansRouter = require('./routes/plans');
// Error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Diet Plan API</h1>');
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/meals', authenticateUser, mealsRouter);
app.use('/api/v1/plans', authenticateUser, plansRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
