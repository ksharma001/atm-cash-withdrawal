/**
 * Created by ashishprasher on 18/02/20.
 */

const _                                 = require('underscore');

const cashWithdrawalValidator           = require('./../validators/cashWithdrawalValidator');
const cashWithdrawalService             = require('./../services/cashWithdrawalService');
const constants                         = require('./../../../properties/constants');
const authService                       = require('./../../../services/authService');






exports.runTestCasesAPI = (req, res) => {
  res.send("OK");

  const apiReference  = {module : "test", api : "test1"}; //make api test1 for logging
  module.exports.runTestCases(apiReference);
};

exports.runTestCases = (apiReference) => {
  runAtmIdAuthTestCases(apiReference);
  runAccountPassAuthTestCases(apiReference);
  runAccountBalanceTestCases(apiReference);
};


const runAccountBalanceTestCases = (apiReference) => {

  console.log("****************runAccountBalanceTestCases**********************");
  //TEST CASE 1 : without preferred denomination

  const opts1 = { withdrawalAmt : 900, accountId: "1001" };
  const response1    = cashWithdrawalService.withdrawCash(apiReference, opts1);
  const expectedResponse1 = { success: true, noteFreq: { '200': 2, '500': 1 } };

  logTestCaseResult("without preferred denomination", expectedResponse1, response1);

  //TEST CASE 2 : with preferred denomination
  const opts2 = { preferredDenomination : 200, withdrawalAmt : 900, accountId: "1001" };
  const response2    = cashWithdrawalService.withdrawCash(apiReference, opts2);
  const expectedResponse2 = { success: true, noteFreq: { '200': 4, '100': 1 } };
  logTestCaseResult("with preferred denomination", expectedResponse2, response2);

  //TEST CASE 3 : insufficient fund error
  const opts3 = { withdrawalAmt : 170000, accountId: "1001" };
  const response3    = cashWithdrawalService.withdrawCash(apiReference, opts3);
  const expectedResponse3 = { success: false, error: 'insufficient balance' };
  logTestCaseResult("insufficient fund error", expectedResponse3, response3);
};


const runAtmIdAuthTestCases = (apiReference) => {
  console.log("****************runAtmIdAuthTestCases**********************");
  //Test Case 1: invalid atmID

  const opts1 = {atm_id : "aa"};
  const response1 = authService.authenticateAtmSecretKey(apiReference, opts1);
  const expectedResponse1 = { valid: false, error: 'invalid atm key' };
  logTestCaseResult("invalid atmID", expectedResponse1, response1);

  //Test Case 1: valid atmID
  const opts2 = {atm_id : "Atm-1"};

  const response2 = authService.authenticateAtmSecretKey(apiReference, opts2);
  const expectedResponse2 = { valid: true };
  logTestCaseResult("valid atmID", expectedResponse2, response2);
};


const runAccountPassAuthTestCases = (apiReference) => {
  console.log("****************runAccountPassAuthTestCases**********************");
  //Test Case 1: invalid account_id

  const opts1 = {account_id : "10011", pass_key : "1111"};
  const response1 = authService.authenticateAccountPassKey(apiReference, opts1);
  const expectedResponse1 = { valid: false, error: 'account not found' };
  logTestCaseResult("invalid account_id key ", expectedResponse1, response1);

  //Test Case 2: invalid pass key

  const opts2 = {account_id : "1001", pass_key : "12341"};
  const response2 = authService.authenticateAccountPassKey(apiReference, opts2);
  const expectedResponse2 = { valid: false, error: 'invalid pass key' };
  logTestCaseResult("invalid pass key ", expectedResponse2, response2);


  //Test Case 3: valid case

  const opts3 = {account_id : "1001", pass_key : "1234"};
  const response3 = authService.authenticateAccountPassKey(apiReference, opts3);
  const expectedResponse3 = { valid: true };
  logTestCaseResult("valid case: ", expectedResponse3, response3);
};


const logTestCaseResult = (name, expectedResponse, response) => {
  const result = _.isEqual(expectedResponse, response);
  if(result){
    console.log("*********************", name, " : ",  result, "*********************");
  } else {
    console.error(expectedResponse, response);
    console.error("********************* ", name,  " : ", result, "*********************");
    return false;
  }
};