# Actividad Persistencia Local

Actidad que tiene como fin el aprendizaje de ES6.

Se hace uso de [localStorage] y [WebSQL] para realizar el proceso de persistencia.

**Nota: WebSQL, no está sportado en todo los navegadores: http://caniuse.com/#feat=sql-storage**

# Prerrequisitos

Instalación de NodeJS y de browserify y watchify globalmente.

```
npm install -g browserify
npm install -g watchify
```

Instalación de los paquetes de desarrollo localmente que están ubicados en el archivo package.json (deberá encontrarse en el ditectorio en donde se aloja dicho archivo)

```
npm install
```

Una vez instalada las dependencias, para la ejecución/conversión se deberá ejecutar el comando:

```
npm run watch
```

# Diagrama

En la siguiente imagen, se muestra la forma en que el archivo [build.js] es generado, a través de la combinación de varios módulos.

![Diagrama](https://docs.google.com/drawings/d/1z2291sY6aUNXOIlIMrwrv4XM6-zy0NHKFzqs9qd9fR4/pub?w=480&h=360)

# Tipos de persistencia.

El almacenamiento local se hace a través de localStorage o WebSQL, patra indicar el tipo que se manejará, en el archivo [configPersistencia.js] se deberá establecer:

### Alacenamiento vía localStorage

```javascript
let config = {nombre : "nombrePersistencia", tipo   : "localStorage"};
```

### Alacenamiento vía WebSQL

```javascript
let config = {
                    nombre : "nombrePersistencia",
                    tipo   : "WebSQL",
                    schema : {
                                nombre    : "nombreTabla",
                                registros : ["nombreRegistro1", "nombreRegistro2", "nombreRegistroN"]
                            }
                };
```

Para el caso particular la persistencia sólo hace uso de una tabla.

### Ejemplo

#### LocalStorage

```javascript
let config = {nombre : "myTodo", tipo   : "localStorage"};
```

#### WebSQL

```javascript
let config = {
                    nombre : "myTodo",
                    tipo   : "WebSQL",
                    schema : {
                                nombre    : "todos",
                                registros : [
                                                "guid", 
                                                "nombreTodo", 
                                                "estadoTodo", 
                                                "fechaTodo"
                                            ]
                            }
                };
```
### Autor
Jorge Rubaino

[@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
[localStorage]:https://developer.mozilla.org/en/docs/Web/API/Window/localStorage
[WebSQL]:http://html5doctor.com/introducing-web-sql-databases/
[configPersistencia.js]:https://github.com/Jorger/EP03_2016_01/blob/master/clase_06_ES6/desarrollo/configPersistencia.js
[build.js]:https://github.com/Jorger/EP03_2016_01/blob/master/clase_06_ES6/js/build.js
