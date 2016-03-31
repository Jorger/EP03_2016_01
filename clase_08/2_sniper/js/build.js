(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _utils = require("./utils");

$("#carcasa").css('cursor', 'url(img/sniper.png), auto').bind('contextmenu', function (e) {
    return false;
});

var inicia = false,
    puntuaTotal = 0,
    puntacion = 10;

$("#start").click(function (event) {
    if (!inicia) {
        setInterval(generaPatos, 1000);
        inicia = true;
    }
});

var generaPatos = function generaPatos() {
    var direccion = Math.floor(Math.random() * 2),
        token = (0, _utils.guid)(),
        divPato = "<div class = 'pato' id = 'pato_" + token + "'></div>",
        valDireccion = [{
        left: 40,
        top: 260,
        img: "derecha.png",
        limite: 510
    }, {
        left: 510,
        top: 370,
        img: "izquierda.png",
        limite: 20
    }];
    //Asociar el pato al escenario...

    $("#carcasa").append(divPato);
    $("#pato_" + token).css({
        left: valDireccion[direccion].left,
        top: valDireccion[direccion].top,
        "background-image": "url(img/" + valDireccion[direccion].img + ")"
    }).hide().delay(100).fadeIn('fast').animate({ left: valDireccion[direccion].limite }, 8000, function () {
        //console.log(event.currentTarget.id);
        $(this).fadeOut('fast', function () {
            $(this).remove();
        });
    }).on("click", function () {
        var position = $(this).position(),
            token = $(this)[0].id.split("_")[1];
        $("#carcasa").append("<div class = 'puntuacion' id = 'punt_" + token + "'>" + puntacion + "</div>");
        $("#punt_" + token).css({
            left: position.left,
            top: position.top
        }).fadeOut('slow', function () {
            $(this).remove();
        });
        puntuaTotal += puntacion;
        $("#totalPuntua").html(puntuaTotal);
        $(this).remove();
    });
};

},{"./utils":2}],2:[function(require,module,exports){
"use strict";

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}
module.exports = { guid: guid };

},{}]},{},[1]);
