const express = require('express');
const userRouter = require('./user.routes');// Import the user routes
const questionRouter = require('./question.routes'); 
const answerRouter = require('./answer.routes');
const v1Router = express.Router(); // Create a new router

// Define a route group for /users
v1Router.use("/users", userRouter); // Use the userRouter for all /users routes
v1Router.use("/questions", questionRouter);
v1Router.use("/answers", answerRouter);

// Export the v1Router module
module.exports = v1Router;
