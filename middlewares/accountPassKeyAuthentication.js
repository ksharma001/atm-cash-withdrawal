/**
 * Created by ashishprasher on 18/02/20.
 */

const logging                       = require('./../logging/logging');
const authService                   = require('./../services/authService');
const responses                     = require('./../responses/responses');
const responseConstants             = require('./../responses/responseConstants');


const authenticateAccountPasskey = (req, res, next) => {
  logging.log(req.apiReference, {EVENT : "authenticateAccountPasskey input", reqBody: req.body});
  let authObj = {
    account_id : req.body.account_id,
    pass_key   : req.body.pass_key
  };
  const authResponse = authService.authenticateAccountPassKey(req.apiReference, authObj);
  if(!authResponse.valid){
    const resObj = {
      status     : responseConstants.responseStatus.UNAUTHORIZED,
      statusCode : responseConstants.responseStatus.UNAUTHORIZED,
      message    : authResponse.error
    };
    return responses.sendResponse(res, resObj);
  } else {
    req.balance = authResponse.balance;
    return next();
  }
};

exports.authenticateAccountPasskey  = authenticateAccountPasskey;