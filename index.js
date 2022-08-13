//Importar el modulo express para crear el servidor web
var express = require("express");

/* Importación del módulo de base de datos. */
var database = require("./modules/database");

//Importando los modulos
var clientesRouter = require("./routers/clientes-routers");
var administracionRouter = require("./routers/administracion-routers");
var empresasRouter = require("./routers/empresas-routers");
var motoristasRouter = require("./routers/motoristas-routers");


//Crear una aplicacion de nodejs con express
var app = express();

//Definir una carpeta como publica para que los usuarios puedan acceder a su contenido (Frontend)
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/cliente", clientesRouter);
app.use("/administracion", administracionRouter);
app.use("/motorista", motoristasRouter);
app.use("/empresa", empresasRouter);


//Levantar el servidor en el puerto 3333
app.listen(3333, function () {
    console.log("Servidor levantado en el puerto 3333");
});