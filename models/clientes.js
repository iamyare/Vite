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
        carrito: {},
        ordenes: Array
    }
);

//Exportacion del modelo
module.exports = mongoose.model("Cliente", Schema);