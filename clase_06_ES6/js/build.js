(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Persona = function () {
    function Persona(data) {
        _classCallCheck(this, Persona);

        this.guid = data.guid;
        this.identificacion = data.identificacion;
        this.primernombre = data.primernombre;
        this.primerapellido = data.primerapellido;
        this.email = data.email;
        this.fechanacimiento = data.fechanacimiento;
    }

    _createClass(Persona, [{
        key: "calculaEdad",
        value: function calculaEdad() {
            var fecha_actual = new Date();
            var parteFn = this.fechanacimiento.split("-");
            var fechaCompara = new Date(parteFn[0], parteFn[1], parteFn[2]); //año, mes día
            return Math.floor((fecha_actual - fechaCompara) / 1000 / 3600 / 24 / 365);
        }
    }, {
        key: "getPersona",
        value: function getPersona() {
            return [this.guid, this.identificacion, this.primernombre + " " + this.primerapellido, this.email, this.fechanacimiento, this.calculaEdad()];
        }
    }]);

    return Persona;
}();

module.exports = { Persona: Persona };

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _persistencia = require("./persistencia");

var _persistencia2 = _interopRequireDefault(_persistencia);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Personas = function () {
    function Personas() {
        _classCallCheck(this, Personas);

        this.listado = [];
    }

    _createClass(Personas, [{
        key: "setListado",
        value: function setListado(persona) {
            this.listado.push(persona);
        }
        //Lleva los datos de las personas...

    }, {
        key: "getListado",
        value: function getListado() {
            return this.listado;
        }
        //Para buscar una persona dado el número de indetificación

    }, {
        key: "buscaPersona",
        value: function buscaPersona(guid) {
            var busca = {},
                indice = 0,
                existe = false;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.listado[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var persona = _step.value;

                    if (persona.guid === guid) {
                        busca = persona;
                        existe = true;
                        break;
                    }
                    indice++;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            indice = !existe ? -1 : indice;
            return { indice: indice, busca: busca };
        }

        //Para editar una persona...

    }, {
        key: "editaPersona",
        value: function editaPersona(guid, data, callback) {
            var _this = this;

            var indice = this.buscaPersona(guid).indice;
            if (indice >= 0) {
                data.guid = guid;
                _persistencia2.default.crudData({
                    data: data,
                    registro: { campo: "guid", guid: guid },
                    type: "update"
                }, function (error) {
                    if (!error) {
                        _this.listado[indice] = data;
                    }
                    callback(error);
                });
            } else {
                callback(false);
            }
        }

        //Eliminar una persona...

    }, {
        key: "eliminaPersona",
        value: function eliminaPersona(guid, callback) {
            var _this2 = this;

            var indice = this.buscaPersona(guid).indice;
            if (indice >= 0) {
                _persistencia2.default.crudData({
                    registro: { campo: "guid", guid: guid },
                    type: "delete"
                }, function (error) {
                    if (!error) {
                        _this2.listado.splice(indice, 1);
                    }
                    callback(error);
                });
            } else {
                callback(true);
            }
        }

        //Para saber si ya existe una persona...
        /*
            idedita -> Identificacion usuario que se esté editando, 0 si no existe...
            identificacion -> Identificación nuevo usuario...
            Email -> email nuevo usuario...
        */

    }, {
        key: "existePersona",
        value: function existePersona(_ref) {
            var _ref$guid = _ref.guid;
            var guid = _ref$guid === undefined ? "0" : _ref$guid;
            var identificacion = _ref.identificacion;
            var email = _ref.email;

            var existe = 0; //0 Ningún campo existe...
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.listado[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var persona = _step2.value;

                    if (guid !== persona.guid) {
                        if (persona.identificacion === identificacion) {
                            existe = 1; // la cédula existe...
                        } else {
                                if (persona.email.toLowerCase() === email.toLowerCase()) {
                                    existe = 2; //El correo existe...
                                }
                            }
                        if (existe !== 0) {
                            break;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return existe;
        }

        //Para guardar una nueva persona...

    }, {
        key: "adicionaPersona",
        value: function adicionaPersona(persona, callback) {
            var _this3 = this;

            persona.guid = (0, _utils.guid)();
            _persistencia2.default.crudData({ data: persona }, function (error) {
                if (!error) {
                    _this3.listado.push(persona);
                }
                callback(error);
            });
        }
    }]);

    return Personas;
}();

module.exports = { Personas: Personas };

},{"./persistencia":5,"./utils":6}],3:[function(require,module,exports){
"use strict";

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
var config = { nombre: "listadoUsuario", tipo: "localStorage" };
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
module.exports = { config: config };

},{}],4:[function(require,module,exports){
"use strict";

var _persistencia = require("./persistencia");

var _Persona = require("./Persona");

var _Persona2 = _interopRequireDefault(_Persona);

var _Personas = require("./Personas");

var _Personas2 = _interopRequireDefault(_Personas);

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Se invoca la clase de tipo Personas...
var personas = new _Personas2.default.Personas(),
    guidEdita = "";

//Los elementos del formulario...
var elementos = ["identificacion", "primernombre", "primerapellido", "email", "fechanacimiento"];
//Para las acciones a realizar....
var accionesEventos = function accionesEventos(div) {
    //Editar..
    _utils2.default.nom_div("e_" + div).addEventListener('click', function (event) {
        var guid = _utils2.default.nom_div("p_" + event.target.id.split("_")[1]).getAttribute("data");
        //Para Traer al usuario a buscar...

        var _personas$buscaPerson = personas.buscaPersona(guid);

        var indice = _personas$buscaPerson.indice;
        var busca = _personas$buscaPerson.busca;

        if (indice >= 0) {
            for (var i = 0; i < elementos.length; i++) {
                _utils2.default.nom_div(elementos[i]).value = busca[elementos[i]];
            }
            guidEdita = guid;
        } else {
            alert("La persona no existe");
        }
    });

    //Eliminar...
    _utils2.default.nom_div("d_" + div).addEventListener('click', function (event) {
        var guid = _utils2.default.nom_div("p_" + event.target.id.split("_")[1]).getAttribute("data");
        if (confirm("¿Está segur@ de realizar está acción?")) {
            personas.eliminaPersona(guid, function (error) {
                if (error) {
                    alert("La persona no existe");
                }
                limpiarCampos();
                imprimeUsuarios();
            });
        }
    });
};

//Imprimir los usuarios...
var imprimeUsuarios = function imprimeUsuarios() {
    var listadoPersonas = personas.getListado();
    var txt = "<table class = 'table-fill'>\n                <thead><tr>\n                <th>ID</th>\n                <th>Nombre</th>\n                <th>Correo</th>\n                <th>Fecha</th>\n                <th>Edad</th>\n                <th>Editar</th>\n                <th>Eliminar</th></tr></thead>\n                <tbody class = 'table-hover'>";
    for (var veces = 1; veces <= 2; veces++) {
        for (var i = 0; i < listadoPersonas.length; i++) {
            if (veces === 1) {
                var datosPersona = listadoPersonas[i].getPersona();
                txt += "<tr id = 'p_" + i + "' data = " + datosPersona[0] + ">";
                for (var _i = 1; _i < datosPersona.length; _i++) {
                    txt += "<td><center>" + datosPersona[_i] + "</center></td>";
                }
                //Editar/Eliminar...
                txt += "<td>\n                            <center>\n                                <img src = 'img/editar.png' border = '0' id = 'e_" + i + "'/>\n                            </center>\n                        </td>\n                        <td>\n                            <center>\n                                <img src = 'img/eliminar.png' border = '0' id = 'd_" + i + "'/>\n                            </center>\n                        </td>\n                    </tr>";
            } else {
                accionesEventos(i);
            }
        }
        if (veces === 1) {
            txt += "</tbody></table>";
            _utils2.default.nom_div("imprime").innerHTML = txt;
        }
    }
};

//Para guardar los datos de un nuevo usuario...
//Acciones sobre el botón guardar...
_utils2.default.nom_div("guarda").addEventListener('click', function (event) {
    var correcto = true,
        nuevaPersona = {};
    for (var i = 0; i < elementos.length; i++) {
        if (_utils2.default.nom_div(elementos[i]).value === "") {
            alert("Por favor digite " + elementos[i]);
            _utils2.default.nom_div(elementos[i]).focus();
            correcto = false;
            break;
        } else {
            nuevaPersona[elementos[i]] = _utils2.default.nom_div(elementos[i]).value;
        }
    }
    //Si correcto es verdadero...
    if (correcto) {
        var existeDatos = personas.existePersona({
            guid: guidEdita,
            identificacion: nuevaPersona.identificacion,
            email: nuevaPersona.email
        });
        if (existeDatos === 0) //No existe...
            {
                if (_utils2.default.ValidaEmail(nuevaPersona.email)) {
                    //No se estaba editando...
                    if (guidEdita === "") {
                        personas.adicionaPersona(new _Persona2.default.Persona(nuevaPersona), function (error) {
                            if (error) {
                                alert("Error al guardar los datos...");
                            }
                            imprimeUsuarios();
                            limpiarCampos();
                        });
                    } else {
                        personas.editaPersona(guidEdita, new _Persona2.default.Persona(nuevaPersona), function (error) {
                            if (error) {
                                alert("Usuario no existe");
                            }
                            imprimeUsuarios();
                            limpiarCampos();
                        });
                    }
                } else {
                    alert("El correo no es válido");
                    _utils2.default.nom_div(elementos[3]).focus();
                }
            } else {
            if (existeDatos == 1) {
                alert("El usuario con la cédula: " + nuevaPersona.identificacion + " ya existe");
                _utils2.default.nom_div(elementos[0]).focus();
            } else {
                alert("El correo : " + nuevaPersona.email + ", ya existe");
                _utils2.default.nom_div(elementos[3]).focus();
            }
        }
    }
});

//Para traer la información que está en la persistencia...
(0, _persistencia.getData)(function (data) {
    for (var i = 0; i < data.length; i++) {
        personas.setListado(new _Persona2.default.Persona(data[i]));
    }
    imprimeUsuarios();
});

//Limpiar los campos del formulario...
var limpiarCampos = function limpiarCampos() {
    guidEdita = "";
    for (var i = 0; i < elementos.length; i++) {
        _utils2.default.nom_div(elementos[i]).value = "";
    }
};

},{"./Persona":1,"./Personas":2,"./persistencia":5,"./utils":6}],5:[function(require,module,exports){
"use strict";

var _configPersistencia = require("./configPersistencia");

var dataPersistencia = ""; /*
                               Persistencia Local.
                               CRUD Local por WebSQL o localStorage
                               Desarroolado por: Jorge Rubiano - @ostjh
                               http://jorger.github.io/page/es/
                           */

var getData = function getData(callback) {
    //Primero saber el tipo de persistencia establecido...
    if (_configPersistencia.config.tipo.toLowerCase() === "localstorage") {
        var data = [];
        dataPersistencia = localStorage.getItem(_configPersistencia.config.nombre);
        if (dataPersistencia) {
            data = JSON.parse(dataPersistencia);
        }
        callback(data);
    } else {
        if (_configPersistencia.config.tipo.toLowerCase() === "websql") {
            if (window.openDatabase) {
                dataPersistencia = openDatabase(_configPersistencia.config.nombre, "0.1", "Base de datos de usuarios", 1024 * 1024);
                dataPersistencia.transaction(function (table) {
                    var sql = "";
                    for (var i = 0; i < _configPersistencia.config.schema.registros.length; i++) {
                        if (sql !== "") {
                            sql += ", ";
                        }
                        sql += _configPersistencia.config.schema.registros[i] + " TEXT";
                    }
                    table.executeSql("CREATE TABLE IF NOT EXISTS " + _configPersistencia.config.schema.nombre + "\n                                     (id INTEGER PRIMARY KEY ASC, " + sql + ")");
                });
                if (dataPersistencia) {
                    dataPersistencia.transaction(function (transaction) {
                        transaction.executeSql("SELECT * FROM " + _configPersistencia.config.schema.nombre, [], function (transaction, results) {
                            if (results.rows.length !== 0) {
                                var _data = [];
                                for (var i = 0; i < results.rows.length; i++) {
                                    _data.push(results.rows.item(i));
                                }
                                callback(_data);
                            } else {
                                callback([]);
                            }
                        }, function () {
                            alert("Error conectado a WebSQL");
                        });
                    });
                } else {
                    alert("La base de datos no existe!");
                    callback([]);
                }
            } else {
                alert("WebSQL no está soportado en el navegador");
                callback([]);
            }
        }
    }
};

//Para buscar un ítem en LocalStorage...
var buscaLocalStorage = function buscaLocalStorage(local, registro) {
    var indice = -1;
    for (var i = 0; i < local.length; i++) {
        if (local[i][registro.campo] === registro.guid) {
            indice = i;
            break;
        }
    }
    return indice;
};

//Guarda las datos en localStorage
var crudData = function crudData(_ref, callback) {
    var registro = _ref.registro;
    var data = _ref.data;
    var _ref$type = _ref.type;
    var type = _ref$type === undefined ? "create" : _ref$type;

    if (_configPersistencia.config.tipo.toLowerCase() === "localstorage") {
        var local = localStorage.getItem(_configPersistencia.config.nombre) ? JSON.parse(localStorage.getItem(_configPersistencia.config.nombre)) : [],
            error = false;
        if (type === "update" || type === "delete") {
            var indice = buscaLocalStorage(local, registro);
            if (indice >= 0) {
                if (type === "delete") {
                    local.splice(indice, 1);
                } else {
                    local[indice] = data;
                }
            } else {
                error = true;
            }
        } else if (type === "create") {
            local.push(data);
        } else {
            error = true;
        }
        if (!error) {
            localStorage.setItem(_configPersistencia.config.nombre, JSON.stringify(local));
        }
        callback(error);
    } else {
        //Para traer sólo la la data del último usuario...
        if (dataPersistencia) {
            dataPersistencia.transaction(function (t) {
                if (type === "delete") {
                    t.executeSql("DELETE FROM " + _configPersistencia.config.schema.nombre + " WHERE " + registro.campo + "=?", [registro.guid], callback(false));
                } else {
                    var sql = "",
                        campos = "",
                        dataGuarda = [],
                        ejecutaSQL = "";
                    for (var i = 0; i < _configPersistencia.config.schema.registros.length; i++) {
                        if (sql !== "") {
                            sql += ", ";
                            campos += ", ";
                        }
                        sql += "" + _configPersistencia.config.schema.registros[i] + (type === "update" ? "=?" : "");
                        campos += "?";
                        dataGuarda.push(data[_configPersistencia.config.schema.registros[i]]);
                    }
                    if (type === "create") {
                        ejecutaSQL = "INSERT INTO " + _configPersistencia.config.schema.nombre + " (" + sql + ") VALUES (" + campos + ")";
                    } else {
                        dataGuarda.push(registro.guid);
                        ejecutaSQL = "UPDATE " + _configPersistencia.config.schema.nombre + " SET " + sql + " where " + registro.campo + "=?";
                    }
                    t.executeSql(ejecutaSQL, dataGuarda, callback(false));
                }
            });
        }
    }
};

module.exports = { getData: getData, crudData: crudData };

},{"./configPersistencia":3}],6:[function(require,module,exports){
"use strict";

//Para el acceso al DOM...
var nom_div = function nom_div(param) {
    return document.getElementById(param);
};
//Para validar el email...
var ValidaEmail = function ValidaEmail(email) {
    var emailReg = /^([\da-zA-Z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return emailReg.test(email);
};

//http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
var guid = function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
};

module.exports = {
    nom_div: nom_div,
    ValidaEmail: ValidaEmail,
    guid: guid
};

},{}]},{},[4]);
