//Paquete llamado request, descargado desde npm...
var request = require('request');
request('http://www.google.com', function(error, response, body)
{
    if (!error && response.statusCode === 200)
    {
        console.log(body);
    }
});
console.log("Ingresa y ejecuta...");
