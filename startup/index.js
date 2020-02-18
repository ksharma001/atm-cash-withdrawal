/**
 * Created by ashishprasher on 18/02/20.
 */


const apiReferenceModule      = "startup";

const logging                 = require('../logging/logging');
const httpLib                 = require('./../services/httpService');
const envProperties           = require('./../properties/envProperties');
const cashWithdrawalTestCases = require('./../modules/cash-withdrawal/test/cashWithdrawalTestCases');


const initializeServer = async () => {
  let apiReference = {
    module: apiReferenceModule,
    api: "initialize"
  };
  try {
    //initialize all db connections and load cache if required

    const server = await httpLib.startHttpServer(envProperties.port);
    cashWithdrawalTestCases.runTestCases({});  //not passing apiReference, cause we don't need logs on startup

  } catch (error) {
    logging.logError(apiReference, {EVENT: "initializeServer", ERROR: error});
    throw new Error(error);
  }
};

exports.initializeServer  = initializeServer;