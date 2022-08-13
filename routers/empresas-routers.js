//Importamos las dependencias necesarias
var express = require('express');

//Route nos permite crear rutas para nuestra aplicacion
var router = express.Router();
var mongoose = require('mongoose');

//Importamos el modelo, para poder trabajar con ellos en la base de datos
var empresas = require('../models/empresas');


//Obtener todos las empresas
//URL: http://localhost:3333/empresa
router.get('/', (req, res) => {
    empresas.find({},{})
    .then((empresas) => {
        res.send(empresas);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener una empresa por su id
//URL: http://localhost:3333/empresa/:id
router.get('/:id', (req, res) => {
    empresas.findById(req.params.id)
    .then((empresa) => {
        res.send(empresa);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

module.exports = router;