var tiempoMaximo = 5000; //Milisegundos...

// Sí es par, se dobla el valor.
// Si es impar, devuelve un error.
// las llamadas toman un tiempo aletorio de respuesta menor a un segundo.

var doblarValor = function(v, callback)
{
    var tiempoEspera = Math.floor(Math.random()*(tiempoMaximo + 1));
    setTimeout(function()
    {
        if(v % 2 !== 0)
        {
            callback(new Error("Número Impar"), v);
        }
        else
        {
            callback(null, v, v * 2, tiempoEspera);
        }
    }, tiempoEspera);
    /*
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
    */
};

var contador = 0;
for (var i = 0; i < 10; i++)
{
    console.log("LLamado a la función doblarValor para el valor: " + i);
    doblarValor(i, function(error, valor, resultado, tiempo)
    {
        //console.log("Valor de I es: " + i);
        if(error)
        {
            console.log(valor + " - Error : " + error.message);
        }
        else
        {
            console.log(valor + ", El resultado es: " + resultado + " (" + tiempo + "ms)");
        }
        if(++contador === 10)
        {
            console.log("Terminó!");
        }
    });
}
console.log("-----");
