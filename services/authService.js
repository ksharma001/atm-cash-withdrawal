/**
 * Created by ashishprasher on 18/02/20.
 */

const config                        = require('config');

const logging                       = require('./../logging/logging');



const authenticateAtmSecretKey = (apiReference, opts) => {
  logging.log(apiReference, {EVENT : "authenticateAtmSecretKey input", opts});
  const authResponse = { valid : false};
  const auth = config.get("ATM_IDs").find((value, index) => {
    return value == opts.atm_id;
  });
  if(!auth){
    authResponse.error = "invalid atm key";
    logging.logError(apiReference, {ERROR: "authenticateAtmSecretKey error atm key not found", source: "authService"});
    return authResponse;
  } else {
    return {valid : true};
  }
};

const authenticateAccountPassKey = (apiReference, opts) => {
  logging.log(apiReference, {EVENT : "authenticateAccountPassKey input", opts});
  const authResponse = { valid : false};
  const auth = config.get("ACCOUNT_IDs").find((value, index, array) => {
    return value.account_id == opts.account_id;
  });
  if(!auth){
    logging.logError(apiReference, {ERROR: "authenticateAccountPassKey error account not found", source: "authService"});
    authResponse.error = "account not found";
    return authResponse;
  } else {
    if(auth.pass_key !== opts.pass_key){
      logging.logError(apiReference, {ERROR: "authenticateAccountPassKey error invalid passkey", source: "authService"});
      authResponse.error = "invalid pass key";
      return authResponse;
    }
    return {valid : true};
  }
};



exports.authenticateAtmSecretKey    = authenticateAtmSecretKey;
exports.authenticateAccountPassKey  = authenticateAccountPassKey;