const BaseError = require('../errors/base.error');
const { StatusCodes } = require('http-status-codes');

function errorHandler(err, req, res, next) {
  // Check if the error is an instance of BaseError (custom error)
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
      data: {},
    });
  }

  // Handle other errors (non-custom, unexpected errors)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong",
    details: err,
    data: {},
  });
}

module.exports = errorHandler;
