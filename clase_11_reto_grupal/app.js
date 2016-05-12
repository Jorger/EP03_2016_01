"use strict";
let express 	= 	require("express"),
	app			= 	express(),
	puerto 		= 	process.env.PORT || 8081,
	bodyParser 	= 	require('body-parser'),
	mysql   	= 	require('mysql');

//Realizar la conexión a la base de datos Mysql.....
let conexion = mysql.createConnection({
	host     	: 'localhost',
	user     	: 'root',
	password 	: 'root',
	database 	: 'polls',
	multipleStatements : true
});
conexion.connect();
//Para indicar que se envía y recibe información por medio de Json...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Servicios REST, traer todas las encuestas...
app.get('/polls', (req, res) =>
{
	res.json({});
});

//Crear una encuesta...
app.post('/createPoll', (req, res) =>
{
	res.json({});
});

app.put('/updatePoll', (req, res) =>
{
	//Saber si existe la encuesta y además que no tenga votos...
	res.json({});
});

app.put('/votePOll', (req, res) =>
{
	res.json({});
});

app.delete('/deletePoll/:id', (req, res) =>
{
	res.json({});
});

app.get('/showPoll/:id', (req, res) =>
{
	muestraEncuesta(req.param("id"), (err, data) =>
	{
		res.json(data);
	});
});

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res)
{
	res.status(404).send("Página no encontrada :( en el momento");
});

//Para mostrar una encuesta dado el ID de la misma...
let muestraEncuesta = (token, callback) =>
{
	let encuesta = [];
	queryMysql(`select * from preguntas where token = '${token}'`, (err, pregunta) =>
	{
		if (err) throw err;
		if(pregunta.length !== 0)
		{
			encuesta = pregunta[0];
			//Traer las opciones de respuesta...
			queryMysql(`select * from opciones where idpregunta = ${pregunta[0].idpregunta}`, (err, opciones) =>
			{
				if (err) throw err;
				let opcionesRespuesta = [];
				for(let i = 0; i < opciones.length; i++)
				{
					opcionesRespuesta.push(opciones[i]);
				}
				encuesta.opciones = opcionesRespuesta;
				callback(false, encuesta);
			});
		}
		else
		{
			callback(false, encuesta);
		}
	});
};

//Realiza la consulta a la base de datos...
let queryMysql = (sql, callback) =>
{
	conexion.query(sql, (err, rows, fields) =>
	{
		if (err) throw err;
		callback(err, rows);
	});
};

//Genera un token único..
let guid = () =>
{
	let s4 = () =>
	{
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

app.listen(puerto);
console.log(`Express server iniciado en el ${puerto}`);
