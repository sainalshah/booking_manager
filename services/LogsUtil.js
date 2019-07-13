function getLogger( context ){
  const log4js = require('log4js');
  const conf = require('./config/log4js');
  log4js.configure(conf);
  const logger = log4js.getLogger(context);
  return logger;
}
module.exports = {getLogger: getLogger};
