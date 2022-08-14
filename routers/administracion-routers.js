//Importamos las dependencias necesarias
var express = require('express');

//Route nos permite crear rutas para nuestra aplicacion
var router = express.Router();
var mongoose = require('mongoose');

//Importamos el modelo, para poder trabajar con ellos en la base de datos
var administracion = require('../models/administracion');

//Obtener todos los administradores
//URL: http://localhost:3333/administracion
router.get('/', (req, res) => {
    administracion.find({},{})
    .then((administracion) => {
        res.send(administracion);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener motorista aprobados
//URL: http://localhost:3333/administracion/motorista/aprobados
router.get('/motorista/aprobados', (req, res) => {
    administracion.aggregate([
        {
            "$project": {
                "motoristas.aprobados": 1.0
            }
        }
    ])
    .then((motoristas) => {
        res.send(motoristas[0].motoristas.aprobados);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener motorista rechazados
//URL: http://localhost:3333/administracion/motorista/rechazados
router.get('/motorista/rechazados', (req, res) => {
    administracion.aggregate([
        {
            "$project": {
                "motoristas.rechazados": 1.0
            }
        }
    ])
    .then((motoristas) => {
        res.send(motoristas[0].motoristas.rechazados);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener motorista pendientes
//URL: http://localhost:3333/administracion/motorista/pendientes
router.get('/motorista/pendientes', (req, res) => {
    administracion.aggregate([
        {
            "$project": {
                "motoristas.pendientes": 1.0
            }
        }
    ])
    .then((motoristas) => {
        res.send(motoristas[0].motoristas.pendientes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener todas las ordenes
//URL: http://localhost:3333/administracion/ordenes
router.get('/ordenes', (req, res) => {
    administracion.aggregate([
        {
            "$project": {
                "ordenes": 1.0
            }
        }
    ])
    .then((ordenes) => {
        res.send(ordenes[0].ordenes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});



//Obtener todas orden por id
//URL: http://localhost:3333/administracion/ordenes/:id
router.get('/ordenes/:id', (req, res) => {
    administracion.aggregate([
        {
            "$project": {
                "ordenes": 1.0
            }
        },
        {
            "$unwind": "$ordenes"
        },
        {
            "$match": {
                "ordenes._id": mongoose.Types.ObjectId(req.params.id)
            }
        }
    ])
    .then((ordenes) => {
        res.send(ordenes[0].ordenes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});


//Obtener el producto por su id
//URL: http://localhost:3333/administracion/producto/:id
router.get('/producto/:id', (req, res) => {
    administracion.aggregate([
        {
            "$lookup": {
                "from": "empresas",
                "localField": "ordenes.productos.producto",
                "foreignField": "productos._id",
                "as": "producto"
            }
        },
        {
            "$unwind": "$producto"
        },
        {
            "$unwind": "$producto.productos"
        },
        {
            "$match": {
                "producto.productos._id": mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            "$project": {
                "producto.productos": 1.0
            }
        }
    ])
    .then((producto) => {
        res.send(producto[0].producto.productos);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});


//Obtener las ordenes con estado: "tomada"
//URL: http://localhost:3333/administracion/tomadas
router.get('/tomadas', (req, res) => {
    administracion.aggregate([
        {
            "$project": {
                "ordenes": 1.0
            }
        },
        {
            "$unwind": "$ordenes"
        },
        {
            "$match": {
                "ordenes.estado": "tomada"
            }
        }
    ])
    .then((ordenes) => {
        res.send(ordenes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener las ordenes con estado: "en el origen"
//URL: http://localhost:3333/administracion/origen
router.get('/origen', (req, res) => {
    administracion.aggregate([
        {
            "$project": {
                "ordenes": 1.0
            }
        },
        {
            "$unwind": "$ordenes"
        },
        {
            "$match": {
                "ordenes.estado": "en el origen"
            }
        }
    ])
    .then((ordenes) => {
        res.send(ordenes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener las ordenes con estado: "en camino"
//URL: http://localhost:3333/administracion/camino
router.get('/camino', (req, res) => {
    administracion.aggregate([
        {
            "$project": {
                "ordenes": 1.0
            }
        },
        {
            "$unwind": "$ordenes"
        },
        {
            "$match": {
                "ordenes.estado": "en camino"
            }
        }
    ])
    .then((ordenes) => {
        res.send(ordenes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener las ordenes con estado: "en el destino"
//URL: http://localhost:3333/administracion/destino
router.get('/destino', (req, res) => {
    administracion.aggregate([
        {
            "$project": {
                "ordenes": 1.0
            }
        },
        {
            "$unwind": "$ordenes"
        },
        {
            "$match": {
                "ordenes.estado": "en el destino"
            }
        }
    ])
    .then((ordenes) => {
        res.send(ordenes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Actualizar el estado de una orden
//URL: http://localhost:3333/administracion/ordenes/:id
router.put('/ordenes/:id', (req, res) => {
    administracion.updateOne(
        {
            "ordenes._id": mongoose.Types.ObjectId(req.params.id)
        },
        {
            "$set": {
                "ordenes.$.estado": req.body.estado
            }
        }
    )
    .then((ordenes) => {
        res.send(ordenes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Actualizar la factura de una orden
//URL: http://localhost:3333/administracion/orden/:id/factura
router.put('/orden/:id/factura', (req, res) => {
    administracion.updateOne(
        {
            "ordenes._id": mongoose.Types.ObjectId(req.params.id)
        },
        {
            "$set": {
                "ordenes.$.factura": {
                    "subtotal": req.body.subtotal,
                    "total": req.body.total,
                    "comision": {
                        "motorista": req.body.comision.motorista,
                        "adm": req.body.comision.adm
                    }
                }
            }
        }
    )
    .then((ordenes) => {
        res.send(ordenes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});


//Agregar una orden
//URL: http://localhost:3333/administracion/ordenes
router.post('/ordenes/', (req, res) => {
    let id = mongoose.Types.ObjectId();
    administracion.updateOne(
        {
            "$push": {
                "ordenes": {
                    "_id": id,
                    "estado": "tomada",
                    "direccion": {
                        "altitud": 14.123456,
                        "latitud": -87.123456,
                    },
                    "productos": [],
                    "factura": {
                        "tarjeta": 'random',
                        "numeroTarjeta": '2345678',
                        "fechaVencimiento": '12/12/2020',
                        "codigoSeguridad": '123',
                        "nombreTitular": 'Juan Perez',
                        "subtotal": 0.0,
                        "total": 0.0,
                        "comision": {
                            "motorista": 0.0,
                            "adm": 0.0
                        }
                }
            }
        }
    })
    .then((ordenes) => {
        //Enviar el id de la orden creada junto ordenes
        res.send({
            id: id,
            ordenes: ordenes
        });
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Agregar un producto a una orden
//URL: http://localhost:3333/administracion/ordenes/:id/producto/:idProducto
router.put('/ordenes/:idOrden/producto/:idProducto', (req, res) => {
    administracion.updateOne(
        {
            "ordenes._id": mongoose.Types.ObjectId(req.params.idOrden)
        },
        {
            "$push": {
                "ordenes.$.productos": {
                    "producto": mongoose.Types.ObjectId(req.params.idProducto),
                    "cantidad": Number(req.body.cantidad)
                }
            }
        }
    )
    .then((ordenes) => {
        res.send(ordenes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Eliminar un producto de una orden
//URL: http://localhost:3333/administracion/ordenes/:idOrden/producto/:idProducto
router.delete('/ordenes/:idOrden/producto/:idProducto', (req, res) => {
    administracion.updateOne(
        {
            "ordenes._id": mongoose.Types.ObjectId(req.params.idOrden)
        },
        {
            "$pull": {
                "ordenes.$.productos": {
                    "producto": {
                        "$eq": mongoose.Types.ObjectId(req.params.idProducto)
                    }
                }
            }
        }
    )
    .then((ordenes) => {
        res.send(ordenes);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

module.exports = router;