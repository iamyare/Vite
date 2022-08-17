//Importacion de mongoose
var mongoose = require("mongoose");

//Definicion del esquema
var Schema = mongoose.Schema(
    {
        nombre: String,
        apellido: String,
        correo: String,
        contraseña: String,
        imagen: String,
        identificacion: String,
        ordenes: {}
    }
);

//Exportacion del modelo
module.exports = mongoose.model("Motorista", Schema);