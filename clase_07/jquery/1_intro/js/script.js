$(function()
{
	//var btns = ["clase", "css", "oculta"]; // Array strings...
	var btns = []; // Array strings...
	var $elemento = $("#circulo");
	var $keyBoard = "";
	var letra = "";
	for(var i = 0; i <= 25; i++)
	{
		letra = String.fromCharCode(97 + i);
		//console.log(letra);
		//style = 'background-color: "+randomColor()+"'
		$keyBoard = "<div id = 'letra_"+(letra)+"' " +
						"class = 'teclado azul'>" +
						(letra.toUpperCase()) +
					 "</div>";

		$("#keyboard").append($keyBoard);
		/*
		$("#letra_" + letra).click(function(event) {
			console.log(this.id.split("_")[1]);
		});
		*/
	}

	for(var i = 0; i < $("button").size(); i++)
	{
		//console.log($("button")[i].id);
		btns.push($("button")[i].id);
	}



	//console.log($keyBoard);
	//$("#keyboard").html($keyBoard);
	$("#rango").change(function(event)
	{
		$elemento.css({
					 	"width": 100 * $(this).val(),
						"height": (100 * $(this).val()) * 0.5
					 });
	});

	function randomColor()
	{
    	// from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    	return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
    	(c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
  	};
	/*
	$(document).keypress(function(event)
	{
		//console.log(event.keyCode, txtLetra);
		if(event.keyCode >= 97 && event.keyCode <= 122)
		{
			var txtLetra = String.fromCharCode(event.keyCode);
			//console.log(txtLetra);
			if($("#letra_" + txtLetra).is(':visible'))
			{
				$("#letra_" + txtLetra).hide("fast");
			}
			else
			{
				$("#letra_" + txtLetra).show("fast");
			}
		}
	});
	*/

	$(document).keydown(function(event)
	{
		//console.log(event.keyCode);
		presionaBoton(event.keyCode, true);
	});

	$(document).keyup(function(event)
	{
		presionaBoton(event.keyCode, false);
	});

	var presionaBoton = function(key, estado)
	{
		//console.log(key);
		if(key >= 65 && key <= 90)
		{
			var txtLetra = String.fromCharCode(key).toLowerCase();
			//console.log("#letra_" + txtLetra, estado);
			$("#letra_" + txtLetra).css({
				"width": estado ? 100 : 50,
				"height": estado ? 100 : 50,
				"color" : estado ? "red" : "white"
			});

			/*
			if(estado)
			{
				//console.log("Presiona");
				$("#letra_" + txtLetra).css({
					"width": 100,
					"height": 100,
					"color" : "red"
				});

			}
			else
			{
				//console.log("Suelta");
				$("#letra_" + txtLetra).css({
					"width": 50,
					"height": 50,
					"color" : "white"
				});
			}
			*/
		}
	};

	for(var i = 0; i < btns.length; i++)
	{
		$("#" + btns[i]).click(function(event)
		{
			switch(this.id)
			{
				case "clase": //Canbiar la clase del elemento...
							  var azul = $elemento.hasClass("azul");
							  $elemento
							  		  .removeClass(azul ? "azul" : "verde")
							  		  .addClass(azul ? "verde" : "azul");
							  break;
				case "css" : //Para cambiar propiedades del CSS...
							 $elemento.css({
							 	"border": "10px solid red",
							 	"border-radius" : "10px 10px 10px 10px",
								"background-color" : "gray"

							 });
							 break;
				case "oculta" : //Para ocultar y mostrar...
								if($elemento.is(':visible'))
								{
									/*
									$elemento.hide('slow', function() {
										console.log("Termine...");
									});
									*/

									$elemento.fadeOut(500, function()
									{
							  			console.log("Termina de ocultar 2");
							  		});

								}
								else
								{
									//$elemento.show('fast');

									$elemento.fadeIn("slow", function() {
							  			console.log("Termina de Mostrar");
							  		});

								}
							  	/*
							  		$elemento.hide('slow', function() {
								  		console.log("Termina de ocultar");
							  	});
							  	*/
							  	//$elemento.toggle();
							  break;
			}
		});
	}
});
