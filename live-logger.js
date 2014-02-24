
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
LiveLogger.prototype
module.exports.startLogger = function(port){

	initPages(null);
	var app = http.createServer(function handler(req, res) {
		console.log(req.url);
		if(req.url=="/logger")
			handleHtml(req,res);
		if(req.url == "/api/log"){
			handleLog(req,res);
		}
	}).listen(port, '127.0.0.1');
	
	io = socketio.listen(app);
	io.sockets.on('connection', function (socket) {
		
		sockets.push(socket);
	  socket.emit('news', { hello: 'world' });
	  socket.on('my other event', function (data) {
	    console.log(data);
	  });
	});

	console.log('Server running at http://127.0.0.1:'+port+'/');	
};

function handleHtml(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(pages.main);  
    res.end();  
}
function handleLog(req,res){
	  sockett.emit('news', { hello: 'world' });

    res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end();
}
function initPages(cb){
	fs.readFile('./pages/main.html', function (err, html) {
		pages.main = html;		
	});
}
//module.export = LiveLogger;
