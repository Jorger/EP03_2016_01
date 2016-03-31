var os = require('os');

//Convertir a MB...
var convertirMB = function(f)
{
    return(Math.round((f/1024/1024)*100)/100);
};

console.log('Nombre del HOST: ' + os.hostname());
console.log('15 min. carga en promedio: ' + os.loadavg()[2]);
console.log(convertirMB(os.freemem()) + ' de ' + convertirMB(os.totalmem()) + ' Mb Libres');
