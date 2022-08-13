//Importacion de mongoose
var mongoose = require("mongoose");

//Definicion del esquema
var Schema = mongoose.Schema(
    {
        nombre: String,
        apellido: String,
        correo: String,
        contraseña: String,
        aprobado: Boolean,
        imagen: String,
        ordenes: Array
    }
);

//Exportacion del modelo
module.exports = mongoose.model("Motorista", Schema);