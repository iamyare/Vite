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

//Actualizar un cliente por su id
//URL: http://localhost:3333/cliente/:id
router.put('/:id', (req, res) => {
    clientes.findByIdAndUpdate(
        {_id: req.params.id},
        {
            $set: {
                "nombre": req.body.nombre,
                "apellido": req.body.apellido,
                "correo": req.body.correo,
                "contraseña": req.body.contraseña
        }
    })
    .then((cliente) => {
        res.send(cliente);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Crear un cliente
//URL: http://localhost:3333/cliente
router.post('/', (req, res) => {
    var cliente = new clientes({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        contraseña: req.body.contraseña,
        imagen: req.body.imagen
    });
    cliente.save()
    .then((cliente) => {
        res.send(cliente);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

//Eliminar un cliente por su id
//URL: http://localhost:3333/cliente/:id
router.delete('/:id', (req, res) => {
    clientes.findByIdAndRemove(req.params.id)
    .then((cliente) => {
        res.send(cliente);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});



//Eliminar orden de un cliente por su id
//URL: http://localhost:3333/cliente/:id/orden/:id
router.delete('/:idCliente/orden/:idOrden', (req, res) => {
    clientes.findByIdAndUpdate(
        {_id: req.params.idCliente},
        {
            $pull: {
                "ordenes": mongoose.Types.ObjectId(req.params.idOrden)
        }
    })
    .then((cliente) => {
        res.send(cliente);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Agregar un id de orden ya creado a un cliente por su id
//URL: http://localhost:3333/cliente/:id/orden/:id
router.post('/:idCliente/orden/:idOrden', (req, res) => {
    clientes.findByIdAndUpdate(
        {_id: req.params.idCliente},
        {
            $push: {
                "ordenes": mongoose.Types.ObjectId(req.params.idOrden)
        }
    })
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