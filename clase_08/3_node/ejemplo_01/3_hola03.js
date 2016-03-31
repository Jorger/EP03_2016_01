var http = require('http');
var puerto = 8081;
var nombre = process.argv[2];

http.createServer(function (request, response)
{
	//response.writeHead(200, {'Content-Type': 'text/plain'});
	response.writeHead(200, {'Content-Type': 'text/html'});
	var txt = "<center><b><h1>Hola " + nombre +"</h1></b></center>";
    response.end(txt);
}).listen(puerto);
console.log('Servidor a través del puerto: ' + puerto);
