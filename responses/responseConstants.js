/**
 * Created by ashishprasher on 18/02/20.
 */

exports.requestMethods  = {
  POST  : 'POST',
  GET   : 'GET',
  PUT   : 'PUT',
  PATCH : 'PATCH',
  DELETE: 'DELETE'
};

exports.responseHttpStatus = {
  BAD_REQUEST              : 400,
  UNAUTHORIZED             : 401,
  SUCCESS                  : 200,
  INTERNAL_SERVER_ERROR    : 500
};

exports.responseStatus = {
  BAD_REQUEST                 : 400,
  UNAUTHORIZED                : 401,
  SUCCESS                     : 200,
  INTERNAL_SERVER_ERROR       : 500,
};

exports.responseMessages = {
  SUCCESS                     : "success",
  FAILURE                     : "failure",
  PARAMETER_MISSING           : "Insufficient information was supplied. Please check and try again.",
  INVALID_AUTH_KEY            : "Invalid secret",
  INTERNAL_SERVER_ERROR       : "Some error occurred.",
};