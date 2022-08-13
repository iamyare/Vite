//Importamos las dependencias necesarias
var express = require('express');

//Route nos permite crear rutas para nuestra aplicacion
var router = express.Router();
var mongoose = require('mongoose');

//Importamos el modelo, para poder trabajar con ellos en la base de datos
var motoristas = require('../models/motoristas');

//Obtener todos los motoristas
//URL: http://localhost:3333/motorista
router.get('/', (req, res) => {
    motoristas.find({},{})
    .then((motoristas) => {
        res.send(motoristas);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener un motorista por su id
//URL: http://localhost:3333/motorista/:id
router.get('/:id', (req, res) => {
    motoristas.findById(req.params.id)
    .then((motorista) => {
        res.send(motorista);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});


module.exports = router;