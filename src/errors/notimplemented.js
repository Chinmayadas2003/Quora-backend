const BaseError = require('./base.error');
const { StatusCodes } = require('http-status-codes');

class NotImplemented extends BaseError {
    constructor(methodName) {
        super(
            "Not Implemented",            // Error name
            StatusCodes.NOT_IMPLEMENTED,   // HTTP Status Code 501
            `${methodName} Not Implemented`,  // Error message
            {}  // Additional details (empty object in this case)
        );
    }
}

module.exports = NotImplemented;
