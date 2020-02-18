/**
 * Created by ashishprasher on 18/02/20.
 */

const constants                   = require('./responseConstants');


const parameterMissingResponse = (res, err, data) => {
  let response = {
    message: err || constants.responseMessages.PARAMETER_MISSING,
    status : constants.responseStatus.BAD_REQUEST,
    data   : data || {}
  };
  res.status(constants.responseHttpStatus.BAD_REQUEST).send(JSON.stringify(response));
};

const invalidAuthKey = (res, data) => {
  let response = {
    message: constants.responseMessages.INVALID_AUTH_KEY,
    status : constants.responseStatus.UNAUTHORIZED,
    data   : data || {}
  };
  res.status(constants.responseHttpStatus.UNAUTHORIZED).send(JSON.stringify(response));
};

const internalServerError = (res, data) => {
  let response = {
    message: constants.responseMessages.INTERNAL_SERVER_ERROR,
    status : constants.responseStatus.INTERNAL_SERVER_ERROR,
    data   : data || {}
  };
  res.status(constants.responseHttpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(response));
};

const success = (res, data) => {
  let response = {
    message: constants.responseMessages.SUCCESS,
    status : constants.responseStatus.SUCCESS,
    data   : data || {}
  };
  res.status(constants.responseHttpStatus.SUCCESS).send(JSON.stringify(response));
};

const failure = (res, data) => {
  let response = {
    message: constants.responseMessages.FAILURE,
    status : constants.responseStatus.UNAUTHORIZED,
    data   : data || {}
  };
  res.status(constants.responseHttpStatus.UNAUTHORIZED).send(JSON.stringify(response));
};

const sendResponse = (res, data) => {
  let response = {
    message: data.message,
    status : data.status,
    data   : data.body
  };
  res.status(data.statusCode).send(JSON.stringify(response));
};




exports.parameterMissingResponse  = parameterMissingResponse;
exports.invalidAuthKey            = invalidAuthKey;
exports.internalServerError       = internalServerError;
exports.success                   = success;
exports.failure                   = failure;
exports.sendResponse              = sendResponse;
