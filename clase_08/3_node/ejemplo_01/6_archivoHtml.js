var http 	= require('http'),
	fs 		= require('fs'), 
	puerto	= 8081, 
	archivo = process.argv[2] || "reporte.csv";

http.createServer(function (request, response)
{
    if(request.url !== '/favicon.ico')
    {
	    console.log("-------------------------");
	    console.log("Página cargada...");
	    leeArchivoCsv(archivo, function(err, tabla)
	    {
	    	console.log("Muestra la tabla en la Página");
	    	response.writeHead(200, {'Content-Type': 'text/html'});	    
	    	response.write(tabla);
	    	response.end();
	    });
	}
}).listen(puerto);

var leeArchivoCsv = function(archivo, callback)
{	
	fs.readFile(archivo, 'utf8', function (err, data)
	{
		if (err) return err;
		var datosCSV = data.split("\n");
		var tabla = "<table border = '1'>";
		for(var i in datosCSV)
		{
			if(datosCSV[i] !== "")
			{
				var parteDatos = datosCSV[i].split(",");
				tabla += "<tr>";
				for(var c  in parteDatos)
				{
					tabla += "<td>"+(parteDatos[c])+"</td>";
				}
				tabla += "<tr>";
			}
		}
		tabla += "<table>";
		console.log("Termina de leer y generar la tabla");
		callback(null, tabla);
	});
	console.log("Lee archivo..");
};
console.log("Servidor arriba a través del puerto: " + puerto);