/**
 * 
 */

var loggerServer = require('../lib/live-logger');
var logger	= require('../lib/live-logger').Logger({});
loggerServer.startLogger(2200);

logger.log("asd");
logger.trace("asd");
logger.debug("asd");
logger.info("asd");
logger.warn("asd");
logger.error("asd");
logger.fatal("asd");
logger.wtf("asd");