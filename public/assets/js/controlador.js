var administracion = true;
var ordenSeleccionadaActualmente = null;
var clienteSeleccionadoActualmente = null;
var llamadoDesde = null;
var empresaSeleccionadaActualmente = null;

//Modales
var modalEditarClienteAdministrador = new bootstrap.Modal("#modalEditarClienteAdministrador");
var modalEditorOrdenAdministracion = new bootstrap.Modal("#modalEditorOrdenAdministracion");
var modalEditorProductoAdministracion = new bootstrap.Modal("#modalEditorProductoAdministracion");
var modalListarProductosAdministracion = new bootstrap.Modal("#modalListarProductosAdministracion");
const modalEditorEmpresasAdministracion = new bootstrap.Modal("#modalEditorEmpresasAdministracion");

//Divs para rellenar con los datos obtenidos
const divClientesAdministracion = document.getElementById("contenido-clientes-administracion");
const clienteAdministracionModal = document.getElementById("cliente-administracion-modal");
const modalEditorOrdenAdministracionLabel = document.getElementById("modalEditorOrdenAdministracionLabel");
const tablaModalEditorOrdenAdministracion = document.getElementById("tablaModalEditorOrdenAdministracion");
const divContenidoProveedores  = document.getElementById("div-contenido-proveedores");

var estados = [
    "en el origen",
    "en camino",
    "tomada",
    "en el destino"
]
var imagenesProductos = [
    "pizza-pepperoni.jpg",
    "plato-pasta.jpg",
    "subway-club.jpg",
    "subway-melt.jpg",
    "subway-tuna.jpg",
    "subway-veggie-delite.jpg",
    "whooper-jr.jpg",
    "whooper.jpg"
    ]

const logos = ["burger-king.png","geranium.png","pizza-hut.png","sub-way.png","wendys.png"]
const banners = ["burger-king.jpg","geranium.jpg","pizza-hut.jpg","sub-way.jpg","wendys.jpg"]
const local = ["burger-king.jpg","geranium.jpg","pizza-hut.jpg","sub-way.jpg","wendys.jpg"]

const categoriasAdm = ['tablero', 'ordenes', 'proveedores', 'motoristas'];

if (administracion) {
  llenarClientesAdministracion();
}



function llenarClientesAdministracion() {
  divClientesAdministracion.innerHTML = "";
  divListaOrdenesRecibidas.innerHTML = "";
  fetch(`http://localhost:3333/cliente`)
    .then((res) => res.json())
    .then((clientes) => {
      clientes.forEach((cliente) => {
        divClientesAdministracion.innerHTML += `
                    <!-- Cliente item -->
                    <div class="col-12">
                        <div class="d-flex justify-content-between align-items-center card-administrador p-3">
                            <div class="d-flex align-items-center">
                                <img class="avatar img-perfil" src="assets/img/profile-pics/${cliente.imagen}" />
                                <div class="ms-2">
                                    <h5 class="m-0">${cliente.nombre} ${cliente.apellido}</h5>
                                    <p class="text-break m-0 m-0">${cliente.ordenes.length} Ordenes</p>
                                </div>
                            </div>
                            <div><button class="btn btn-warning btn-sm" type="button" onclick="verInfoCliente('${cliente._id}')">Ver</button></div>
                        </div>
                    </div>
                    <!-- /Cliente item -->
                `;
            cliente.ordenes.forEach((orden) => {
                mostrarOrdenAdministracion(orden).then((infoOrden) => {
                    divListaOrdenesRecibidas.innerHTML +=
                    `
                    <tr>
                        <td>${cliente.nombre}</td>
                        <td>${cliente._id}</td>
                        <td>${infoOrden._id}</td>
                        <td>$${infoOrden.factura.total}</td>
                        <td class="text-success">${infoOrden.estado}</td>
                        <td>
                            <button class="btn btn-warning" onclick="mostrarEditorOrden('${infoOrden._id}','listaOrdenesRecibidas')">Mostrar</button>
                        </td>
                    </tr>
                    `;
                });
                }

                
            );
                
      });
    })
    .catch((err) => console.log(err));
}

function verInfoCliente(idCliente) {
    clienteSeleccionadoActualmente = idCliente;
    llamadoDesde = "clientes";
    let ordenesDiv = "";
    clienteAdministracionModal.innerHTML = "";

    fetch(`http://localhost:3333/cliente/${idCliente}`)
        .then((res) => res.json())
        .then((cliente) => {
            cliente.ordenes.forEach((orden) => {
                fetch(`http://localhost:3333/administracion/ordenes/${orden}`)
                    .then((res) => res.json())
                    .then((orden) => {
                        ordenesDiv += `
                            <tr>
                                <td>${orden._id}</td>
                                <td>$${orden.factura.total}</td>
                                <td>${orden.estado}</td>
                                <td>
                                    <button class="btn btn-warning" type="button" onclick="mostrarEditorOrdenAdministracion('${orden._id}')">Mostrar</button>
                                </td>
                                <td>
                                <button class="btn btn-danger" type="button" onclick="eliminarOrdenAdministracion('${orden._id}')">Eliminar</button>
                            </td>
                            </tr>
                        `;
                        clienteAdministracionModal.innerHTML = `
                                <!--Imagen-->
                                <div class="mb-3">
                                    <label class="form-label" for="imagen-cliente-administracion-modal">Imagen</label>
                                    <img class="avatar img-perfil" src="assets/img/profile-pics/${cliente.imagen}" alt="">
                                    <button class="btn btn-primary" type="button">Editar</button>
                                </div>
                                <!--Nombre-->
                                <div class="mb-3">
                                    <label class="form-label" for="nombre-cliente-administracion-modal">Nombre</label>
                                    <div class="input-group">
                                        <input class="form-control" type="text" id="nombre-cliente-administracion-modal" value="${cliente.nombre}">
                                    </div>
                                </div>
                                <!--Apellido-->
                                <div class="mb-3">
                                    <label class="form-label" for="apellido-cliente-administracion-modal">Apellido</label>
                                    <div class="input-group">
                                        <input class="form-control" type="text" id="apellido-cliente-administracion-modal" value="${cliente.apellido}">
                                    </div>
                                </div>
                                <!--Correo-->
                                <div class="mb-3">
                                    <label class="form-label" for="correo-cliente-administracion-modal">Correo</label>
                                    <div class="input-group">
                                        <input class="form-control" type="email" id="correo-cliente-administracion-modal" value="${cliente.correo}">
                                    </div>
                                </div>
                                <!--Contraseña-->
                                <div class="mb-3">
                                    <label class="form-label" for="contrasena-cliente-administracion-modal">Contraseña</label>
                                    <div class="input-group">
                                        <input class="form-control" type="password" id="contrasena-cliente-administracion-modal" value="${cliente.contraseña}">
                                    </div>
                                </div>
                                <!--Ordenes-->
                                <div class="mb-3">
                                    <label class="form-label" for="productos-administracion-modal">Ordenes</label>
                                    <div class="input-group">
                                        <!--Tabla-->
                                        <div class="table-responsive table-vertical w-100">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>ID Orden</th>
                                                        <th>Total</th>
                                                        <th>Estado</th>
                                                        <th>Conf</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${ordenesDiv}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                `;
                    });

            });
            modalEditarClienteAdministrador.show();
        })

        .catch((err) => console.log(err));

}


function mostrarEditorOrdenAdministracion(idOrden){
    ordenSeleccionadaActualmente = idOrden;
    mostrarOrdenAdministracion(idOrden).then((res) => {
        //Modoficar h5 con id modalEditorOrdenAdministracionLabel
        modalEditorOrdenAdministracionLabel.innerHTML = `Orden #${res._id}`;
        tablaModalEditorOrdenAdministracion.innerHTML = "";
        //Suma de los totales de los productos
        let subtotal = 0;
        res.productos.forEach((idProducto) => {
            let ideProducto = idProducto.producto;
            let cantidadProducto = idProducto.cantidad;
            obtenerProductosID(ideProducto).then((producto) => {
                tablaModalEditorOrdenAdministracion.innerHTML += 
                `
                <tr>
                    <td>${producto._id}</td>
                    <td>${producto.nombre}</td>
                    <td>${cantidadProducto}</td>
                    <td>${producto.precio}</td>
                    <td>${(producto.precio)*(cantidadProducto)}</td>
                    <td><button class="btn btn-danger" type="button" onclick="eliminarProductoOrden('${producto._id}')">Eliminar</button></td>
                    <td><button class="btn btn-primary" type="button" onclick="mostrarProductoAdministracion('${producto._id}')">Mostrar</button></td>
                </tr>
                `;
                subtotal += (producto.precio)*(cantidadProducto);
                isv = subtotal*0.15;
                comision = subtotal*0.05;
                total = subtotal + isv + comision;
                document.getElementById("subTotalOrdenAdm").innerHTML = `$${subtotal}`;
                document.getElementById("isvOrdenAdm").innerHTML = `$${isv}`;
                document.getElementById("comisionOrdenAdm").innerHTML = `$${comision}`;
                document.getElementById("totalOrdenAdm").innerHTML = `$${total}`;
            
            });
            document.getElementById("estado-administracion-modal").innerHTML = `<option value="${res.estado}" selected>${res.estado}</option>`;
            estados.forEach((estado) => {
                if(estado != res.estado){
                    document.getElementById("estado-administracion-modal").innerHTML += `<option value="${estado}">${estado}</option>`;
                }
            });
            
        });
        modalEditorOrdenAdministracion.show();
    });

}


function mostrarOrdenAdministracion(idOrden){
    //Obtener orden por id de forma asincrona y retornarla
    //con async y await
    async function obtenerOrden(){
        const res = await fetch(`http://localhost:3333/administracion/ordenes/${idOrden}`);
        const orden = await res.json();
        return orden;
    }
    const orden = obtenerOrden();
   //Llamado para optener los valores:  mostrarOrdenAdministracion("62f6825eba9dd13936b4762e").then((orden)=>{});
    return orden;
}

function obtenerProductosID(idProducto){
    //Obtener producto por id de forma asincrona y retornarla
    //con async y await
    async function obtenerProducto(){
        const res = await fetch(`http://localhost:3333/administracion/producto/${idProducto}`);
        const producto = await res.json();
        return producto;
    }
    const producto = obtenerProducto();
    return producto;
}


function mostrarProductoAdministracion(idProducto){
    document.getElementById("div-productos-administracion-modal").innerHTML = "";
    obtenerProductosID(idProducto).then((producto) => {
        document.getElementById("div-productos-administracion-modal").innerHTML = 
        `
        <!--Nombre-->
        <div class="mb-3">
            <label class="form-label" for="nombre-administracion-modal">Nombre</label>
            <div class="input-group">
                <input class="form-control" type="text" id="nombre-administracion-modal" value="${producto.nombre}">
            </div>
        </div>
        <!--Precio-->
        <div class="mb-3">
            <label class="form-label" for="precio-administracion-modal">Precio</label>
            <div class="input-group">
                <input class="form-control" type="number" id="precio-administracion-modal" value="${producto.precio}">
            </div>
        </div>
        <!--Imagen del producto y un select al lado-->
        <div class="mb-3">
            <label class="form-label" for="imagen-administracion-modal">Imagen</label>
            <div class="input-group">
                <img id="imagen-administracion-modal" src="assets/img/empresas/productos/${producto.imagen}" alt="Imagen del producto" class="img-fluid" style="max-width: 200px;">
                <select class="form-select" id="select-imagen-administracion-modal" onchange="getValueSelectProductoImagen(this);">
                    <option value="${producto.imagen}" select>${(producto.imagen).substring(0, (producto.imagen).length - 4)}</option>
                </select>
            </div>
        </div>
        `;
        document.getElementById("div-footer-productos-administracion-modal").innerHTML =
        `<button class="btn btn-secundary w-100" type="button"  onclick="editarProducto('${producto._id}')">Guardar</button>`;
        //Imprimir en el select las imagenes menos la que ya tiene el producto
        imagenesProductos.forEach((imagen) => {
            if(imagen != producto.imagen){
                //Omite el .jpg de la imagen para mostrarlo
                let imagenSinJpg = imagen.substring(0, imagen.length - 4);
                document.getElementById("select-imagen-administracion-modal").innerHTML += `<option value="${imagen}">${imagenSinJpg}</option>`;
            }
        });
        modalEditorProductoAdministracion.show();
    });

}


function getValueSelectProductoImagen(select){
    document.getElementById("imagen-administracion-modal").src = `assets/img/empresas/productos/${select.value}`;
}



function editarProducto(idProducto){
    console.log(llamadoDesde);

    //Obtener los valores de los inputs
    let nombre = document.getElementById("nombre-administracion-modal").value;
    let precio = document.getElementById("precio-administracion-modal").value;
    let imagen = document.getElementById("select-imagen-administracion-modal").value;
    //Crear objeto producto
    let producto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen
    };


        //Enviar el objeto producto a la base de datos
        fetch(`http://localhost:3333/empresa/producto/${idProducto}`, {
            method: 'PUT',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            modalEditorProductoAdministracion.hide();
            if (llamadoDesde == "clientes" || llamadoDesde == "listaOrdenesRecibidas") {
                console.log("Llamado desde clientes Editar producto");
                mostrarEditorOrdenAdministracion(ordenSeleccionadaActualmente);
            } else if (llamadoDesde == "proveedores") {
                console.log("Llamado desde proveedores Editar producto");
                mostrarEmpresa(empresaSeleccionadaActualmente);
            }
        });

    

}

function actualizarOrdenAdm(){

    let subTotal = (document.getElementById("subTotalOrdenAdm").innerHTML).substring(1);
    let comision = (document.getElementById("comisionOrdenAdm").innerHTML).substring(1);
    let total = (document.getElementById("totalOrdenAdm").innerHTML).substring(1);

    //El motorista tendra una comision del 30% de la comision, mientras La administracion tendra una comision del 70% de la comision
    let comisionMotorista = (comision * 30) / 100;
    let comisionAdministracion = (comision * 70) / 100;

    let factura = {
        subtotal: subTotal,
        comision: {
            motorista: comisionMotorista,
            adm: comisionAdministracion
        },
        total: total
    };
    console.log(factura);
    //http://localhost:3333/administracion/orden/:id/factura
    fetch(`http://localhost:3333/administracion/orden/${ordenSeleccionadaActualmente}/factura`, {
        method: 'PUT',
        body: JSON.stringify(factura),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        modalEditorOrdenAdministracion.hide();
        actualizarEstadoOrdenAdm();
        if (llamadoDesde == "clientes"){
            console.log("Llamado desde clientes");
            llenarClientesAdministracion();
        }
    });
}


function actualizarEstadoOrdenAdm(){
    //Obtenemos el estado de la orden seleccionado en el select
    let estado = document.getElementById("estado-administracion-modal").value;
    //Actualizamos el estado de la orden
    fetch(`http://localhost:3333/administracion/ordenes/${ordenSeleccionadaActualmente}`, {
        method: 'PUT',
        body: JSON.stringify({estado: estado}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        modalEditorOrdenAdministracion.hide();
        if (llamadoDesde == "clientes"){
            console.log("Llamado desde clientes");
            verInfoCliente(clienteSeleccionadoActualmente);
        } else if (llamadoDesde == "listaOrdenesRecibidas"){
            console.log("Llamado desde lista ordenes recibidas");
            llenarClientesAdministracion();
        }
    });
    
}

function eliminarOrdenAdministracion(idOrden){
    //Eliminar la orden
    fetch(`http://localhost:3333/cliente/${clienteSeleccionadoActualmente}/orden/${idOrden}`, {
        method: 'DELETE'
    }).then((res) => {
        verInfoCliente(clienteSeleccionadoActualmente);
        llenarClientesAdministracion();
    });
}

function actualizarClienteAdm(){
    //Obtenemos los valores de los inputs
    let nombre = document.getElementById("nombre-cliente-administracion-modal").value;
    let apellido = document.getElementById("apellido-cliente-administracion-modal").value;
    let correo = document.getElementById("correo-cliente-administracion-modal").value;
    let contrasena = document.getElementById("contrasena-cliente-administracion-modal").value;

    //Creamos el objeto cliente
    let cliente = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasena: contrasena
    };
    //Actualizamos el cliente
    fetch(`http://localhost:3333/cliente/${clienteSeleccionadoActualmente}`, {
        method: 'PUT',
        body: JSON.stringify(cliente),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        modalEditarClienteAdministrador.hide();
        llenarClientesAdministracion();
    });

}

function agregarOrdenClienteAdm(){
    //Agregamos la orden a la administracion y obtenemos el id de la orden creada
    fetch(`http://localhost:3333/administracion/ordenes`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        //Agregamos la orden al cliente
        fetch(`http://localhost:3333/cliente/${clienteSeleccionadoActualmente}/orden/${data.id}`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            alert("Orden agregada");
            verInfoCliente(clienteSeleccionadoActualmente);
            llenarClientesAdministracion();
        });
    }
    );
}

function agregarProductoOrdenAdministracion(){
    document.getElementById("tablaModalListarProductosAdministracion").innerHTML =""; 

    //Listar las empresas y sus productos
    fetch(`http://localhost:3333/empresa`)
    .then((res) => res.json())
    .then((empresas) => {
        empresas.forEach((empresa) => {
            //Obtener los productos de la empresa
            fetch(`http://localhost:3333/empresa/${empresa._id}/productos`)
            .then((res) => res.json())
            .then((productos) => {
                //Imprimir los productos de la empresa
                productos.forEach((producto) => {
                    document.getElementById("tablaModalListarProductosAdministracion").innerHTML += 
                    `
                        <tr>
                            <td>${producto._id}</td>
                            <td>${empresa.nombre}</td>
                            <td>
                                <div class="d-flex justify-content-center">
                                    <img src="assets/img/empresas/productos/${producto.imagen}" alt="Imagen" style="width: 50px; height: 50px;" class="rounded-2">
                                </div>
                            </td>
                            <td>${producto.nombre}</td>
                            <td>
                                <div class="input-group">
                                    <input class="form-control" type="number" value="1" min="1" max="100" id="cantidadProducto${producto._id}" onchange="multiplicarTotalProducto('cantidadProducto${producto._id}',${producto.precio},'precioTotalProducto${producto._id}')">
                                </div>
                            </td>
                            <td>
                                <div class="input-group">
                                    <input class="form-control" type="text" value="${producto.precio}" id="precioProducto${producto._id}" disabled>
                                </div>
                            </td>
                            <td>
                                <div class="input-group">
                                    <label class="form-check-label" id="precioTotalProducto${producto._id}" disbled>${producto.precio}</label>
                                    </div>
                            </td>
                            <td><button class="btn btn-primary" type="button" onclick="agregarItemOrden('${producto._id}', 'cantidadProducto${producto._id}')">Agregar</button></td>
                            <td><button class="btn btn-secondary" type="button" onclick="mostrarProductoAdministracion('${producto._id}')">Detalles</button></td>
                        </tr>
                    `;
                });
                modalListarProductosAdministracion.show();
            });
        });
    });
}

function multiplicarTotalProducto(idCantidadProducto, precioProducto, divPrecioTotal){
    let cantidadProducto = document.getElementById(idCantidadProducto).value;
    let totalProducto = cantidadProducto * precioProducto;
    document.getElementById(divPrecioTotal).innerHTML = totalProducto;
}

function eliminarProductoOrden(idProducto){
    //Eliminar el producto de la orden
    fetch(`http://localhost:3333/administracion/ordenes/${ordenSeleccionadaActualmente}/producto/${idProducto}`, {
        method: 'DELETE'
    }).then((res) => {
        mostrarEditorOrdenAdministracion(ordenSeleccionadaActualmente);
    });
}

function agregarItemOrden(idProducto, cantidadProducto){
    //http://localhost:3333/administracion/ordenes/:id/producto/:idProducto
    let cantidadPro = document.getElementById(cantidadProducto).value;

    let item = {
        cantidad: cantidadPro,
        idProducto: idProducto
    };

    fetch(`http://localhost:3333/administracion/ordenes/${ordenSeleccionadaActualmente}/producto/${idProducto}`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        alert("Producto agregado");
        mostrarEditorOrdenAdministracion(ordenSeleccionadaActualmente);
    }
    );
}


function llenarCategoriaAdministracion(categoria){
    if (categoria == "tablero") {
    } else 
    if (categoria == "proveedores") {
        divContenidoProveedores.innerHTML = `<button class="btn btn-primary" type="button" onclick="ModalAgregarProveedorAdministracion()">Agregar proveedor</button>`;
        obtenerEmpresas().then((empresas) => {
            empresas.forEach((empresa) => {
                divContenidoProveedores.innerHTML +=
                `
                <div class="col-sm-12 col-md-6 col-xxl-4">
                    <div class="card card-proveedores" onclick="mostrarEmpresa('${empresa._id}')">
                        <img class="card-img-top w-100 d-block img-card-proveedores"
                            src="assets/img/empresas/banners/${empresa.banner}" />
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h4>${empresa.nombre}</h4>
                                    <p>${empresa.descripcion}</p>
                                    <p><i class="fas fa-star icon-reference"></i> 4.8</p>
                                </div><img class="avatar-logo avatar-img" src="assets/img/empresas/logos/${empresa.logo}" />
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
        });
    }
    else if (categoria == 'ordenes'){
        let divOrdenesDisponibles = document.getElementById("div-cont-ordenes-disponibles");
        let divOrdenesTomadas = document.getElementById("div-cont-ordenes-tomadas");
        let divOrdenesCamino= document.getElementById("div-cont-ordenes-camino");
        let divOrdenesEntregadas = document.getElementById("div-cont-ordenes-entregadas");

        //Obtener las ordenes disponibles
        obtenerOrdenesDisponibles().then((ordenes) => {
        divOrdenesDisponibles.innerHTML = "";
            ordenes.forEach((orden) => {
                orden = orden.ordenes;
                divOrdenesDisponibles.innerHTML += 

                `
                <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                <div class="orden-card" onclick="editarOrden('${orden._id}')">
                        <div>
                            <h5 class="m-0 text-break">Orden: #${orden._id}</h5>
                            <div class="ms-2">
                                <p class="orden-card-description">${(orden.productos).length} productos</p>
                                <p class="orden-card-description">Latitud: ${orden.direccion.latitud}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-editar-orden-administrador">Abrir</button></div>
                    </div>
                </div>
                `;}
            );
        });

        //Obtener las ordenes tomadas
        obtenerOrdenesTomadas().then((ordenes) => {
            divOrdenesTomadas.innerHTML = "";
            ordenes.forEach((orden) => {
                orden = orden.ordenes;

                divOrdenesTomadas.innerHTML +=
                `
                <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                    <div class="orden-card">
                        <div>
                            <h5 class="m-0 text-break">Orden: #${orden._id}</h5>
                            <div class="ms-2">
                                <p class="orden-card-description">${(orden.productos).length} productos</p>
                                <p class="orden-card-description">Latitud: ${orden.direccion.latitud}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-editar-orden-administrador">Abrir</button></div>
                    </div>
                </div>
                `;
            });
        });

        //Obtener las ordenes en camino
        obtenerOrdenesEnCamino().then((ordenes) => {
            divOrdenesCamino.innerHTML = "";
            ordenes.forEach((orden) => {
                orden = orden.ordenes;
                divOrdenesCamino.innerHTML +=
                `
                <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                    <div class="orden-card">  
                        <div>
                            <h5 class="m-0 text-break">Orden: #${orden._id}</h5>
                            <div class="ms-2">
                                <p class="orden-card-description">${(orden.productos).length} productos</p>
                                <p class="orden-card-description">Latitud: ${orden.direccion.latitud}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-editar-orden-administrador">Abrir</button></div>
                    </div>
                </div>
                `;
            });
        });

        //Obtener las ordenes entregadas
        obtenerOrdenesEntregadas().then((ordenes) => {
            divOrdenesEntregadas.innerHTML = "";
            ordenes.forEach((orden) => {
                orden = orden.ordenes;
                divOrdenesEntregadas.innerHTML +=
                `
                <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                    <div class="orden-card">
                        <div>
                            <h5 class="m-0 text-break">Orden: #${orden._id}</h5>
                            <div class="ms-2">
                                <p class="orden-card-description">${(orden.productos).length} productos</p>
                                <p class="orden-card-description">Latitud: ${orden.direccion.latitud}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-editar-orden-administrador">Abrir</button></div>
                    </div>
                </div>
                `;
            });
        });


    } else 
    if (categoria == 'motoristas'){
        let divMotoristasPendientes = document.getElementById("div-cont-motoristas-pendientes");
        let divMotoristasAprobados = document.getElementById("div-cont-motoristas-aprobados");
        let divMotoristasRechazados = document.getElementById("div-cont-motoristas-rechazados");

        //Obtener los motoristas pendientes
        obtenerMotoristasPendientes().then((motoristas) => {
            divMotoristasPendientes.innerHTML = "";
            motoristas.forEach((idMotorista) => {
                obtenerMotoristaID(idMotorista).then((motorista) => {
                    divMotoristasPendientes.innerHTML +=
                    `
                    <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                    <div class="orden-card">
                        <div>
                            <h5 class="m-0 text-break">${motorista.nombre} ${motorista.apellido}</h5>
                            <div class="ms-2">
                                <p class="orden-card-description">ID: ${motorista._id}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-editar-motorista">Abrir</button></div>
                    </div>
                </div>
                    `;
                });
            });
        });

        //Obtener los motoristas aprobados
        obtenerMotoristasAprobados().then((motoristas) => {
            divMotoristasAprobados.innerHTML = "";
            motoristas.forEach((idMotorista) => {
                obtenerMotoristaID(idMotorista).then((motorista) => {
                    divMotoristasAprobados.innerHTML +=
                    `
                    <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                    <div class="orden-card">
                        <div>
                            <h5 class="m-0 text-break">${motorista.nombre} ${motorista.apellido}</h5>
                            <div class="ms-2">
                                <p class="orden-card-description">ID: ${motorista._id}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-editar-motorista">Abrir</button></div>
                    </div>
                </div>
                    `;
                });
            });
        });

        //Obtener los motoristas rechazados
        obtenerMotoristasRechazados().then((motoristas) => {
            divMotoristasRechazados.innerHTML = "";
            motoristas.forEach((idMotorista) => {
                obtenerMotoristaID(idMotorista).then((motorista) => {
                    divMotoristasRechazados.innerHTML +=
                    `
                    <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                    <div class="orden-card">
                        <div>
                            <h5 class="m-0 text-break">${motorista.nombre} ${motorista.apellido}</h5>
                            <div class="ms-2">
                                <p class="orden-card-description">ID: ${motorista._id}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-editar-motorista">Abrir</button></div>
                    </div>
                </div>
                    `;
                });
            });
        });
    }
}
        



function obtenerEmpresas(){
    //Utilizar el fetch para obtener las empresas
    //async await
    async function obtenerEmpresasAdm(){
        const res = await fetch(`http://localhost:3333/empresa`);
        const empresas = await res.json();
        return empresas;
    }
    const empresas = obtenerEmpresasAdm();
    return empresas;
}

function obtenerEmpresaId(idEmpresa){
    //Utilizar el fetch para obtener las empresas
    //async await
    async function obtenerEmpresaIdAdm(){
        const res = await fetch(`http://localhost:3333/empresa/${idEmpresa}`);
        const empresa = await res.json();
        return empresa;
    }
    const empresa = obtenerEmpresaIdAdm();
    return empresa;
}

function mostrarEmpresa(idEmpresa){
    let nombreEmpresa = document.getElementById("nombre-empresas-administracion-modal");
    let correoEmpresa = document.getElementById("correo-empresas-administracion-modal");
    let telefonoEmpresa = document.getElementById("telefono-empresas-administracion-modal");
    let contrasenaEmpresa = document.getElementById("contrasena-empresas-administracion-modal");
    let descripcionEmpresa = document.getElementById("descripcion-empresas-administracion-modal");
    let selectImagenBannerEmpresa = document.getElementById("select-imagen-banner-empresas-administracion-modal");
    let selectImagenLogoEmpresa = document.getElementById("select-logo-empresa-administracion-modal");
    let selectImagenLocalEmpresa = document.getElementById("select-imagen-local-empresas-administracion-modal");
    let imagenLocalEmpresaAdm = document.getElementById("imagen-local-empresas-administracion-modal");
    let imagenBannerEmpresaAdm = document.getElementById("imagen-banner-empresas-administracion-modal");
    let imagenLogoEmpresaAdm = document.getElementById("logo-empresa-administracion-modal");
    selectImagenLogoEmpresa.innerHTML = ``;
    selectImagenBannerEmpresa.innerHTML = ``;
    selectImagenLocalEmpresa.innerHTML = ``;
    if (idEmpresa != null){
        empresaSeleccionadaActualmente = idEmpresa;
        llamadoDesde = 'proveedores';
        modalEditorEmpresasAdministracion.show();
        obtenerEmpresaId(idEmpresa).then((empresa) => {
            
            document.getElementById('modalEditorEmpresasAdministracionLabel').innerHTML = `Empresa`;

            nombreEmpresa.value = empresa.nombre;
            correoEmpresa.value = empresa.correo;
            telefonoEmpresa.value = empresa.telefono;
            contrasenaEmpresa.value = empresa.contrasena;
            descripcionEmpresa.value = empresa.descripcion;
            imagenLogoEmpresaAdm.src = `assets/img/empresas/logos/${empresa.logo}`;
            imagenBannerEmpresaAdm.src = `assets/img/empresas/banners/${empresa.banner}`;
            imagenLocalEmpresaAdm.src = `assets/img/empresas/local/${empresa.local}`;
    
            //Llenar los select con las imagenes
            //Logo
            //Llenar el select de los logos, y seleccionar el logo actual

    
            logos.forEach((logo) => {
                if(logo == empresa.logo){
                    selectImagenLogoEmpresa.innerHTML += `<option value="${logo}" selected>${logo}</option>`;
                }
                else{
                    selectImagenLogoEmpresa.innerHTML += `<option value="${logo}">${logo}</option>`;
                }
            });
            //Banner
            //Llenar el select de los banners, y seleccionar el banner actual
            banners.forEach((banner) => {
                if(banner == empresa.banner){
                    selectImagenBannerEmpresa.innerHTML += `<option value="${banner}" selected>${banner}</option>`;
                }
                else{
                    selectImagenBannerEmpresa.innerHTML += `<option value="${banner}">${banner}</option>`;
                }
            });
            //Local
            //Llenar el select de los locales, y seleccionar el local actual
            local.forEach((local) => {
                if(local == empresa.local){
                    selectImagenLocalEmpresa.innerHTML += `<option value="${local}" selected>${local}</option>`;
                }
                else{
                    selectImagenLocalEmpresa.innerHTML += `<option value="${local}">${local}</option>`;
                }
            });
            tablaModalListarProductosEmpresaAdministracion.innerHTML = ``;
            empresa.productos.forEach((producto) => {
                tablaModalListarProductosEmpresaAdministracion.innerHTML += `
                <tr>
                    <td>${producto._id}</td>
                    <td>
                        <div class="d-flex justify-content-center align-items-center">
                            <img class="rounded-2" src="assets/img/empresas/productos/${producto.imagen}" width="50px" height="50px" alt="Imagen ${producto.nombre}">
                        </div>
                    </td>
                    <td>${producto.nombre}</td>
                    <td>$${producto.precio}</td>
                    <td>
                        <button class="btn btn-primary" type="button" onclick="mostrarProductoAdministracion('${producto._id}')">Mostrar</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" type="button" onclick="eliminarProductoEmpresa('${producto._id}')">Eliminar</button>
                    </td>
                </tr>
                `;
            });
            document.getElementById('divAgregarProductoEmpresa').innerHTML = 
            `
            <button class="btn btn-primary" type="button" onclick="modalAgregarProductoEmpresa('${idEmpresa}')">Agregar Producto</button>
            `;
        document.getElementById('div-footer-empresas-administracion-modal').innerHTML =
        `
        <div class="row w-100">
            <div class="col-6">
                <button class="btn btn-primary w-100" type="button" onclick="actualizarEmpresa()">Guardar</button>
            </div>
            <div class="col-6">
                <button class="btn btn-danger w-100" type="button" onclick="eliminarProveedor()">Eliminar</button>
            </div>
        </div>
        `;
        });
    }else{
        //Agregar texto a h5
        document.getElementById('modalEditorEmpresasAdministracionLabel').innerHTML = `Crear Empresa`;
        nombreEmpresa.value = "";
        correoEmpresa.value = "";
        telefonoEmpresa.value = "";
        contrasenaEmpresa.value = "";
        descripcionEmpresa.value = "";

        logos.forEach((logo) => {
            selectImagenLogoEmpresa.innerHTML += `<option value="${logo}">${logo}</option>`;
        });
        banners.forEach((banner) => {
            selectImagenBannerEmpresa.innerHTML += `<option value="${banner}">${banner}</option>`;
        });
        local.forEach((local) => {
            selectImagenLocalEmpresa.innerHTML += `<option value="${local}">${local}</option>`;
        });
    
        document.getElementById('tablaModalListarProductosEmpresaAdministracion').innerHTML = ``;

        document.getElementById('div-footer-empresas-administracion-modal').innerHTML =
        `
        <button class="btn btn-success w-100" type="button" onclick="agregarEmpresa()">Agregar empresa</button>
        `;
        modalEditorEmpresasAdministracion.show();
    }
    
}

function obtenerOrdenesDisponibles(){
    //Utilizar el fetch para obtener las empresas
    //async await
    async function obtenerOrdenesDisponiblesAdm(){
        const res = await fetch(`http://localhost:3333/administracion/origen`);
        const ordenes = await res.json();
        return ordenes;
    }
    const ordenes = obtenerOrdenesDisponiblesAdm();
    return ordenes;
}

function obtenerOrdenesTomadas(){
    //Utilizar el fetch para obtener las empresas
    //async await
    async function obtenerOrdenesTomadasAdm(){
        const res = await fetch(`http://localhost:3333/administracion/tomadas`);
        const ordenes = await res.json();
        return ordenes;
    }
    const ordenes = obtenerOrdenesTomadasAdm();
    return ordenes;
}

function obtenerOrdenesEnCamino(){
    //Utilizar el fetch para obtener las empresas
    //async await
    async function obtenerOrdenesEnCaminoAdm(){
        const res = await fetch(`http://localhost:3333/administracion/camino`);
        const ordenes = await res.json();
        return ordenes;
    }
    const ordenes = obtenerOrdenesEnCaminoAdm();
    return ordenes;
}

function obtenerOrdenesEntregadas(){
    //Utilizar el fetch para obtener las empresas
    //async await
    async function obtenerOrdenesEntregadasAdm(){
        const res = await fetch(`http://localhost:3333/administracion/destino`);
        const ordenes = await res.json();
        return ordenes;
    }
    const ordenes = obtenerOrdenesEntregadasAdm();
    return ordenes;
}

function obtenerMotoristasPendientes(){
    //Utilizar el fetch para obtener las empresas
    //async await
    async function obtenerMotoristasPendientesAdm(){
        const res = await fetch(`http://localhost:3333/administracion/motorista/pendientes`);
        const motoristas = await res.json();
        return motoristas;
    }
    const motoristas = obtenerMotoristasPendientesAdm();
    return motoristas;
}

function obtenerMotoristasAprobados(){
    //Utilizar el fetch para obtener las empresas
    //async await
    async function obtenerMotoristasAprobadosAdm(){
        const res = await fetch(`http://localhost:3333/administracion/motorista/aprobados`);
        const motoristas = await res.json();
        return motoristas;
    }
    const motoristas = obtenerMotoristasAprobadosAdm();
    return motoristas;
}

function obtenerMotoristasRechazados(){
    //Utilizar el fetch para obtener las empresas
    //async await
    async function obtenerMotoristasRechazadosAdm(){
        const res = await fetch(`http://localhost:3333/administracion/motorista/rechazados`);
        const motoristas = await res.json();
        return motoristas;
    }
    const motoristas = obtenerMotoristasRechazadosAdm();
    return motoristas;
}

function obtenerMotoristaID(idMotorista){
    //Utilizar el fetch para obtener las empresas
    //async await
    async function obtenerMotoristaIDAdm(){
        const res = await fetch(`http://localhost:3333/motorista/${idMotorista}`);
        const motorista = await res.json();
        return motorista;
    }
    const motorista = obtenerMotoristaIDAdm();
    return motorista;
}


function editarOrden(idOrden){
    modalEditorOrdenAdministracionLabel.innerHTML = `Orden #${idOrden}`;
    tablaModalEditorOrdenAdministracion.innerHTML = "";

    mostrarOrdenAdministracion(idOrden).then((orden) => {
        let productos = orden.productos;
        productos.forEach((producto) => {
            obtenerProductosID(producto.producto).then((producto) => {
                console.log(producto)
            });
        });
    });

    

    //Suma de los totales de los productos
    let subtotal = 0;
    modalEditorOrdenAdministracion.show();
}

function mostrarEditorOrden(idOrden, llamado){
    llamadoDesde = llamado;
    mostrarEditorOrdenAdministracion(idOrden);
}

function mostrarEditorProducto(idProducto, llamado){
    llamadoDesde = llamado;
    mostrarProductoAdministracion(idProducto);
}

function cambioDeLogo(imagen){
    document.getElementById("logo-empresa-administracion-modal").src = `assets/img/empresas/logos/${imagen.value}`;
}

function cambioDeBanner(imagen){
    document.getElementById("imagen-banner-empresas-administracion-modal").src = `assets/img/empresas/banners/${imagen.value}`;
}

function cambioDeLocal(imagen){
    document.getElementById("imagen-local-empresas-administracion-modal").src = `assets/img/empresas/local/${imagen.value}`;
}

function modalAgregarProductoEmpresa(idEmpresa){
    document.getElementById("select-imagen-administracion-modal").innerHTML = '';
    document.getElementById("nombre-administracion-modal").value = "Nombre del nuevo Producto";
    document.getElementById("precio-administracion-modal").value = "1";

    imagenesProductos.forEach((imagen) => {
        document.getElementById("select-imagen-administracion-modal").innerHTML += `
            <option value="${imagen}">${imagen}</option>
        `;
    });

    document.getElementById("div-footer-productos-administracion-modal").innerHTML =
    `<button class="btn btn-secundary w-100" type="button"  onclick="agregarProductoEmpresa()">Guardar</button>`;
    modalEditorProductoAdministracion.show();

}


function agregarProductoEmpresa(){
    let nombre = document.getElementById("nombre-administracion-modal").value;
    let precio = document.getElementById("precio-administracion-modal").value;
    let imagen = document.getElementById("select-imagen-administracion-modal").value;

    let producto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen
    }
    //Verificar que los campos esten correctos
    if(nombre == "" || precio == "" || imagen == ""){
        alert("Debe llenar todos los campos");
    }else{
        //agregar el producto a la base de datos
        fetch(`http://localhost:3333/empresa/${empresaSeleccionadaActualmente}/producto`, {
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(res.status == 200){
                alert("Producto agregado correctamente");
                mostrarEmpresa(empresaSeleccionadaActualmente);
                modalEditorProductoAdministracion.hide();
            }else{
                alert("Error al agregar el producto");
            }
        });
    }
}

function eliminarProductoEmpresa(idProducto){
    fetch(`http://localhost:3333/empresa/${empresaSeleccionadaActualmente}/producto/${idProducto}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if(res.status == 200){
            alert("Producto eliminado correctamente");
            mostrarEmpresa(empresaSeleccionadaActualmente);
        }else{
            alert("Error al eliminar el producto");
        }
    });
}

function actualizarEmpresa(){
    let nombreEmpresa = document.getElementById("nombre-empresas-administracion-modal");
    let correoEmpresa = document.getElementById("correo-empresas-administracion-modal");
    let telefonoEmpresa = document.getElementById("telefono-empresas-administracion-modal");
    let contrasenaEmpresa = document.getElementById("contrasena-empresas-administracion-modal");
    let descripcionEmpresa = document.getElementById("descripcion-empresas-administracion-modal");
    let selectImagenBannerEmpresa = document.getElementById("select-imagen-banner-empresas-administracion-modal");
    let selectImagenLogoEmpresa = document.getElementById("select-logo-empresa-administracion-modal");
    let selectImagenLocalEmpresa = document.getElementById("select-imagen-local-empresas-administracion-modal");

    let empresa = {
        nombre: nombreEmpresa.value,
        correo: correoEmpresa.value,
        telefono: telefonoEmpresa.value,
        contraseña: contrasenaEmpresa.value,
        descripcion: descripcionEmpresa.value,
        banner: selectImagenBannerEmpresa.value,
        logo: selectImagenLogoEmpresa.value,
        local: selectImagenLocalEmpresa.value
    }

    fetch(`http://localhost:3333/empresa/${empresaSeleccionadaActualmente}`, {
        method: 'PUT',
        body: JSON.stringify(empresa),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if(res.status == 200){
            llenarCategoriaAdministracion('proveedores');
            modalEditorEmpresasAdministracion.hide();
        }else{
            alert("Error al actualizar la empresa");
        }
    });
}

function ModalAgregarProveedorAdministracion(){

    mostrarEmpresa();
}

function eliminarProveedor(){
    fetch(`http://localhost:3333/empresa/${empresaSeleccionadaActualmente}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if(res.status == 200){
            llenarCategoriaAdministracion('proveedores');
            modalEditorEmpresasAdministracion.hide();
        }else{
            alert("Error al eliminar la empresa");
        }
    });
}

function agregarEmpresa(){
    let nombreEmpresa = document.getElementById("nombre-empresas-administracion-modal");
    let correoEmpresa = document.getElementById("correo-empresas-administracion-modal");
    let telefonoEmpresa = document.getElementById("telefono-empresas-administracion-modal");
    let contrasenaEmpresa = document.getElementById("contrasena-empresas-administracion-modal");
    let descripcionEmpresa = document.getElementById("descripcion-empresas-administracion-modal");
    let selectImagenBannerEmpresa = document.getElementById("select-imagen-banner-empresas-administracion-modal");
    let selectImagenLogoEmpresa = document.getElementById("select-logo-empresa-administracion-modal");
    let selectImagenLocalEmpresa = document.getElementById("select-imagen-local-empresas-administracion-modal");

    //Comprobar que los campos esten llenos
    if(nombreEmpresa.value == "" || correoEmpresa.value == "" || telefonoEmpresa.value == "" || contrasenaEmpresa.value == "" || descripcionEmpresa.value == "" || selectImagenBannerEmpresa.value == "" || selectImagenLogoEmpresa.value == "" || selectImagenLocalEmpresa.value == ""){
        alert("Debe llenar todos los campos");
    }
    //Verificar que el correo sea valido con una expresion regular
    else if(!correoEmpresa.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        alert("El correo no es valido");
    }
    //Verificar que el telefono sea valido con una expresion regular, debe comenzar con "+504" y tener 8 digitos
    else if(!telefonoEmpresa.value.match(/^\+504[0-9]{8}$/)){
        alert("El telefono no es valido. Debe comenzar con +504 y tener 8 digitos");
    }
    //Verificar que la contraseña sea valida con una expresion regular, debe tener al menos 8 caracteres, y al menos una letra mayuscula, una minuscula y un numero
    else if(!contrasenaEmpresa.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)){
        alert("La contraseña no es valida\n Debe tener al menos 8 caracteres, y al menos una letra mayuscula, una minuscula y un numero");
    }else{
    //Agregar la empresa a la base de datos
        fetch(`http://localhost:3333/empresa`, {
            method: 'POST',
            body: JSON.stringify({
                nombre: nombreEmpresa.value,
                correo: correoEmpresa.value,
                telefono: telefonoEmpresa.value,
                contraseña: contrasenaEmpresa.value,
                descripcion: descripcionEmpresa.value,
                banner: selectImagenBannerEmpresa.value,
                logo: selectImagenLogoEmpresa.value,
                local: selectImagenLocalEmpresa.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(res.status == 200){
                alert("Empresa agregada correctamente");
                llenarCategoriaAdministracion('proveedores');
                modalEditorEmpresasAdministracion.hide();
            }else{
                alert("Error al agregar la empresa");
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}