/**
 * Created by ashishprasher on 18/02/20.
 */

const logging                       = require('./../../../logging/logging');
const responses                     = require('./../../../responses/responses');
const cashWithdrawalService         = require('./../services/cashWithdrawalService');

const withdrawCash = (req, res) => {
  let apiReference  = req.apiReference;
  try {
    const withdrawalAmt         = req.body.withdrawal_amount;
    const preferredDenomination = req.body.preferred_denomination;
    const accountId             = req.body.account_id;

    const withdrawOpts = {
      preferredDenomination, withdrawalAmt, accountId
    };
    const withdrawalResponse = cashWithdrawalService.withdrawCash(apiReference, withdrawOpts);

    logging.log(apiReference, {serviceResponse : withdrawalResponse});
    if(withdrawalResponse.success){
      return responses.success(res, withdrawalResponse.noteFreq);
    }

    responses.failure(res, withdrawalResponse);
  } catch (error) {
    logging.logError(apiReference, {EVENT: "withdrawCash ERROR", ERROR: error, STACK: error.stack});
    return responses.internalServerError(res);
  }
};


exports.withdrawCash                = withdrawCash;