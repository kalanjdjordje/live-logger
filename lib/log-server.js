/**
 * New node file
 */
var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');




var LogServer = function(options) {

	var _this = this;
	this.pages = {};
	this.options = options || {};
	this.options.logger_path = this.options.logger_path || "/logger";
	this.options.log_path = this.options.log_path || "/api/log";
	
	this.options.port = this.options.port || 23182;
	this.sockets=[];
	this.server = null;
	this.io;

	
	
	this.log = function(log){
		this.emitOnSocket(new Date(), log.category, log.level, log.message);
	};

	this.listen = function(){		
		this.initPages(null);
		var app = http.createServer(function handler(req, res) {
			console.log(req.url);
			if(req.url=="/logger")
				_this.handleFile('text/html',_this.pages.main,req,res);
			if(req.url=="/app.js")
				_this.handleFile('application/javascript',_this.pages.app_js,req,res);
			if(req.url == "/api/log"){
				_this.handleLog(req,res);
			}
			else{
				res.end();
			}
		}).listen(this.options.port, '127.0.0.1');
		
		this.io = socketio.listen(app);
		
		this.io.sockets.on('connection', function (socket) {
			console.log('new socket');
			_this.sockets.push(socket);	 
		});
		this.io.sockets.on('disconnect', function (socket) {
			console.log('disconnect socket');
			console.log(socket);
		});

		console.log('Live loger running at http://127.0.0.1:'+this.options.port+'/');	
	};

	
	this.handleLogParseBody = function(req,res){
		
		if(req.body !=''){
			var body = req.body;
			if(typeof req.body =="string")
				body = JSON.parse(req.body);
			
			_this.emitOnSocket( new Date(),body.category,body.level,body.message);
		    res.writeHead(200, {'Content-Type': 'text/plain'});			
		}else{
		    res.writeHead(500, {'Content-Type': 'text/plain'});			
		}				
		res.end();

	};

	this.handleLog = function(req,res){
		if(req.body == undefined){		
			_this.parseBody(req,res,_this.handleLogParseBody);	
		}
		else _this.handleLogParseBody(req,res);
		
		
	};
	
	this.emitOnSocket = function(time,category,level,message){
		
		for(var i=0; i < this.sockets.length;i++){
			this.sockets[i].emit("log",{time:time,category:category,level:level,message:message});
		}
	};

	this.handleFile = function(type,file,req,res){
	    res.writeHead(200, {'Content-Type': type});
	    res.write(file);  
	    res.end();  
	};
	
	this.parseBody = function(req,res,next){
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
		
	};
	this.initPages = function(cb){
		var self = this;
		fs.readFile(__dirname+'/public/main.html', function (err, html) {
			self.pages.main = html;		
		});
		fs.readFile(__dirname+'/public/app.js', function (err, js) {
			self.pages.app_js = js;		
		});

	}
	
};







module.exports.LogServer = LogServer;