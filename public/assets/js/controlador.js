var administracion = true;
var ordenSeleccionadaActualmente = null;
var clienteSeleccionadoActualmente = null;
//Modales
var modalEditarClienteAdministrador = new bootstrap.Modal("#modalEditarClienteAdministrador");
var modalEditorOrdenAdministracion = new bootstrap.Modal("#modalEditorOrdenAdministracion");
var modalEditorProductoAdministracion = new bootstrap.Modal("#modalEditorProductoAdministracion");
var modalListarProductosAdministracion = new bootstrap.Modal("#modalListarProductosAdministracion");

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
                            <button class="btn btn-warning" onclick="mostrarEditorOrdenAdministracion('${infoOrden._id}')">Mostrar</button>
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
        mostrarEditorOrdenAdministracion(ordenSeleccionadaActualmente);
        agregarProductoOrdenAdministracion();
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
        actualizarEstadoOrdenAdm(idOrden);
        llenarClientesAdministracion();
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
        verInfoCliente(clienteSeleccionadoActualmente);
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
        divContenidoProveedores.innerHTML = "";
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
        divOrdenesDisponibles.innerHTML = "";
        obtenerOrdenesDisponibles().then((ordenes) => {
            ordenes.forEach((orden) => {
                orden = orden.ordenes;

                divOrdenesDisponibles.innerHTML += 
                `
                <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                    <div class="orden-card">
                        <div>
                            <h5 class="m-0">Orden: #${orden._id}</h5>
                            <div class="ms-2">
                                <p class="orden-card-description">${(orden.productos).length} productos</p>
                                <p class="orden-card-description">${orden.direccion.latitud}</p>
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
    } else 
    if (categoria == 'motoristas'){
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
    console.log(idEmpresa);
    obtenerEmpresaId(idEmpresa).then((empresa) => {
        console.log(empresa);
    });
}

function obtenerOrdenesDisponibles(){
    //Utilizar el fetch para obtener las empresas
    //async await
    async function obtenerOrdenesDisponiblesAdm(){
        const res = await fetch(`http://localhost:3333/administracion/tomadas`);
        const ordenes = await res.json();
        return ordenes;
    }
    const ordenes = obtenerOrdenesDisponiblesAdm();
    return ordenes;
}