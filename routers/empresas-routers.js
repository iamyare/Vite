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

//Crear una empresa
//URL: http://localhost:3333/empresa
router.post('/', (req, res) => {
    var empresa = new empresas({
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        contraseña: req.body.contraseña,
        descripcion: req.body.descripcion,
        banner: req.body.banner,
        logo: req.body.logo,
        local: req.body.local,
        productos: [],
        reseñas: []
    });
    empresa.save()
    .then((empresa) => {
        res.send(empresa);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    }
    );
});

//Eliminar una empresa por su id
//URL: http://localhost:3333/empresa/:id
router.delete('/:id', (req, res) => {
    empresas.findByIdAndRemove(req.params.id)
    .then((empresa) => {
        res.send(empresa);
        res.end();
    }).catch((err) => {
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


//Obtener todos los productos de una empresa
//URL: http://localhost:3333/empresa/:id/productos
router.get('/:idEmpresa/productos', (req, res) => {
    empresas.findById(req.params.idEmpresa)
    .then((empresa) => {
        res.send(empresa.productos);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Agregar un producto a una empresa
//URL: http://localhost:3333/empresa/:idEmpresa/producto
router.post('/:idEmpresa/producto', (req, res) => {
    empresas.updateOne(
        { _id: req.params.idEmpresa },
        { $push: {
            productos: {
                _id: mongoose.Types.ObjectId(),
                nombre: req.body.nombre,
                precio: req.body.precio,
                imagen: req.body.imagen
            }
        }
    })
    .then((empresa) => {
        res.send(empresa);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Eliminar un producto de una empresa
//URL: http://localhost:3333/empresa/:idEmpresa/producto/:idProducto
router.delete('/:idEmpresa/producto/:idProducto', (req, res) => {
    empresas.updateOne(
        { _id: req.params.idEmpresa },
        { $pull: {
            productos: {
                _id: mongoose.Types.ObjectId(req.params.idProducto)
            }
        }
    })
    .then((empresa) => {
        res.send(empresa);
        res.end();
    })
    .catch((err) => {
        res.send(err);
        res.end();
    });
});

//Actualizar una empresa
//URL: http://localhost:3333/empresa/:id
router.put('/:id', (req, res) => {
    empresas.updateOne(
        { _id: req.params.id },
        { $set: {
            nombre: req.body.nombre,
            correo: req.body.correo,
            telefono: req.body.telefono,
            descripcion: req.body.descripcion,
            contraseña: req.body.contraseña,
            banner: req.body.banner,
            local: req.body.local,
            logo: req.body.logo
        }
    })
    .then((empresa) => {
        res.send(empresa);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    }
    );
});

//Obtener una empresa por su su categoria
//URL: http://localhost:3333/empresa/categoria/:categoria
router.get('/categoria/:categoria', (req, res) => {
    empresas.find({
        categoria: req.params.categoria
    })
    .then((empresa) => {
        res.send(empresa);
        res.end();
    }).catch((err) => {
        res.send(err);
        res.end();
    }
    );
});

module.exports = router;