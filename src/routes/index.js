const express = require('express');
const v1Router = require('./v1/index'); // Import the v1 router
const apiRouter = express.Router(); // Create a new router

// Define the route group for /v1
apiRouter.use('/v1', v1Router); // Use the v1Router for all /v1 routes

// Export the apiRouter module
module.exports = apiRouter;
