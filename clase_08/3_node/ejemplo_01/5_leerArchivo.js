var fs 		= require('fs'), 
	objeto	= [];
fs.readFile('reporte.csv', 'utf8', function (err, data)
{
	if (err) return console.log(err);
	//console.log(data);
	console.log("---------");
	var datosCSV = data.split("\n");
	var encabezado = datosCSV[0].split(",");
	for(var i in encabezado)
	{
		objeto.push({
			"titulo" 	: encabezado[i], 
			"valores"	: []
		});
	}
	//Cargar la información...
	for(var i = 1; i < datosCSV.length; i++)
	{
		var parteDatos = datosCSV[i].split(",");
		for(var c in parteDatos)
		{
			if(parteDatos[c] !== "")
			{
				objeto[c].valores.push(parteDatos[c]);
			}
		}
	}
	//console.log(datosCSV[0]);
	console.log(objeto);
});
console.log("Lee archivo...");