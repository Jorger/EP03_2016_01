var express = require("express"),
	app		= express(),
	puerto  = process.env.PORT || 3000;

app.get("/", function(req, res)
{
	//Para el request...
	res.send("Hola Mundo UDEC");
});

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res){
	//Para el request...
	res.status(404).send("Página no encontrada :( en el momento");
});

app.listen(puerto);
console.log("Express server iniciado en el "+puerto);
