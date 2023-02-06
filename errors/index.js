const badRequestError      = require('./bad-request');
const customAPIError       = require('./custom-api');
const NotFoundError        = require('./not-found');
const UnauthenticatedError = require('./unauthenticated');



module.exports = {
    customAPIError,
    UnauthenticatedError,
    NotFoundError,
    badRequestError
}