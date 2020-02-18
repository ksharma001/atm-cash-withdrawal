/**
 * Created by ashishprasher on 18/02/20.
 */

const http                          = require('http');
const _                             = require('underscore');

const logging                       = require('./../logging/logging');


const startHttpServer = (port) => {
  return new Promise((resolve, reject) => {
    let server = http.createServer(app).listen(port, function () {
      console.error("###################### Express connected ##################", app.get('port'), app.get('env'));
      resolve(server);
    });
  });
};



exports.startHttpServer             = startHttpServer;