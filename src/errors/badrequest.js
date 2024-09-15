const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends BaseError {
  constructor(propertyName, details) {
    //super is used to invoke base error constructor
    super(
      "Bad Request",
      StatusCodes.BAD_REQUEST,
      `Invalid Structure for ${propertyName} provided`,
      details
    );
  }
}

module.exports = BadRequest;
