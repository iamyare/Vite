//Importacion de mongoose
var mongoose = require("mongoose");

//Definicion del esquema
var Schema = mongoose.Schema(
    {
        nombre: String,
        contraseña: String,
        motoristas: Array,
        clientes: Array,
        proveedores: Array, 
        ordenes: Array,
        tarjetas: Array,
        categorias: Array,
        estados: Array
    }
);

//Exportacion del modelo
module.exports = mongoose.model("Administracion", Schema);