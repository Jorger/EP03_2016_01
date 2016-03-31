import {guid} from "./utils";
$("#carcasa").css('cursor', 'url(img/sniper.png), auto' )
             .bind('contextmenu', (e) =>
             {
                     return false;
             });

let inicia      = false,
    puntuaTotal = 0,
    puntacion   = 10;

$("#start").click(event =>
{
    if(!inicia)
    {
        setInterval(generaPatos, 1000);
        inicia = true;
    }
});

var generaPatos = () =>
{
    let direccion       = Math.floor(Math.random() * 2),
        token           = guid(),
        divPato         = `<div class = 'pato' id = 'pato_${token}'></div>`,
        valDireccion    = [{
                                left    : 40,
                                top     : 260,
                                img     : "derecha.png",
                                limite  : 510
                          },
                          {
                              left    : 510,
                              top     : 370,
                              img     : "izquierda.png",
                              limite  : 20
                          }
                      ];
    //Asociar el pato al escenario...

    $("#carcasa").append(divPato);
    $(`#pato_${token}`).css({
                        left    : valDireccion[direccion].left,
                        top     : valDireccion[direccion].top,
                        "background-image": `url(img/${valDireccion[direccion].img})`
                    })
                    .hide()
                    .delay(100)
                    .fadeIn('fast')
                    .animate({ left: valDireccion[direccion].limite}, 8000, function ()
                    {
                        //console.log(event.currentTarget.id);
                        $(this).fadeOut('fast', function() {
                            $(this).remove();
                        });
                    })
                    .on( "click", function()
                    {
                        let position = $(this).position(),
                            token    = $(this)[0].id.split("_")[1];
                        $("#carcasa").append(`<div class = 'puntuacion' id = 'punt_${token}'>${puntacion}</div>`);
                        $(`#punt_${token}`).css({
                            left : position.left,
                            top : position.top
                        }).
                        fadeOut('slow', function()
                        {
                            $(this).remove();

                        });
                        puntuaTotal += puntacion;
                        $("#totalPuntua").html(puntuaTotal);
                        $(this).remove();
                    });
};
