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

//Agregar orden a la lista de ordenes tomadas por el motorista
//URL: http://localhost:3333/motorista/:id/orden/tomada/:idOrden
router.put('/:idMotorista/orden/tomada/:idOrden', (req, res) => {
    motoristas.findByIdAndUpdate(
        req.params.idMotorista,
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


//Actualizar un motorista
//URL: http://localhost:3333/motorista/:id
router.put('/:id', (req, res) => {
    motoristas.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                correo: req.body.correo,
                contraseña: req.body.contraseña,
                imagen: req.body.imagen,
                identificacion: req.body.identificacion
            }
        },

    )
    .then((motorista) => {
        res.send(motorista);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});


//Crear un motorista
//URL: http://localhost:3333/motorista
router.post('/', (req, res) => {
    var motorista = new motoristas({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        contraseña: req.body.contraseña,
        imagen: req.body.imagen,
        identificacion: req.body.identificacion,
        ordenes: {
            entregadas: [],
            tomadas: []
        }
    });
    motorista.save()
    .then((motorista) => {
        res.send(motorista);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

//Eliminar un motorista
//URL: http://localhost:3333/motorista/:id
router.delete('/:id', (req, res) => {
    motoristas.findByIdAndRemove(req.params.id)
    .then((motorista) => {
        res.send(motorista);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener las ordenes tomadas por un motorista por su id, y con el id de la orden obtener su informacio
//URL: http://localhost:3333/motorista/:id/ordenes/tomadas
router.get('/:id/ordenes/tomadas', (req, res) => {
    motoristas.aggregate([
        {
            $lookup: {
                from: 'administracions',
                localField: 'ordenes.tomadas',
                foreignField: 'administracion.ordenes._id',
                as: 'ordenesTomadas'
            }
        },
        {
            $unwind: '$ordenesTomadas'
        },
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        }
    ])
    .then((motorista) => {
        res.send(motorista);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

module.exports = router;