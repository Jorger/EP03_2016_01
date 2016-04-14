var express = 	require("express"),
	app		= 	express(),
	cons 	=	require("consolidate"),
	puerto 	= 	process.env.PORT || 3000;

//consolidate integra swig con express...
app.engine("html", cons.swig); //Template engine...
app.set("view engine", "html");
app.set("views", __dirname + "/vistas");
app.use(express.static('public'));

//Para mostrar datos en la vista...
var array = ["uno", "dos", "tres", "cuatro", "Cinco", "SEIS"];
//Para enviar los datos de un objeto a una vista...
var objeto = [
				{
					nombre 		: 	"Jorge",
					apellido	: 	"Rubiano",
					email		: 	"correo@correo.com",
					activo		: 	true
				},
				{
					nombre 		: 	"María",
					apellido	: 	"Pérez",
					email		: 	"maria@correo.com",
					activo		: 	true
				},
				{
					nombre 		: 	"Pedro",
					apellido	: 	"García",
					email		: 	"pedro@correo.com",
					activo		: 	true
				}];

app.get("/", function(req, res)
{
	//Nombre de la página a renderizar...
	res.render("index", {
		nombre 	:  	"MUNDO",
		ubica 	: 	"Colombia",
		array 	: 	array,
		objeto	: 	objeto,
		imagen	: 	"img/express.jpg"
	});
});

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res){
	res.status(404).send("Página no encontrada :( en el momento");
});

app.listen(puerto);
console.log("Express server iniciado en el " + puerto);
