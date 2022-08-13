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



//Obtener todas las ordenes tomadas
//URL: http://localhost:3333/administracion/ordenes/tomadas
router.get('/ordenes/tomadas', (req, res) => {
    administracion.aggregate([
        {
            "$project": { "ordenes._id": 1, "ordenes.estado": 1 }
        }
    ])
    .then((ordenes) => {
        var ordenesTomadas = [];
        for (var i = 0; i < ordenes[0].ordenes.length; i++) {
            if(ordenes[0].ordenes[i].estado == "tomada"){
                ordenesTomadas.push(ordenes[0].ordenes[i]);
            }
        }
        res.send(ordenesTomadas);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener todas las ordenes en el origen
//URL: http://localhost:3333/administracion/ordenes/origen
router.get('/ordenes/origen', (req, res) => {
    administracion.aggregate([
        {
            "$project": { "ordenes._id": 1, "ordenes.estado": 1 }
        }
    ])
    .then((ordenes) => {
        var ordenesOrigen = [];
        for (var i = 0; i < ordenes[0].ordenes.length; i++) {
            if(ordenes[0].ordenes[i].estado == "en el origen"){
                ordenesOrigen.push(ordenes[0].ordenes[i]);
            }
        }
        res.send(ordenesOrigen);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener todas las ordenes en el destino
//URL: http://localhost:3333/administracion/ordenes/destino
router.get('/ordenes/destino', (req, res) => {
    administracion.aggregate([
        {
            "$project": { "ordenes._id": 1, "ordenes.estado": 1 }
        }
    ])
    .then((ordenes) => {
        var ordenesDestino = [];
        for (var i = 0; i < ordenes[0].ordenes.length; i++) {
            if(ordenes[0].ordenes[i].estado == "en el destino"){
                ordenesDestino.push(ordenes[0].ordenes[i]);
            }
        }
        res.send(ordenesDestino);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Obtener todas las ordenes en camino
//URL: http://localhost:3333/administracion/ordenes/camino
router.get('/ordenes/camino', (req, res) => {
    administracion.aggregate([
        {
            "$project": { "ordenes._id": 1, "ordenes.estado": 1 }
        }
    ])
    .then((ordenes) => {
        var ordenesCamino = [];
        for (var i = 0; i < ordenes[0].ordenes.length; i++) {
            if(ordenes[0].ordenes[i].estado == "en camino"){
                ordenesCamino.push(ordenes[0].ordenes[i]);
            }
        }
        res.send(ordenesCamino);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

module.exports = router;