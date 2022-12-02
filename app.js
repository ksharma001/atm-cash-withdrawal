/**
 * Created by ashishprasher on 18/02/20.
 */

let app                           = require('express')();
global.app                        = app;

require('./middlewares');
require('./modules');
require('./startup').initializeServer();
//asdad
