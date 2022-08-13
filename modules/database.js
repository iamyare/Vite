var mongoose = require("mongoose");

var servidor = "localhost:27017";
var nombreBaseDatos ="vite";

class Database{
    constructor(){
        this.conectar();
    }

    conectar(){
        mongoose.connect(`mongodb://${servidor}/${nombreBaseDatos}`)
        .then(()=>{
            console.log("Se conecto a la base de datos");
        })
        .catch(error=>{
            console.log("Error al conectarse a la base de datos");
        });
    }
}


module.exports = new Database();