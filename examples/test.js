/**
 * 
 */
var express = require('express')
  , http = require('http')
  , path = require('path');


var app = express();

app.set('port', process.env.PORT || 3000);



var loggServer =  require('../lib/live-logger').LogServer();

//var logger = require('../lib/live-logger');


app.post("/logger/log",loggServer.handleLog);


loggServer.listen(app);


var logger	= require('../lib/live-logger').Logger();
logger.warn("asd");
//loggerServer.startLogger(2200);
/*setInterval(function(){
	
	logger.warn("asd2");
	logger.error("asd222");
	logger.fatal("asd22222");
	logger.wtf("asd22222 dasdsff dsfsdfsdfdsfgdsfgdfgdf");
	logger.wtf("asd22222 dasdsff dsfsdfsdfdsfgdsfgdfgdf","transactionId:1686513256432");
}, 500);
*/
http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
});