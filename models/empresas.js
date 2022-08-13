//Importacion de mongoose
var mongoose = require("mongoose");

//Definicion del esquema
var Schema = mongoose.Schema(
    {
        nombre: String,
        correo: String,
        telefono: String,
        contraseña: String,
        contraseña: String,
        categoria: String,
        descripcion: String,
        logo: String,
        banner: String,
        local: String,
        productos: Array,
        reseñas: Array
    }
);

//Exportacion del modelo
module.exports = mongoose.model("Empresa", Schema);