//Importamos las dependencias necesarias
var express = require('express');

//Route nos permite crear rutas para nuestra aplicacion
var router = express.Router();
var mongoose = require('mongoose');

//Importamos el modelo de clientes, para poder trabajar con ellos en la base de datos
var clientes = require('../models/clientes');

//Obtener todos los clientes
//URL: http://localhost:3333/cliente
router.get('/', (req, res) => {
    clientes.find({},{})
    .then((clientes) => {
        res.send(clientes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener un cliente por su id
//URL: http://localhost:3333/cliente/:id
router.get('/:id', (req, res) => {
    clientes.findById(req.params.id)
    .then((cliente) => {
        res.send(cliente);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});


module.exports = router;