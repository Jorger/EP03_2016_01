window.onload = function()
{
    var sierpinski = false;

    nom_div("sierpinski").addEventListener('click', function(event)
    {
        sierpinski = !sierpinski;
        imprimeTriangulo(Number(nom_div("rango").value));
    });

    var trianguloPascal = function(niveles)
    {
        pascal = [[1], [1, 1]]; //Base...
        var operaNivel = [];
        for(var i = 1; i <= niveles; i++)
        {
            operaNivel = [];
            for(var c = 0; c < pascal[i].length; c++)
            {
                if(c + 1 < pascal[i].length)
                {
                    operaNivel.push(pascal[i][c] + pascal[i][c + 1]);
                }
            }
            //Adicionar los 1's al inicio y final
            operaNivel.unshift(1);
            operaNivel.push(1);
            //Se almacena el valor en el array de Pascal..
            pascal.push(operaNivel);
        }
        return pascal;
    };

    var randomColor = function()
    {
        // from http://www.paulirish.com/2009/random-hex-color-code-snippets/
        return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
        (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
    };
    //Imprimir el triángulo de Pascal...
    var imprimeTriangulo = (function imprimeTriangulo(nivel)
    {
        var txt = "";
        var triangulo = trianguloPascal(nivel);
        console.table(triangulo);
        var colorCelda = "";
        nom_div("pascal").innerHTML = "";
        for(var i = 0; i < triangulo.length; i++)
        {
            txt += "<div align = 'center' class = 'nivel' style = 'padding-bottom: "+(!sierpinski ? 10 : 0)+"px;'>";
            for(var c = 0; c < triangulo[i].length; c++)
            {
                //rgba(128, 128, 128, 0.04)
                colorCelda = !sierpinski ? "background-color:" + randomColor()
                            : triangulo[i][c] % 2 !== 0 ?
                            "border-bottom: 50px solid black" :
                            "border-bottom: 50px solid white" ;
                txt += "<div style = 'display: inline-block; "+(colorCelda)+"' class = '"+(!sierpinski ? "celda" : "tringulo")+"'>" +
                            (!sierpinski ? triangulo[i][c] : "&nbsp;") +
                        "</div>";
            }
            txt += "</div>";
        }
        nom_div("pascal").innerHTML = txt;
        return imprimeTriangulo;
    })(2);

    //Para cambiar el rango del triángulo...
    nom_div("rango").addEventListener('change', function(event)
    {
        nom_div("txtrango").innerHTML = this.value;
        imprimeTriangulo(Number(this.value));
    });

    //Para imprir elementos en el HTML...
    function nom_div(div)
    {
        return document.getElementById(div);
    }

};
