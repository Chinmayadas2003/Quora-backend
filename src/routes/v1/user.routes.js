const express = require('express'); // Import express using CommonJS
const { userController } = require('../../controllers/index'); // Import userController
const userRouter = express.Router(); // Create a new router

// Define the routes for the userRouter
userRouter.get('/ping', userController.pingUserController);
userRouter.post('/', userController.createUser);
userRouter.get('/:id', userController.getUser);
userRouter.get('/', userController.getAllUsers);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

// Export the userRouter module
module.exports = userRouter;
