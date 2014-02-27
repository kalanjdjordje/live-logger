
var LiveLogger = function(settings){
	this.settings = settings;
};
var Logger = require('./logger').Logger;
var LogServer = require('./log-server').LogServer;

var logServer = null;


module.exports.Logger = function(options){
	options = options || {};
	options.out = options.out || logServer;
	return new Logger(options);
};

module.exports.LogServer = function(options){
	if(logServer == null)
		logServer = new LogServer(options);
	return logServer;
};
module.exports.append = function(category,level,message){
	emitOnSocket( new Date(),category,level,message);
};
module.exports.startLogger = function(){

	
	
};





//module.export = LiveLogger;
