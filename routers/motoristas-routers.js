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

//Agragar id orden entregada al motorista
//URL: http://localhost:3333/motorista/:id/orden/entregada/:idOrden
router.put('/:id/orden/entregada/:idOrden', (req, res) => {
    motoristas.findByIdAndUpdate(
        req.params.id,
        {
            $push: {
                "ordenes.entregadas": req.params.idOrden
            }
        },
        {
            new: true
        }
    )
    .then((motorista) => {
        res.send(motorista);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

//Agregar id orden recibida al motorista como tomada
//URL: http://localhost:3333/motorista/:id/orden/tomada/:idOrden
router.put('/:id/orden/tomada/:idOrden', (req, res) => {
    motoristas.findByIdAndUpdate(
        req.params.id,
        {
            $push: {
                "ordenes.tomadas": req.params.idOrden
            }
        },
        {
            new: true
        }
    )
    .then((motorista) => {
        res.send(motorista);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

//Buscar id de orden en todos los motoristas y eliminar la orden
//URL: http://localhost:3333/motorista/orden/:idOrden
router.delete('/orden/:idOrden', (req, res) => {
    motoristas.updateMany(
        {},
        {
            $pull: {
                "ordenes.entregadas": req.params.idOrden,
                "ordenes.tomadas": req.params.idOrden
            }
        }
    )
    .then((motorista) => {
        res.send(motorista);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

module.exports = router;