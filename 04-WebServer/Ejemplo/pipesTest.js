var http = require('http');
var fs = require('fs');

var serverStream = http.createServer( function(req, res){
	fs.readFile('./index.html', function(err, data){
		res.writeHead(200, { 'Content-Type':'text/html' });
    	res.end(data);
	});
});

var serverBuffer = http.createServer( function(req, res){
	var read = fs.createReadStream('./index.html');
	res.writeHead(200, { 'Content-Type':'text/html' });
	read.pipe(res);
});


serverBuffer.listen(2000);
serverStream.listen(3000);