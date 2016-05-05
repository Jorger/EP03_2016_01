# Reto Grupal, servicios REST encuestas haciendo uso de Arrays

Se entrega base del código en el cual se deberá completar algunos requerimientos.


### URL's del consumo


| Método   |      Acción      |  URL |
|----------|:-------------:|------:|
| GET      |  Listar todas las encuestas | /polls |
| POST     |  Crear una encuesta         | /createPoll |
| PUT      | Actualizar una encuesta     | /updatePoll |
| DELETE   | Eliminar una encuesta     | /deletePoll/id |
| PUT      | Responder a una encuesta     | /votePOll |

### Crear una encuesta.

Se envía un JSON de la siguiente forma.

```json
{
	"pregunta"    : "Preugnta que se plantea",
	"titulo"      : "Nombre de la encuesta",
	"opciones"    : [
					    {
						    "texto" : "Opción uno",
						    "cantidad" : 0
					    },
					    {
						    "texto" : "Opción dos",
						    "cantidad" : 0
					    }
				    ]
}
```

### Actualizar una encuesta.

```json
{
	"id"          : 1,
	"pregunta"    : "Preugnta que se plantea",
	"titulo"      : "Nombre de la encuesta",
	"opciones"    : [
					    {
						    "texto" : "Opción uno",
						    "cantidad" : 0
					    },
					    {
						    "texto" : "Opción dos",
						    "cantidad" : 0
					    }
				    ]
}
```

### Responder a una encuesta.

```json
{
	"id"			: 1,
	"opcion"  : 1
}
```

Siendo ```id``` el id de la encuesta y ```opcion``` la respuesta seleccionada.


### Autor
Jorge Rubaino

[@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
