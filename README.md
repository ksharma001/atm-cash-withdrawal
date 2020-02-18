Assumptions:
- ATM has infinite amount of currency notes
- only ATM machines having ATM_IDs stored in our system can access (picked from config)
- account number and pass key are of 4 digits only (no encryption is being used), picked from config as well
- initial account balance is stored in constants file
- preferred denomination can never be more than withdrawal amount




Unit Testing:
- Have not used any external tool/module for unit test cases
- static checks are handled by Joi itself and I have not added unit test cases for that
- unit test cases are written in [cashWithdrawalTestCases] file
- Test cases cover atm machine auth, pass key auth & account balance test cases
- Test cases run on server startup and are also accessible via API (curls shared below)




Code flow:
- Main file is app.js
- app.js loads the middlewares, api modules and then starts the server

API flow:
- static validations are handled by Joi and some other static validations are written in validator file
- atmId auth check and account pass key auths are handled in middlewares
- controller calls the relevant service to get the job done
- dao layer fetches/saves the data from/to secondary storage

Server startup:
- code is written, compiled and tested on nodev12.
- run npm i command and then start PM2 process using the following command
NODE_ENV=production pm2 start app.js --name atm && pm2 logs atm



Curls:
curl -X POST http://localhost:3015/atm/withdrawCash -H 'atm_id: Atm-1' -H 'content-type: application/json'  -d '{ "account_id" : "1001", "pass_key" : "1234", "withdrawal_amount" : 900, "preferred_denomination" : 200}'

curl -X POST http://localhost:3015/atm/runTestCases -H 'atm_id: Atm-1' -H 'content-type: application/json'
