# Reto Grupal, servicios REST/Base de datos (MySQL)

Se entrega base del código en el cual se deberá completar algunos requerimientos.


### Creación estructura de Base de datos.

Se deberá crear la estructura de base de datos, necesaria para una encuesta, se debe tener en cuenta que en las preguntas se recomenda guadar un token, para lo cual se entrega la función que generá dicho valor:

```javascript
let guid = () =>
{
	let s4 = () =>
	{
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
```

### Servicio listar encuestas.

Creación de servicio que liste todas las encuestas que existen, se entrega la función que muestra una sola encuesta.

```javascript
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
```

### Eliminar una encuesta.

Servicio el cual dado el id/token de la encuesta lo elimine, se recomienda que el eliminado sea lógico.


### Autor
Jorge Rubaino

[@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
