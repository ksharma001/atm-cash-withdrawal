const Joi                                         = require('joi');

const logging                                     = require('./../logging/logging');
const responses                                   = require('./../responses/responses');
const authentication                              = require('./../middlewares/atmMachineAuthentication');



const validateFields = (apiReference, req, body, res, schema, msg) => {
  logging.log(apiReference, {REQUEST_BODY: body, HEADERS : req.headers});
  let validation = Joi.validate(body, schema);
  if (validation.error) {
    let errorReason =
          validation.error.details !== undefined
            ? (msg ? msg : validation.error.details[0].message)
            : 'Parameter missing or parameter type is wrong';
    logging.log(apiReference, validation.error.details);
    responses.parameterMissingResponse(res, errorReason);

    return false;
  }
  return authentication.authenticateAtmSecretKey(req, res);
};



const defaultJoiObject = () => {
  return Joi.object().keys ({
    account_id : Joi.string().length(4).required(),
    pass_key   : Joi.string().length(4).required(),
  });
};


exports.validateFields                            = validateFields;
exports.defaultJoiObject                          = defaultJoiObject;