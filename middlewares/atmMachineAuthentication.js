/**
 * Created by ashishprasher on 18/02/20.
 */

const logging                       = require('./../logging/logging');
const authService                   = require('./../services/authService');
const responses                     = require('./../responses/responses');
const responseConstants             = require('./../responses/responseConstants');


const authenticateAtmSecretKey = (req, res) => {
  logging.log(req.apiReference, {EVENT : "authenticateAtmSecretKey input", headers: req.headers});
  const authResponse = authService.authenticateAtmSecretKey(req.apiReference, {atm_id : req.headers.atm_id});
  if(!authResponse.valid){
    const resObj = {
      status     : responseConstants.responseStatus.UNAUTHORIZED,
      statusCode : responseConstants.responseStatus.UNAUTHORIZED,
      message    : authResponse.error
    };
    responses.sendResponse(res, resObj);
    return false;
  } else {
    return true;
  }
};

exports.authenticateAtmSecretKey    = authenticateAtmSecretKey;