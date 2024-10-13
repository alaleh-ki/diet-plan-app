# Diet Plan App

## Overview
The **Diet Plan App** is a Node.js application built using Express.js and MongoDB (via Mongoose). It provides users with a platform to manage diet plans and meals, allowing you to populate meal data and plan data from JSON files. The app is designed with RESTful API routes for handling different actions like meal and plan management.

## Features
- RESTful API for managing diet plans and meals
- JWT-based authentication
- Database interaction using Mongoose
- Environment configuration using dotenv
- Error handling using express-async-errors

## Prerequisites
- Node.js (v16.x or higher)
- MongoDB (local or cloud-based instance)

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd diet-plan-app
Install dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file in the root directory and add the following:

makefile
Copy code
PORT=3000
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret>
Populate the database: To populate meals and plans data, run the following scripts:

bash
Copy code
node populateMeals.js
node populateplans.js
Running the App
To start the server in development mode:

bash
Copy code
npm run dev
The app will run at http://localhost:3000.

API Endpoints
GET /api/meals: Get all meals
GET /api/plans: Get all plans
POST /api/meals: Add a new meal
POST /api/plans: Add a new plan
