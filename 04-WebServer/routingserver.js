var http = require('http');
var fs   = require('fs');

http.createServer( function(req, res){ 
	if( req.url === '/'){ //Si la URL es / devolvemos el HTML
		res.writeHead(200, { 'Content-Type':'text/html' })
		var html = fs.readFileSync(__dirname +'/html/index.html');
		res.end(html);
	}
	if(req.url === '/api'){ //Si la URL es /api devolvemos el objeto
		res.writeHead(200, { 'Content-Type':'application/json' })
		var obj = {
			nombre: 'Juan',
			apellido: 'Perez'
		};	
		res.end( JSON.stringify(obj) );
	} 
}).listen(1337, '127.0.0.1');