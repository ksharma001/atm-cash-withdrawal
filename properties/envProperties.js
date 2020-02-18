/**
 * Created by ashishprasher on 18/02/20.
 */

const config                                      = require('config');


exports.isEnv                                     = isEnv;
exports.getEnv                                    = getEnv;
exports.isEnvLive                                 = isEnvLive;

function isEnv(env) {
  return process.env.NODE_ENV == env;
}

function isEnvLive() {
  return isEnv('live');
}

function getEnv() {
  return process.env.NODE_ENV;
}

exports.port =  config.get('PORT');
