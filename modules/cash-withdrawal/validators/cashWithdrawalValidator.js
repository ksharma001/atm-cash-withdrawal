/**
 * Created by ashishprasher on 18/02/20.
 */

const apiReferenceModule                  = "atm";

const Joi                                 = require('Joi');

const responseConstants                   = require('./../../../responses/responseConstants');
const responses                           = require('./../../../responses/responses');
const validator                           = require('./../../../validators/joiValidator');
const cashWithdrawalConstants             = require('./../properties/cashWithdrawalConstants');

const withdrawCash = (req, res, next) => {
  req.apiReference = {
    module: apiReferenceModule,
    api   : "withdrawCash"
  };
  let schema =  validator.defaultJoiObject().keys({
    withdrawal_amount      : Joi.number().required().min(10).max(20000),
    preferred_denomination : Joi.number().valid(cashWithdrawalConstants.CURRENCY_NOTES_VALUES).optional()
  });

  let reqBody = { ...req.body };
  let request = { ...req };
  let validFields = validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if(validFields){
    let amountValidations = amountChecksForWithdrawCash(req.apiReference, reqBody);
    if(!amountValidations.valid){
      return responses.sendResponse(res, amountValidations.error);
    }
    next();
  }
};

const amountChecksForWithdrawCash = (apiReference, opts) => {
  let withDrawalAmountValidation = withdrawalAmountCheck(apiReference, opts);
  if(!withDrawalAmountValidation.valid){
    return withDrawalAmountValidation;
  }
  let preferredDenominationValidation = preferredDenominationCheck(apiReference, opts);
  if(!preferredDenominationValidation.valid){
    return preferredDenominationValidation;
  }

  return { valid : true };
};

const withdrawalAmountCheck = (apiReference, opts) => {
  const response = { valid : false };
  if(opts.withdrawal_amount % 10 !== 0) {
    response.error = {
      statusCode : responseConstants.responseStatus.BAD_REQUEST,
      status     : responseConstants.responseStatus.BAD_REQUEST,
      message    : "invalid amount entered"
    };
    return response;
  }

  response.valid = true;
  return response;
};

const preferredDenominationCheck = (apiReference, opts) => {
  const response = { valid : false };
  if(opts.preferred_denomination !== undefined && opts.preferred_denomination > opts.withdrawal_amount) {
    response.error = {
      statusCode : responseConstants.responseStatus.BAD_REQUEST,
      status     : responseConstants.responseStatus.BAD_REQUEST,
      message    : "invalid preferred_denomination entered"
    };
    return response;
  }

  response.valid = true;
  return response;
};


exports.withdrawCash = withdrawCash;