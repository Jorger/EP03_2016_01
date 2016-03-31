// Carga matematicas.js en el directorio 'modulo'...
var matematicas = require('./modulo/matematicas');
/*
var processResults = function(err, results, time)
{
    if(err)
    {
        console.log("ERROR: " + err.message);
    }
    else
    {
        console.log("El resultado es: " + results + " (" + time + " ms)");
    }
};
*/

for (var i = 0; i < 10; i++)
{
    console.log("Llamando 'doblarValor' con valor '" + i + "'");
    matematicas.doblarValor(i, function(err, results, time){
        if(err)
        {
            console.log("ERROR: " + err.message);
        }
        else
        {
            console.log("El resultado es: " + results + " (" + time + " ms)");
        }
    });
}
console.log("-----");
console.log(" La variable 'hola' del modulo 'matematicas' = " + matematicas.hola);
// Debería retornar undefined, ya que la variable 'tiempoMaximo' no ha sido exportada...
console.log("La variable 'tiempoMaximo' no ha sido exportada: " + matematicas.tiempoMaximo);
