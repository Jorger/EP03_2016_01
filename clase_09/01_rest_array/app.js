var express = 	require("express"),
	app		= 	express()
	puerto 	= 	process.env.PORT || 8081,
	bodyParser 	= require('body-parser');

//Para indicar que se envía y recibe información por medio de Json...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var listaTareas = [
					{
						id 		: 	1,
						task	:	"Salir a correr",
						date	: 	"15/06/2015",
						finish	: 	true
					},
					{
						id 		: 	2,
						task	:	"Entregar trabajo EP03",
						date	: 	"22/10/2015",
						finish	: 	false
					},
					{
						id 		: 	3,
						task	:	"Finalización del segundo corte",
						date	: 	"30/10/2015",
						finish	: 	false
					}];

//Servicios REST...
app.get('/getAllTask', function(req, res)
{
	res.json(listaTareas);
});

app.post('/createTask', function (req, res)
{
	res.json(crearEditarTarea(req.body, 1));
});

app.put('/updateTask', function (req, res)
{
	res.json(crearEditarTarea(req.body, 2));
});

app.delete('/deleteTask/:id', function(req, res)
{
	var ind = buscarIDTarea(req.param("id"));
	console.log("Valor es:", ind, req.param("id"));
	if(ind >= 0)
	{
		listaTareas.splice(ind, 1);
	}
	res.json({status : ind >= 0 ? true : false});
});

app.get('/getTask/:id', function(req, res)
{
	var ind = buscarIDTarea(req.param("id"));
	var devuelve = {datos : ind >= 0 ? listaTareas[ind] : "", status : ind >= 0 ? true : false};
	res.json(devuelve);
});

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res)
{
	res.status(404).send("Página no encontrada :( en el momento");
});

//Crear o edita un usuario...
var crearEditarTarea = function(data, tipo)
{
	var indice = 0;
	var date = new Date();
	var fechaActual = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
	//se esta creando una nueva tarea...
	if(tipo === 1)
	{
		listaTareas.push(data);
		indice = listaTareas.length - 1;
		listaTareas[indice].id = listaTareas.length;
		listaTareas[indice].date = fechaActual;
	}
	else
	{
		//Se está editando una tarea...
		indice = buscarIDTarea(data.id); //La posción en el array...
		if(indice >= 0)
		{
			listaTareas[indice][data.field] = data[data.field];
		}
	}
	return listaTareas[indice];
}
//Busca la posición del usuario en el array...
var buscarIDTarea = function(id)
{
	var ind = -1;
	for(var i = 0; i < listaTareas.length; i++)
	{
		if(Number(listaTareas[i].id) === Number(id))
		{
			ind = i;
			break;
		}
	}
	return ind;
};

app.listen(puerto);
console.log("Express server iniciado en el " + puerto);
