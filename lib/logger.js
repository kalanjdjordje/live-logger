/**
 * New node file
 */

var Logger = function Logger(config) {
	
	this.config = config || {};
	
	this.config.category = this.config.category || 'default';
	
	this.out = config.out || console;
	
};
Logger.prototype.log = function trace(message,level,category) {

	category = category || this.config.category;
	level = level || "trace";
	this.out.log({category:category,level:level,message:message});
};
Logger.prototype.trace = function trace(message,category) {
	this.log(message,'trace',category);
};
//debug
Logger.prototype.debug = function debug(message,category) {
	this.log(message,'debug',category);
};
//info
Logger.prototype.info = function info(message,category) {
	this.log(message,'info',category);
};
//warn
Logger.prototype.warn = function warn(message,category) {
	this.log(message,'warn',category);
};
//error
Logger.prototype.error = function error(message,category) {
	this.log(message,'error',category);
};
//fatal
Logger.prototype.fatal = function fatal(message,category) {
	this.log(message,'fatal',category);
};
//WTF
Logger.prototype.wtf = function wtf(message,category) {
	this.log(message,'wtf',category);
};


exports.Logger = Logger;