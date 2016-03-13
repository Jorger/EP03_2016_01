/*
    Persistencia Local.
    CRUD Local por WebSQL o localStorage
    Desarroolado por: Jorge Rubiano - @ostjh
    http://jorger.github.io/page/es/
*/
import {config} from "./configPersistencia";
let dataPersistencia = "";
let getData = (callback) =>
{
    //Primero saber el tipo de persistencia establecido...
    if(config.tipo.toLowerCase() === "localstorage")
    {
        let data = [];
        dataPersistencia = localStorage.getItem(config.nombre);
        if(dataPersistencia)
        {
            data = JSON.parse(dataPersistencia);
        }
        callback(data);
    }
    else
    {
        if(config.tipo.toLowerCase() === "websql")
        {
            if (window.openDatabase)
            {
                dataPersistencia = openDatabase(config.nombre, "0.1", "Base de datos de usuarios", 1024 * 1024);
                dataPersistencia.transaction(table =>
                {
                    let sql = "";
                    for(let i = 0; i < config.schema.registros.length; i++)
                    {
                        if(sql !== "")
                        {
                            sql += ", ";
                        }
                        sql += `${config.schema.registros[i]} TEXT`;
                    }
                    table.executeSql(`CREATE TABLE IF NOT EXISTS ${config.schema.nombre}
                                     (id INTEGER PRIMARY KEY ASC, ${sql})`);
                });
                if (dataPersistencia)
                {
                    dataPersistencia.transaction((transaction) =>
                    {
                        transaction.executeSql((`SELECT * FROM ${config.schema.nombre}`), [],
                            (transaction, results) =>
                            {
                                if(results.rows.length !== 0)
                                {
                                    let data = [];
                                    for(let i = 0; i < results.rows.length; i++)
                                    {
                                        data.push(results.rows.item(i));
                                    }
                                    callback(data);
                                }
                                else
                                {
                                    callback([]);
                                }
                            }, () => {
                                alert("Error conectado a WebSQL");
                            });
                    });
                }
                else
                {
                    alert("La base de datos no existe!");
                    callback([]);
                }
            }
            else
            {
                alert("WebSQL no está soportado en el navegador");
                callback([]);
            }
        }
    }
};

//Para buscar un ítem en LocalStorage...
let buscaLocalStorage = (local, registro) =>
{
    let indice = -1;
    for(let i = 0; i < local.length; i++)
    {
        if(local[i][registro.campo] === registro.guid)
        {
            indice = i;
            break;
        }
    }
    return indice;
};

//Guarda las datos en localStorage
let crudData = ({registro, data, type  = "create"}, callback) =>
{
    if(config.tipo.toLowerCase() === "localstorage")
    {
        let local = localStorage.getItem(config.nombre) ? JSON.parse(localStorage.getItem(config.nombre)) : [],
            error        = false;
        if(type === "update" || type === "delete")
        {
            let indice = buscaLocalStorage (local, registro);
            if(indice >= 0)
            {
                if(type === "delete")
                {
                    local.splice(indice, 1);
                }
                else
                {
                    local[indice] = data;
                }
            }
            else
            {
                error = true;
            }
        }
        else if(type === "create")
        {
            local.push(data);
        }
        else
        {
            error = true;
        }
        if(!error)
        {
            localStorage.setItem(config.nombre, JSON.stringify(local));
        }
        callback(error);
    }
    else
    {
        //Para traer sólo la la data del último usuario...
        if (dataPersistencia)
        {
            dataPersistencia.transaction(t =>
            {
                if(type === "delete")
                {
                    t.executeSql(`DELETE FROM ${config.schema.nombre} WHERE ${registro.campo}=?`, [registro.guid], callback(false));
                }
                else
                {
                    let sql         = "",
                        campos      = "",
                        dataGuarda  = [],
                        ejecutaSQL  = "";
                    for(let i = 0; i < config.schema.registros.length; i++)
                    {
                        if(sql !== "")
                        {
                            sql += ", ";
                            campos += ", ";
                        }
                        sql += `${config.schema.registros[i]}` + (type === "update" ? "=?" : "");
                        campos += "?";
                        dataGuarda.push(data[config.schema.registros[i]]);
                    }
                    if(type === "create")
                    {
                        ejecutaSQL = `INSERT INTO ${config.schema.nombre} (${sql}) VALUES (${campos})`;
                    }
                    else
                    {
                        dataGuarda.push(registro.guid);
                        ejecutaSQL = `UPDATE ${config.schema.nombre} SET ${sql} where ${registro.campo}=?`;
                    }
                    t.executeSql(ejecutaSQL, dataGuarda, callback(false));
                }
            });
        }
    }
};

module.exports = {getData, crudData};
