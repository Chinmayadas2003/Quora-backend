const BaseError = require('./base.error');
const { StatusCodes } = require('http-status-codes');

class InternalServer extends BaseError {
    constructor(details) {
        super(
            "Internal Server Error",         // Error name
            StatusCodes.INTERNAL_SERVER_ERROR,  // HTTP Status Code 500
            "Internal Server Error",         // Error message
            details                          // Additional error details
        );
    }
}

module.exports = InternalServer;
