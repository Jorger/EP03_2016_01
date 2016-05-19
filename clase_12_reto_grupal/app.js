"use strict";
var express 		= 	require("express"),
	app				= 	express(),
	cons 			=	require("consolidate"),
	puerto 			= 	process.env.PORT || 3000,
	bodyParser 		= 	require('body-parser'),
	passport 		= 	require('passport'),
	LocalStrategy 	= 	require('passport-local').Strategy,
	cookieParser 	= 	require('cookie-parser'),
	session 		= 	require('express-session'),
	bcrypt 			= 	require('bcrypt-nodejs'),
	db   			= 	require('./modulos/database'),
	rutas			=	require('./modulos/rutas');
	//Realizar la conexión a la base de datos Mysql.....
	db.conectaDatabase();
	//Para el manejo de autenticación...
	passport.use(new LocalStrategy(function(username, password, done)
	{
		//CREAR SENTENCIA SQL QUE DADO EL NOMBRE DE USUARIO
		//VALIDE SI EXISTE O NO...
		var sql = ""; //VARIABLE QUE GUARDARÁ LA SENTENCIA SQL...
		db.queryMysql(sql, function(err, response)
		{
			//UTILIZANDO LA FUNCIÓN compareSync DEL MÓUDLO bcrypt,
			//COMPARE QUE LA CONTRASEÑA ENVIADA ES IGUAL A LA ENCRIPTADA...
			/*
			Ejemplo:
			bcrypt.compareSync(password, response[0].clave)
			SIENDO:
				password la clave enviada desde la vista
				response[0].clave la clave (encriptada) en la base de datos.
			LA FUNCIÓN DEVOLVERÁ true, si las claves coinciden y false en caso contrario..
			*/
			//AÑADIR EN EL IF LA CONDICIONAL QUE INDIQUE SI LAS CLAVES COINCIDEN...
			if (err || response.length === 0)
			{
				return done(null, false, {message: 'Usuario o contraseña no válido', usuario : username});
			}
			return done(null, response);
		});
	}));

	passport.serializeUser(function(user, done)
	{
	    done(null, user[0].usuario);
	});

	passport.deserializeUser(function(username, done)
	{
		//CREAR SENTENCIA SQL QUE DADO EL NOMBRE USUARIO (QUE ES ÚNICO)
		//DEVUELVA EL NOMBRE COMPLETO DEL USAURIO Y EL ID DEL MISMO...
		var sql = "";//VARIABLE QUE GUARDARÁ LA SENTENCIA SQL...
		db.queryMysql(sql, function(err, response)
		{
			if(response)
			{
				done(null, response);
			}
		});
	});

	//consolidate integra swig con express...
	app.engine("html", cons.swig); //Template engine...
	app.set("view engine", "jade");
	app.set("views", __dirname + "/vistas");
	app.use(express.static('public'));
	//Para indicar que se envía y recibe información por medio de Json...
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	//Para el manejo de las Cookies...
	app.use(cookieParser());
	app.use(session({
						secret: '$2a$10$GsvafBLCODG.gUNlB987fORJjTiwjiKs42MjAIqTMB3lour44n39K',
						cookie: { maxAge: 60000 },
						resave: true,
						saveUninitialized: true
					}));
	app.use(passport.initialize());
	app.use(passport.session());

	//Rutas/Servicios REST
	app.get("/", rutas.index);
	//Mostrar la página de autenticación...
	app.get("/login", rutas.login);
	//Para realizar el proceso de autenticación...
	app.post('/login', rutas.loginPost);
	//Para cerrar la sesión..
	app.get("/logout", rutas.logout);
	//Para mostrar la vista de registro..
	app.get("/registro", rutas.registro);
	//Para guardar el usuario...
	app.post("/registro", rutas.registroPost);
	//Para cualquier url que no cumpla la condición...
	app.get("*", rutas.notFound404);

	//Iniciar el Servidor...
	var server = app.listen(puerto, function(err) {
	   if(err) throw err;
	   var message = 'Servidor corriendo en @ http://localhost:' + server.address().port;
	   console.log(message);
	});
