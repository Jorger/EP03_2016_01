var tiempoMaximo = 1000; //Milisegundos...
// Sí es par, se dobla el valor.
// Si es imar, devuelve un error.
// las llamadas toman un tiempo aletorio de respuesta menor a un segundo.
var doblarValor = function(v, callback)
{
    var tiempoEspera = Math.floor(Math.random()*(tiempoMaximo+1));
    if(v % 2 !== 0)
    {
        setTimeout(function()
        {
            callback(new Error("Número Impar"));
        }, tiempoEspera);
    }
    else
    {
        setTimeout(function()
        {
            callback(null, v * 2, tiempoEspera);
        }, tiempoEspera);
    }
};

module.exports.doblarValor = doblarValor;
module.exports.hola = "Hola Mundo";