/**
 * Created by ashishprasher on 18/02/20.
 */

const constants          = require('./../../../properties/constants');
const logging            = require('./../../../logging/logging');



const getBalance = (apiReference, opts) => {
  let response = { success : false };
  logging.log(apiReference, {"EVENT" : "getBalance DAO", opts});
  const balance = constants.ACCOUNT_BALANCE.find((value, index) => {
    return value.account_id == opts.account_id;
  });

  if(!balance){
    response.error = "not found";
    return response;
  }
  return { success : true, data : balance};
};


const updateBalance = (apiReference, opts) => {
  logging.log(apiReference, {"EVENT" : "updateBalance DAO", opts});
  let response = { success : false};
  let accBalance = getBalance(apiReference, opts);
  if(!accBalance.success){
    return accBalance;
  }
  if(accBalance.data.balance < opts.withdrawalAmt){
    response.error = "insufficient balance";
    return response;
  }

  let updatedBalance = accBalance.data.balance - opts.withdrawalAmt;

  const balanceIndex = constants.ACCOUNT_BALANCE.findIndex((value, index) => {
    return value.account_id == opts.account_id;
  });

  constants.ACCOUNT_BALANCE[balanceIndex] = { account_id : opts.account_id, balance : updatedBalance};
  return { success : true};
};




exports.getBalance            = getBalance;
exports.updateBalance         = updateBalance;