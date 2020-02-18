/**
 * Created by ashishprasher on 18/02/20.
 */


const cashWithdrawalConstants       = require('./../properties/cashWithdrawalConstants');
const logging                       = require('./../../../logging/logging');
const cashWithdrawalDao             = require('./../dao/cashWithdrawalDao');




exports.withdrawCash = (apiReference, opts) => {
  logging.log(apiReference, {EVENT : "withdrawCash service", opts});
  const response = { success : false };
  const accountBalance = cashWithdrawalDao.getBalance(apiReference, {account_id : opts.accountId});
  let withdrawalAmtCopy = opts.withdrawalAmt;
  logging.log(apiReference, {EVENT : "withdrawCash accountBalance", accountBalance});
  if(!accountBalance.success || (accountBalance.success && accountBalance.data.balance < opts.withdrawalAmt)){
    response.error = "insufficient balance";
    return response;
  }
  let noteFreq = {};
  cashWithdrawalConstants.CURRENCY_NOTES_VALUES.map(( note) => {
    if(opts.preferredDenomination === undefined || (opts.preferredDenomination !== undefined && opts.preferredDenomination >= note)) {
      let notesRequired = parseInt(withdrawalAmtCopy / note);
      if(notesRequired){
        withdrawalAmtCopy -= notesRequired * note;
        noteFreq[note]     = notesRequired;
      }
    }
  });

  if(withdrawalAmtCopy != 0){
    response.error = "something went wrong";
    return response;
  }
  const daoResponse   = cashWithdrawalDao.updateBalance(apiReference, { account_id : opts.accountId, withdrawalAmt : opts.withdrawalAmt});
  logging.log(apiReference, {EVENT : "updateBalance daoResponse", daoResponse});
  if(!daoResponse.success){
    response.error = daoResponse.error;
    return response;
  }
  response.success    = true;
  response.noteFreq   = noteFreq;
  return response;
};