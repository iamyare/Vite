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

//Obtener un producto por su id
//URL: http://localhost:3333/empresa/producto/:id
router.get('/producto/:id', (req, res) => {
    empresas.aggregate([
        {
            "$project": {
                "productos": 1.0
            }
        },
        {
            "$unwind": "$productos"
        },
        {
            "$match": {
                "productos._id": mongoose.Types.ObjectId(req.params.id)
            }
        }
    ])
    .then((producto) => {
        res.send(producto[0].productos);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//modificar un producto por su id
//URL: http://localhost:3333/empresa/producto/:id
router.put('/producto/:id', (req, res) => {
    empresas.updateOne(
        { "productos._id": mongoose.Types.ObjectId(req.params.id) },
        { $set: {
            "productos.$.nombre": req.body.nombre,
            "productos.$.precio": req.body.precio,
            "productos.$.imagen": req.body.imagen
        }
    })
    .then((producto) => {
        res.send(producto);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});





module.exports = router;