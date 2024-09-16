const { UserService } = require('../services/index');
const { UserRepository } = require('../repositories/index');
const StatusCodes = require('http-status-codes');

const userService = new UserService(new UserRepository());

function pingUserController(req, res) {
  return res.json({ message: "pong problem controller" });
}

async function createUser(req, res, next) {
  try {
    const newUser = await userService.createUser(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'New User Created Successfully',
      error: {},
      data: newUser
    });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await userService.getUser(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User Fetched",
      error: {},
      data: user
    });
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "All Users Fetched",
      error: {},
      data: users
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User Updated",
      error: {},
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const deleteUser = await userService.deleteUser(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User Deleted",
      error: {},
      data: deleteUser
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  pingUserController,
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};


