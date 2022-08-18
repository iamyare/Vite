//Importamos las dependencias necesarias
var express = require('express');
const path = require('path');


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

//Crear un carrito
//URL: http://localhost:3333/cliente/:id/carrito
router.post('/:idCliente/carrito', (req, res) => {
    id = mongoose.Types.ObjectId();
    clientes.findByIdAndUpdate(
        {_id: req.params.idCliente},
        {
            $set: {
                "carrito": {
                    "_id": id,
                    "productos": [],
                    "direccion": {
                        "direccion": '',
                        "latitud": '',
                        "longitud": ''
                    },
                    "factura": {
                        "total": 0,
                        "subtotal": 0,
                        "comision": {},
                        "codigoSeguridad": '',
                        "numeroTarjeta": '',
                        "nombreTitular": '',
                        "fechaVencimiento": '',
                        "tarjeta": ''
                }
            }

        }
    })
    .then((cliente) => {
        res.send(cliente);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

//agregar un producto a un carrito
//URL: http://localhost:3333/cliente/carrito/:idCarrito/producto/:idProducto
router.put('/carrito/:idOrden/producto/:idProducto', (req, res) => {
    clientes.updateOne(
        {
            "carrito._id": mongoose.Types.ObjectId(req.params.idOrden)
        },
        {
            "$push": {
                "carrito.productos": {
                    "producto": mongoose.Types.ObjectId(req.params.idProducto),
                    "cantidad": Number(req.body.cantidad)
                }
            }
        }
    )
    .then((cliente) => {
        res.send(cliente);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

//Actualizar la direccion de un carrito
//URL: http://localhost:3333/cliente/carrito/:idCarrito/direccion
router.put('/carrito/:idOrden/direccion', (req, res) => {
    clientes.updateOne(
        {
            "carrito._id": mongoose.Types.ObjectId(req.params.idOrden)
        },
        {
            "$set": {
                "carrito.direccion": {
                    "direccion": req.body.direccion,
                    "latitud": req.body.latitud,
                    "longitud": req.body.longitud
                }
            }
        }
    )
    .then((cliente) => {
        res.send(cliente);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

//Actualizar la factura de un carrito
//URL: http://localhost:3333/cliente/carrito/:idCarrito/factura
router.put('/carrito/:idOrden/factura', (req, res) => {
    clientes.updateOne(
        {
            "carrito._id": mongoose.Types.ObjectId(req.params.idOrden)
        },
        {
            "$set": {
                "carrito.factura": {
                    "total": req.body.total,
                    "subtotal": req.body.subtotal,
                        "comision": {
                        "adm": req.body.adm,
                        "motorista": req.body.motorista
                    },
                    "codigoSeguridad": req.body.codigoSeguridad,
                    "numeroTarjeta": req.body.numeroTarjeta,
                    "nombreTitular": req.body.nombreTitular,
                    "fechaVencimiento": req.body.fechaVencimiento,
                    "tarjeta": req.body.tarjeta
                },
                "carrito.estado": "en el origen"
            }
        }
    )
    .then((cliente) => {
        res.send(cliente);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});


//Eliminar un producto de un carrito
//URL: http://localhost:3333/cliente/carrito/:idCarrito/producto/:idProducto
router.delete('/carrito/:idOrden/producto/:idProducto', (req, res) => {
    clientes.updateOne(
        {
            "carrito._id": mongoose.Types.ObjectId(req.params.idOrden)
        },
        {
            "$pull": {
                "carrito.productos": {
                    "producto": {
                        "$eq": mongoose.Types.ObjectId(req.params.idProducto)
                    }
                }
            }
        }
    )
    .then((cliente) => {
        res.send(cliente);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener un carrito por su id
//URL: http://localhost:3333/cliente/carrito/:idCarrito
router.get('/carrito/:idOrden', (req, res) => {
    clientes.findOne(
        {
            "carrito._id": mongoose.Types.ObjectId(req.params.idOrden)
        },
        {
            "carrito.$": 1
        }
    )
    .then((carrito) => {
        res.send(carrito.carrito);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

//Eliminar el carrito de un cliente
//URL: http://localhost:3333/cliente/:idCliente/carrito
router.delete('/:idCliente/carrito', (req, res) => {
    clientes.updateOne(
        {
            "_id": mongoose.Types.ObjectId(req.params.idCliente)
        },
        {
            "$set": {
                "carrito": {}
            }
        }
    )
    .then((cliente) => {
        res.send(cliente);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    });
});

module.exports = router;