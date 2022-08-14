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
                "localField": "ordenes.productos",
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

//Eliminar producto de la orden por id
//URL: http://localhost:3333/administacion/orden/:idOrden/product/:idProducto
router.delete('/orden/:idOrden/product/:idProducto', (req, res) => {
    administracion.updateOne(
        {
            "ordenes._id": mongoose.Types.ObjectId(req.params.idOrden)
        },
        {
            "$pull": {
                "ordenes.$.productos": {
                    "_id": mongoose.Types.ObjectId(req.params.idProducto)
                }
            }
        }
    )
    .then((orden) => {
        res.send(orden);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});




module.exports = router;