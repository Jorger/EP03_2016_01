/*
Tipo de persistencia local:

localStorage

    Tan sólo es necesario enviar el nombre de la persistencia y el tipo...
    let config = {nombre : "nombrePersistencia", tipo   : "localStorage"};

WebSQL.

    Se deberá enviar la estructura que se manejará, para este caso sólo se maneja un sólo esquema (tabla)...
    let config = {
                    nombre : "nombrePersistencia",
                    tipo   : "WebSQL",
                    schema : {
                                nombre    : "nombreTabla",
                                registros : ["nombreRegistro1", "nombreRegistro2", "nombreRegistroN"]
                            }
                };
    Nota: Este tipo de persistencia no está presente en todos los navegadores: http://caniuse.com/#feat=sql-storage
*/
    //Configuración ejemplo persistencia usuarios con localStorage...
    let config = {nombre : "listadoUsuario", tipo   : "localStorage"};
/*
    //Configuración ejemplo persistencia usuarios con WebSQL...
    let config = {
                    nombre : "listadoUsuario",
                    tipo   : "WebSQL",
                    schema : {
                                nombre    : "usuarios",
                                registros : [
                                                "guid",
                                                "identificacion",
                                                "primernombre",
                                                "primerapellido",
                                                "email",
                                                "fechanacimiento"
                                            ]
                            }
                };
*/
module.exports = {config};
