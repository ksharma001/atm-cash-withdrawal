/**
 * Created by ashishprasher on 18/02/20.
 */


const cashWithdrawalValidator     = require('./validators/cashWithdrawalValidator');
const cashWithdrawalController    = require('./controllers/cashWithdrawalController');
const accountPassKeyAuth          = require('./../../middlewares/accountPassKeyAuthentication');
const cashwithdrawalTestCases     = require('./test/cashWithdrawalTestCases');



app.post("/atm/withdrawCash", cashWithdrawalValidator.withdrawCash, accountPassKeyAuth.authenticateAccountPasskey, cashWithdrawalController.withdrawCash);
app.post("/atm/runTestCases", cashwithdrawalTestCases.runTestCasesAPI);