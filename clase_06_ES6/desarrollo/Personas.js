import persistencia from "./persistencia";
import {guid} from "./utils";

class Personas
{
    constructor()
    {
        this.listado = [];
    }
    setListado(persona)
    {
        this.listado.push(persona);
    }
    //Lleva los datos de las personas...
    getListado()
    {
        return this.listado;
    }
    //Para buscar una persona dado el número de indetificación
    buscaPersona(guid)
    {
        let busca  = {},
            indice = 0,
            existe = false;
        for(let persona of this.listado)
        {
            if(persona.guid === guid)
            {
                busca = persona;
                existe = true;
                break;
            }
            indice++;
        }
        indice = !existe ? -1 : indice;
        return {indice, busca};
    }

    //Para editar una persona...
    editaPersona(guid, data, callback)
    {
        let indice = this.buscaPersona(guid).indice;
        if(indice >= 0)
        {
            data.guid = guid;
            persistencia.crudData({
                                        data,
                                        registro : {campo : "guid" , guid},
                                        type     : "update"
                                  }, error =>
                                  {
                                      if(!error)
                                      {
                                          this.listado[indice] = data;
                                      }
                                      callback(error);
                                  });
        }
        else
        {
            callback(false);
        }
    }

    //Eliminar una persona...
    eliminaPersona(guid, callback)
    {
        let indice = this.buscaPersona(guid).indice;
        if(indice >= 0)
        {
            console.log("DOS");
            persistencia.crudData({
                                        registro : {campo : "guid" , guid},
                                        type     : "delete"
                                  }, error =>
                                  {
                                      console.log("CINCO");
                                      if(!error)
                                      {
                                          this.listado.splice(indice, 1);
                                      }
                                      callback(error);
                                  });
        }
        else
        {
            callback(true);
        }
    }

    //Para saber si ya existe una persona...
    /*
        idedita -> Identificacion usuario que se esté editando, 0 si no existe...
        identificacion -> Identificación nuevo usuario...
        Email -> email nuevo usuario...
    */
    existePersona({guid = "0", identificacion, email})
	{
        let existe = 0; //0 Ningún campo existe...
        for(let persona of this.listado)
        {
            if(guid !== persona.guid)
            {
                if(persona.identificacion === identificacion)
                {
                    existe = 1; // la cédula existe...
                }
                else
                {
                    if(persona.email.toLowerCase() === email.toLowerCase())
    				{
    					existe = 2; //El correo existe...
    				}
                }
                if(existe !== 0)
                {
                    break;
                }
            }
        }
		return existe;
	}

    //Para guardar una nueva persona...
    adicionaPersona(persona, callback)
    {
        persona.guid = guid();
        persistencia.crudData({data : persona}, error =>
        {
            if(!error)
            {
                this.listado.push(persona);
            }
            callback(error);
        });
    }
}
module.exports = {Personas};
