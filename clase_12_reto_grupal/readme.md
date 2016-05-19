# Reto Grupal, Autenticación(PassportJS) / Vistas JADE

Se entrega base del código en el cual se deberá completar algunos requerimientos.

# Instalación.

Se entrega la estructura de la base de datos, la cual se ha llamado **comentarios**, es posible cambiar la configuración de la base de datos en el archivo [database.js]

Para descarga de las sentencias se deberá ejecutar el comando 

```
npm install
```

# Crear usuario.

Se entrega la estructura de base de datos de usuarios, se espera que se cree la sentencia SQL para guardar un nuevo usuario.

Es necesario validar que un usuario no exista, los datos únicos por usuario son:

* Nombre de usuario
* E-mail

Por lo que antes de crear el usuario se deberá hacer dicha validación.

### Validar autenticación

Para el ejercicio se está haciendo uso de de [PassportJS], para lo cual se ha creado una estrategía local, se deberá crear la sentencia SQL, pata indicar si un usuario existe, en este caso haciendo la búsqueda por el nombre de usuario, la consulta deberá devolver la contraseña que se encuentra cifrada y ser comparada con el método ```compareSync()``` dle módulo [bcrypt-nodejs]

Ejemplo.

```javascript
bcrypt.compareSync("PASSWORD_COMPARA", "PASSWORD_ALMACENADO");
```

## Trabajo Final

El ejercicio es la base del trabajo final

![FINAL](https://dl.dropboxusercontent.com/u/181689/TrabajoFinal.png)


Se busca que el usuario pueda comentar un vídeo, el cual puede ser un embebido de Youtube, para lo cual deberá crear la estructura de datos.

Sólo un usuario autenticado podrá hacer un comentario.

Se espara la creación de los servicios:

* Listar todos los comentarios.
* Crear un nuevo comentario.


### Opcional

Crear la estructura de base de datos para guardar varios vídeos y que el usuario al seleccionar un vídeo, se listen los comentarios asociados a éste.

Servicios:
* Crear un nuevo vídeo.
* Listar todos los vídeos.


### Autor
Jorge Rubaino

[@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
[PassportJS]:http://passportjs.org/
[database.js]:https://github.com/Jorger/EP03_2016_01/blob/master/clase_12_reto_grupal/modulos/database.js
[bcrypt-nodejs]:https://www.npmjs.com/package/bcrypt-nodejs
