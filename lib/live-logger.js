
var http = require('http');
var server = null;
var socketio = require('socket.io');
var io;
var fs = require('fs');
var LiveLogger = function(settings){
	this.settings = settings;
};
var sockets=[];
var pages = {};

var Logger = require('./logger').Logger;

module.exports.Logger = function(options){
	return new Logger(options);
}
module.exports.append = function(category,level,message){
	
};
module.exports.startLogger = function(port){

	initPages(null);
	var app = http.createServer(function handler(req, res) {
		console.log(req.url);
		if(req.url=="/logger")
			handleFile('text/html',pages.main,req,res);
		if(req.url=="/app.js")
			handleFile('application/javascript',pages.app_js,req,res);
		if(req.url == "/api/log"){
			handleLog(req,res);
		}
		else{
			res.end();
		}
	}).listen(port, '127.0.0.1');
	
	io = socketio.listen(app);
	
	io.sockets.on('connection', function (socket) {
		console.log('new socket');
		sockets.push(socket);	 
	});

	console.log('Server running at http://127.0.0.1:'+port+'/');	
};
function emitOnSocket(time,category,level,message){
	
	for(var i=0; i< sockets.length;i++){
		sockets[i].emit("log",{time:time,category:category,level:level,message:message});
	}
}
function parseBody(req,res,next){
	if (req.method == 'POST') {
	    req.on('data', function(chunk) {
	    	if(req.body == undefined)
	    		req.body = "";
	     req.body += chunk;
	    });
	    
	    req.on('end', function() {
			  next(req,res);	     
	    });
	    
	  } else {
		  req.body='';
		  next(req,res);
	  }
	
}
function handleFile(type,file,req,res){
    res.writeHead(200, {'Content-Type': type});
    res.write(file);  
    res.end();  
}
function handleLog(req,res){
	parseBody(req,res,function(nreq,nres){
		if(nreq.body !=''){
			var body = JSON.parse(nreq.body);
			emitOnSocket( new Date(),body.category,body.level,body.message);
		    res.writeHead(200, {'Content-Type': 'text/plain'});			
		}else{
		    res.writeHead(500, {'Content-Type': 'text/plain'});			
		}
		
		
		res.end();
		
	});
}
function initPages(cb){
	fs.readFile(__dirname+'/public/main.html', function (err, html) {
		pages.main = html;		
	});
	fs.readFile(__dirname+'/public/app.js', function (err, js) {
		pages.app_js = js;		
	});

}
//module.export = LiveLogger;
