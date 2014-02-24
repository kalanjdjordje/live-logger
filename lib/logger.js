/**
 * New node file
 */
var logServer = require('./live-logger');
var Logger = function Logger(config) {

	config.category = config.category || 'default';
	
	var out = config.out || logServer;
	Logger.log = function trace(message) {
		out.append('default','info',message);
	};
	Logger.log = function trace(level,message) {
		this.log('default',level,message);
	};
	Logger.log = function trace(category,level,message) {
		out.append(category,level,message);
	};
	//trace
	Logger.trace = function trace(message) {
		this.log(config.category,'trace',message);
	};
	Logger.trace = function trace(category,message) {
		this.log(category,'trace',message);
	};
	//debug
	Logger.debug = function debug(message) {
		this.log(config.category,'debug',message);
	};
	Logger.debug = function debug(category,message) {
		this.log(category,'debug',message);
	};
	//info
	Logger.info = function info(message) {
		this.log(config.category,'info',message);
	};
	Logger.info = function info(category,message) {
		this.log(category,'info',message);
	};
	//warn
	Logger.warn = function warn(message) {
		this.log(config.category,'warn',message);
	};
	//error
	Logger.error = function error(message) {
		this.log(config.category,'error',message);
	};
	Logger.error = function error(category,message) {
		this.log(category,'error',message);
	};
	//fatal
	Logger.fatal = function fatal(message) {
		this.log(config.category,'fatal',message);
	};
	Logger.fatal = function fatal(category,message) {
		this.log(category,'fatal',message);
	};
	//WTF
	Logger.wtf = function wtf(message) {
		this.log(config.category,'wtf',message);
	};
	Logger.wtf = function wtf(category,message) {
		this.log(category,'wtf',message);
	};

	return Logger;
};

exports.Logger = Logger;