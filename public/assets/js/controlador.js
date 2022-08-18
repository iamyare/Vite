
var administracion = true;
var ordenSeleccionadaActualmente = null;
var clienteSeleccionadoActualmente = null;
var motoristaSeleccionadoActualmente = null;
var carritoSeleccionadoActualmente = null;
var llamadoDesde = null;
var empresaSeleccionadaActualmente = null;
var booleanProductos = false
var subtotal = 0;
var total = 0;
var isv = 0;
var comision = 0;
var subtotalCarrito = 0;
var ISVCarrito = 0;
var comisionCarrito = 0;
var totalCarrito = 0;
var comisionMotoristaCarrito = 0;
var comisionAdministracionCarrito = 0;

var sesionIniciada = false;
//ingresar sesion inciada en el localstorage, si no existe lo creamos, si existe lo actualizamos
function localStorageIniciarSesion(){
    if (localStorage.getItem("sesionIniciada") == null){
        localStorage.setItem("sesionIniciada",false);

    } else {
        sesionIniciada = localStorage.getItem("sesionIniciada");
    }
}

//Creamos un localstorage para guardar la sesion iniciada, correo y contraseña, si no existe lo creamos, si existe lo actualizamos
function localStorageIniciarSesionInfo(correo, contraseña){
    if (localStorage.getItem("sesionIniciada") == null){
        localStorage.setItem("sesionIniciada",false);
        localStorage.setItem("correo",correo);
        localStorage.setItem("contraseña",contraseña);
    } else {
        localStorage.setItem("correo",correo);
        localStorage.setItem("contraseña",contraseña);
    }
}

//Creamos un localstorage para guardar la sesion iniciada, que contendra el _id del cliente seleccionado, si no existe lo creamos, si existe lo actualizamos
function localStorageClienteSeleccionado(idCliente){
    if (localStorage.getItem("sesionIniciada") == null){
        localStorage.setItem("sesionIniciada",false);
        localStorage.setItem("idCliente",idCliente);
    } else {
        localStorage.setItem("idCliente",idCliente);
    }
}

//div Login
var inputContrasena = document.getElementById("inputContrasena");
var inputCorreo = document.getElementById("inputCorreo");


//Modales
const modalEditarClienteAdministrador = new bootstrap.Modal("#modalEditarClienteAdministrador");
const modalEditorOrdenAdministracion = new bootstrap.Modal("#modalEditorOrdenAdministracion");
const modalEditorProductoAdministracion = new bootstrap.Modal("#modalEditorProductoAdministracion");
const modalListarProductosAdministracion = new bootstrap.Modal("#modalListarProductosAdministracion");
const modalEditorEmpresasAdministracion = new bootstrap.Modal("#modalEditorEmpresasAdministracion");
const modalEditorMotoristaAdministracion = new bootstrap.Modal("#modalEditorMotoristaAdministracion");
const modalVisualizarDatosTarjeta = new bootstrap.Modal("#modal-visualizar-datos-tarjeta");
const modalCarrito = new bootstrap.Modal("#modal-carrito");
const modalCategorias = new bootstrap.Modal("#modal-categorias-comida");
const modalProductosEmpresa = new bootstrap.Modal("#modalProductosEmpresa");

//Divs para rellenar con los datos obtenidos
const divClientesAdministracion = document.getElementById("contenido-clientes-administracion");
const clienteAdministracionModal = document.getElementById("cliente-administracion-modal");
const modalEditorOrdenAdministracionLabel = document.getElementById("modalEditorOrdenAdministracionLabel");
const tablaModalEditorOrdenAdministracion = document.getElementById("tablaModalEditorOrdenAdministracion");
const divContenidoProveedores  = document.getElementById("div-contenido-proveedores");

//Inputs Clientes
var imagenCliente = document.getElementById("imagen-cliente-modal-editor-adm");
var nombreCliente = document.getElementById("nombre-cliente-administracion-modal");
var apellidoCliente = document.getElementById("apellido-cliente-administracion-modal");
var correoCliente = document.getElementById("correo-cliente-administracion-modal");
var contrasenaCliente = document.getElementById("contrasena-cliente-administracion-modal");
var selectImagenCliente = document.getElementById("select-imagen-cliente-administracion-modal");

//Input Motorista
var nombreMotorista = document.getElementById("nombre-motorista-administracion-modal");
var apellidoMotorista = document.getElementById("apellido-motorista-administracion-modal");
var correoMotorista = document.getElementById("correo-motorista-administracion-modal");
var contrasenaMotorista = document.getElementById("contrasena-motorista-administracion-modal");
var identificacionMotorista = document.getElementById("id-motorista-administracion-modal");
var divImagenMotorista = document.getElementById("imagen-motorista-administracion-modal");
var selectImagenesMotorista = document.getElementById("select-imagen-motorista-administracion-modal");
var selectAprobadoMotorista = document.getElementById("aprobado-motorista-administracion-modal");
var estadoMotorista = null
var divComisiones = document.getElementById("div-comisiones");

//Inputs tarjeta
var numeroTarjeta = document.getElementById("numero-tarjeta");
var nombreTitular = document.getElementById("nombre-titular");
var fechaVencimiento = document.getElementById("fecha-vencimiento");
var codigoSeguridad = document.getElementById("codigo-seguridad");
var tipoTarjeta = document.getElementById("tipo-tarjeta");

const imagenesClientes = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg"]
var estados = ["en el origen", "en camino", "tomada", "en el destino"]
var imagenesProductos = ["pizza-pepperoni.jpg", "plato-pasta.jpg", "subway-club.jpg", "subway-melt.jpg", "subway-tuna.jpg", "subway-veggie-delite.jpg", "whooper-jr.jpg", "whooper.jpg"]

const tarjetasCredito = ["Visa", "MasterCard", "American Express"];



const logos = ["burger-king.png","geranium.png","pizza-hut.png","sub-way.png","wendys.png"]
const banners = ["burger-king.jpg","geranium.jpg","pizza-hut.jpg","sub-way.jpg","wendys.jpg"]
const local = ["burger-king.jpg","geranium.jpg","pizza-hut.jpg","sub-way.jpg","wendys.jpg"]

const categoriasAdm = ['tablero', 'ordenes', 'proveedores', 'motoristas'];



function visualizarContenido(){
    let url = window.location.href;
    console.log(url);
    if (url.includes("index.html")){
        console.log("index");
    } else if (url.includes("administracion.html")){
        console.log("administracion");
    }
}

visualizarContenido();

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
                    if (infoOrden.factura != undefined) {
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
                    }

                });
                }

                
            );
                
      });
    })
    .catch((err) => console.log(err));
}

function verInfoCliente(idCliente) {

    if (idCliente != null ){

    clienteSeleccionadoActualmente = idCliente;
    llamadoDesde = "clientes";


    fetch(`http://localhost:3333/cliente/${idCliente}`)
        .then((res) => res.json())
        .then((cliente) => {
            nombreCliente.value = cliente.nombre;
            apellidoCliente.value = cliente.apellido;
            correoCliente.value = cliente.correo;
            contrasenaCliente.value = cliente.contraseña;
            imagenCliente.src = `assets/img/profile-pics/${cliente.imagen}`;

            //Llenar el select con las imagenes menos la actual
            selectImagenCliente.innerHTML = "";
            imagenesClientes.forEach((imagen) => {
                if (imagen != cliente.imagen) {
                    selectImagenCliente.innerHTML += `<option value="${imagen}">${imagen}</option>`;
                }else{
                    selectImagenCliente.innerHTML += `<option value="${imagen}" selected>${imagen}</option>`;
                }
            });
            
            ordenesDeClienteAdm.innerHTML = "";
            cliente.ordenes.forEach((orden) => {
                fetch(`http://localhost:3333/administracion/ordenes/${orden}`)
                    .then((res) => res.json())
                    .then((orden) => {
                        ordenesDeClienteAdm.innerHTML += `
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
                    });
            });


            document.getElementById("footer-modal-editar-cliente").innerHTML = 


            `
            <div class="col-4">
            <button class="btn btn-secundary" type="button" onclick="actualizarClienteAdm()">Guardar Cliente</button>
            </div>

            <div class="col-4">
            <button class="btn btn-primary" type="button" onclick="agregarOrdenClienteAdm()">Agregar Orden</button>
            </div>
                  
            <div class="col-4">
            <button class="btn btn-danger" type="button" onclick="eliminarClienteAdm('${cliente._id}')">Eliminar cliente</button>
            </div>
            `;
        })

        .catch((err) => console.log(err));
    }else{

        nombreCliente.value = "";
        apellidoCliente.value = "";
        correoCliente.value = "";
        contrasenaCliente.value = "";
        imagenCliente.src = "assets/img/profile-pics/default.png";

        //Llenar el select
        selectImagenCliente.innerHTML = "";
        imagenesClientes.forEach((imagen) => {
            selectImagenCliente.innerHTML += `<option value="${imagen}">${imagen}</option>`;
        });

        ordenesDeClienteAdm.innerHTML = "";

        document.getElementById("footer-modal-editar-cliente").innerHTML = 
        `
            <div class="col-12">
                <button class="btn btn-primary w-100" type="button" onclick="agregarClienteAdm()">Agregar Cliente</button>
            </div>
        `;
    }

    modalEditarClienteAdministrador.show();

}

function actualizarImagenCliente(){
    imagenCliente.src = `assets/img/profile-pics/${selectImagenCliente.value}`;
}


function mostrarEditorOrdenAdministracion(idOrden){
    ordenSeleccionadaActualmente = idOrden;

    mostrarOrdenAdministracion(idOrden).then((res) => {
        
        //Modoficar h5 con id modalEditorOrdenAdministracionLabel
        modalEditorOrdenAdministracionLabel.innerHTML = `Orden #${res._id}`;
        tablaModalEditorOrdenAdministracion.innerHTML = "";
        document.getElementById("direccion-administracion-modal").value ='';
        document.getElementById("latitud-administracion-modal").value ='';
        document.getElementById("longitud-administracion-modal").value ='';
        document.getElementById("subTotalOrdenAdm").innerHTML = `0`;
        document.getElementById("isvOrdenAdm").innerHTML = `0`;
        document.getElementById("comisionOrdenAdm").innerHTML = `0`;
        document.getElementById("totalOrdenAdm").innerHTML = `0`;
        //Suma de los totales de los productos
        subtotal = 0;
        total = 0;
        isv = 0;
        comision = 0;
        booleanProductos = false;

        if (res.productos.length > 0) {
            booleanProductos = true;
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
            });
        }


        numeroTarjeta.value = res.factura.numeroTarjeta;
        codigoSeguridad.value = res.factura.codigoSeguridad;
        nombreTitular.value = res.factura.nombreTitular;
        fechaVencimiento.value = res.factura.fechaVencimiento;
        console.log('imprimiendo',res);
        document.getElementById("comision-administracion-modal").value = `$${res.factura.comision.adm}`;
        document.getElementById("comision-motorista-modal").value = `$${res.factura.comision.motorista}`;

        //Llenar el select con las tarjetas de credito disponibles, si la orden ya contiene una tarjeta de credito, seleccionarla
        tipoTarjeta.innerHTML = "";
        tarjetasCredito.forEach((tarjeta) => {
            if (res.factura.tarjeta == tarjeta) {
                tipoTarjeta.innerHTML += `<option value="${tarjeta}" selected>${tarjeta}</option>`;
            }else{
                tipoTarjeta.innerHTML += `<option value="${tarjeta}">${tarjeta}</option>`;
            }
        });

        document.getElementById("estado-administracion-modal").innerHTML = ``;
        
        estados.forEach((estado) => {
            if(estado != res.estado){
                document.getElementById("estado-administracion-modal").innerHTML += `<option value="${estado}">${estado}</option>`;
            }else{
                document.getElementById("estado-administracion-modal").innerHTML += `<option value="${res.estado}" selected>${res.estado}</option>`;
            }
        });

         if (res.estado == "en el destino") {
            document.getElementById("motorista-asignado-administracion-modal").disabled = true;
            document.getElementById("boton-visualizar-tarjeta").disabled = true;
            divComisiones.style.display = "block";
        }else{
            document.getElementById("motorista-asignado-administracion-modal").disabled = false;
            document.getElementById("boton-visualizar-tarjeta").disabled = false;
            divComisiones.style.display = "none";

        }



        document.getElementById("direccion-administracion-modal").value = res.direccion.direccion;
        console.log(res.direccion.latitud);
        document.getElementById("latitud-administracion-modal").value = res.direccion.latitud;
        document.getElementById("longitud-administracion-modal").value = res.direccion.longitud;
        
        obtenerMotoristasAprobados().then((motoristas) => {
        document.getElementById("motorista-asignado-administracion-modal").innerHTML = '';


            motoristas.forEach((motorista) => {
                obtenerMotoristaID(motorista).then((motorista) => {
                    console.log(motorista);
                    let ordenAsignadas = motorista.ordenes.tomadas;
                    let ordenesEntregadas = motorista.ordenes.entregadas;

                    console.log(ordenAsignadas);
                    console.log(ordenesEntregadas);
                    //verificar si el motorista ya esta asignado a la orden o si la entrego
                    if(ordenAsignadas.length != 0 && ordenesEntregadas.length != 0){

                        ordenAsignadas.forEach((orden) => {
                            if(orden == idOrden){
                                console.log("asignado a", motorista.nombre);
                                document.getElementById("motorista-asignado-administracion-modal").innerHTML += `<option value="${motorista._id}" selected>${motorista.nombre}</option>`;
                            }
                        });
                        ordenesEntregadas.forEach((orden) => {
                            if(orden == idOrden){
                                console.log("entregado por", motorista.nombre);
                                document.getElementById("motorista-asignado-administracion-modal").innerHTML += `<option value="${motorista._id}" selected>${motorista.nombre} ${motorista.apellido}</option>`;
                            }
                        });
                    }
                    //verificar si el motorista ya esta asignado, entonces no se imprime en el select
                    let motoristas = document.getElementById("motorista-asignado-administracion-modal").innerHTML;
                    if(motoristas.includes(motorista._id)){
                        console.log("ya esta asignado");
                    }else{
                        document.getElementById("motorista-asignado-administracion-modal").innerHTML += 
                        `
                        <option value="${motorista._id}">${motorista.nombre} ${motorista.apellido}</option>
                        `;
                    }
                });
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
            } else if (llamadoDesde == "ordenes") {
                console.log("Llamado desde ordenes Editar producto");
                llenarCategoriaAdministracion('ordenes');
            }
        });

    

}

function actualizarOrdenAdm(){

    let subTotal = (document.getElementById("subTotalOrdenAdm").innerHTML).substring(1);
    let comision = (document.getElementById("comisionOrdenAdm").innerHTML).substring(1);
    let total = (document.getElementById("totalOrdenAdm").innerHTML).substring(1);
    let idMotorista = document.getElementById("motorista-asignado-administracion-modal").value;

    let direccion = document.getElementById("direccion-administracion-modal").value;
    let latitud = document.getElementById("latitud-administracion-modal").value;
    let longitud = document.getElementById("longitud-administracion-modal").value;
    

    //El motorista tendra una comision del 30% de la comision, mientras La administracion tendra una comision del 70% de la comision
    comisionMotorista = (comision * 30) / 100;
    comisionAdministracion = (comision * 70) / 100;
    console.log(comisionMotorista);
    console.log(comisionAdministracion);

    let factura = {
        subtotal: subTotal,
        comision: {
            motorista: comisionMotorista,
            adm: comisionAdministracion
        },
        total: total
    };

    if (booleanProductos) {
        //verificar que los campos no esten vacios
        if(direccion == "" || latitud == "" || longitud == ""){
            alert("Debe ingresar todos los campos de la direccion, latitud y longitud");
        } //verificar que latitud y longitud sean numeros
        else if(isNaN(latitud) || isNaN(longitud)){
            alert("La latitud y longitud deben ser numeros");
        }
        else if (verificarDatosTarjeta()) {


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
                    actualizarDireccionOrden();
                    actualizarTarjeta();


                    //Eliminar orden en el motorista
                    fetch(`http://localhost:3333/motorista/orden/${ordenSeleccionadaActualmente}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((res) => {
                        //Agregar id orden al motorista
                        //Verificamos si esta en el origen 
                        let estado = document.getElementById("estado-administracion-modal").value;
                        if(estado == "en el origen"){
                            llenarOrdenesMotorista();

                        }else if(estado == "en el destino"){
                            //Agregar id orden al motorista
                            fetch(`http://localhost:3333/motorista/${idMotorista}/orden/entregada/${ordenSeleccionadaActualmente}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then((res) => {
                                console.log("Orden agregada al motorista como entregada");
                            llenarOrdenesMotorista();

                            });
                        } else if (estado == "tomada") {
                            //Se agrega la orden al motorista como tomada
                            fetch(`/motorista/${idMotorista}/orden/tomada/${ordenSeleccionadaActualmente}`, {
                                method: 'PUT'
                            }).then((res) => {
                                console.log(res);
                                console.log("Orden agregada al motorista como tomada");
                            llenarOrdenesMotorista();

                            });
                        } else if (estado == "en camino") {
                            //Se agrega la orden al motorista como entregada
                            fetch(`/motorista/${idMotorista}/orden/entregada/${ordenSeleccionadaActualmente}`, {
                                method: 'PUT'
                            }).then((res) => {
                                console.log(res);
                                console.log("Orden agregada al motorista como entregada");
                            llenarOrdenesMotorista();

                            });
                        }

                    }).catch((err) => {
                        console.log(err);
                    });


                    if (llamadoDesde == "clientes"){
                        console.log("Llamado desde clientes");
                        llenarClientesAdministracion();
                    } else if (llamadoDesde == "ordenes"){
                        console.log("Llamado desde Ordenes");
                        llenarCategoriaAdministracion('ordenes');
                    }
                });
            }
        
    } else {
        alert("Debe agregar productos a la orden");
    }
}


function actualizarEstadoOrdenAdm(){
    //Obtenemos el estado de la orden seleccionado en el select
    let estado = document.getElementById("estado-administracion-modal").value;

    console.log('Actualizar Estado Orden: ',estado);
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

function actualizarDireccionOrden() {
    let direccion = document.getElementById("direccion-administracion-modal").value;
    let latitud = document.getElementById("latitud-administracion-modal").value;
    let longitud = document.getElementById("latitud-administracion-modal").value;

    let ordenDireccion = {
        direccion: direccion,
        latitud: latitud,
        longitud: longitud
    };

    fetch(`http://localhost:3333/administracion/orden/${ordenSeleccionadaActualmente}/direccion`, {
        method: 'PUT',
        body: JSON.stringify(ordenDireccion),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        modalEditorOrdenAdministracion.hide();
        console.log("Direccion actualizada");
    });


}

function eliminarOrdenAdministracion(idOrden){
    //Eliminar orden en la administracion
    fetch(`http://localhost:3333/administracion/ordenes/${idOrden}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        //Eliminar la orden del cliente
        fetch(`http://localhost:3333/cliente/${clienteSeleccionadoActualmente}/orden/${idOrden}`, {
            method: 'DELETE'
        }).then((res) => {
            verInfoCliente(clienteSeleccionadoActualmente);
            llenarClientesAdministracion();
        });
    }).catch((err) => {
        console.log(err);
    });
}

function actualizarClienteAdm(){
    //Verificar que los campos no esten vacios
    if (nombreCliente.value == "" || apellidoCliente.value == "" || correoCliente.value == "" || contrasenaCliente.value == "") {
        alert("Por favor llene todos los campos");
    } //Verificar que el correo sea valido con expresion regular
    else if (!correoCliente.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        alert("Correo invalido");
    }//Verificar que la contraseña sea valida con una expresion regular, debe tener al menos 8 caracteres, y al menos una letra mayuscula, una minuscula y un numero
    else if (!contrasenaCliente.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
        alert("Contraseña invalida. Debe tener al menos 8 caracteres, una letra mayuscula, una minuscula y un numero");
    } else {

        //Creamos el objeto cliente
        let cliente = {
            nombre: nombreCliente.value,
            apellido: apellidoCliente.value,
            correo: correoCliente.value,
            contraseña: contrasenaCliente.value,
            imagen: selectImagenCliente.value
        };
        //Actualizamos el cliente
        fetch(`http://localhost:3333/cliente/${clienteSeleccionadoActualmente}`, {
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {

            if (llamadoDesde == "landing page"){
                console.log("Llamado desde landing page");
                //recargar la pagina
                location.reload();
            } else{
                modalEditarClienteAdministrador.hide();
                llenarClientesAdministracion();
            }

        });
    }

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
    if (llamadoDesde == "landing page"){
        console.log("Llamado desde landing page");
        fetch(`http://localhost:3333/cliente/carrito/${carritoSeleccionadoActualmente}/producto/${idProducto}`, {
            method: 'DELETE'
        }).then((res) => {
            llenandoCliente();
            modalCarrito.show();
        });
    } else{
            //Eliminar el producto de la orden
        fetch(`http://localhost:3333/administracion/ordenes/${ordenSeleccionadaActualmente}/producto/${idProducto}`, {
            method: 'DELETE'
        }).then((res) => {
            mostrarEditorOrdenAdministracion(ordenSeleccionadaActualmente);
        });
    }
}

function agregarItemOrden(idProducto, cantidadProducto){

    if (llamadoDesde == "empresas"){
        console.log("Llamado desde empresas");
        let item = {
            producto: idProducto,
            cantidad: 1
        }
        //http://localhost:3333/cliente/carrito/:idCarrito/producto/:idProducto
        fetch(`http://localhost:3333/cliente/carrito/${carritoSeleccionadoActualmente}/producto/${idProducto}`, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            llenandoCliente();
            alert("Producto agregado");
        }).catch((err) => {
            console.log(err);
        });

    }else    if (llamadoDesde == "landing page"){
        console.log("Llamado desde landing page");
        let cantidadPro = document.getElementById(cantidadProducto).value;
        let item = {
            producto: idProducto,
            cantidad: cantidadPro
        }
        //http://localhost:3333/cliente/carrito/:idCarrito/producto/:idProducto
        fetch(`http://localhost:3333/cliente/carrito/${carritoSeleccionadoActualmente}/producto/${idProducto}`, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            llenandoCliente();
            modalCarrito.show();
        }).catch((err) => {
            console.log(err);
        });
    } else {
        let cantidadPro = document.getElementById(cantidadProducto).value;

        let item = {
            cantidad: cantidadPro,
            idProducto: idProducto
        };
        //http://localhost:3333/administracion/ordenes/:id/producto/:idProducto
        fetch(`http://localhost:3333/administracion/ordenes/${ordenSeleccionadaActualmente}/producto/${idProducto}`, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            mostrarEditorOrdenAdministracion(ordenSeleccionadaActualmente);
        }
        );
    }
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

        divOrdenesDisponibles.innerHTML = "";
        //Obtener las ordenes disponibles
        obtenerOrdenesDisponibles().then((ordenes) => {
            ordenes.forEach((orden) => {
                orden = orden.ordenes;
                divOrdenesDisponibles.innerHTML += 

                `
                <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                <div class="orden-card">
                        <div>
                            <h5 class="m-0 text-break">Orden: #${orden._id}</h5>
                            <div class="ms-2">
                                <p class="orden-card-description">${(orden.productos).length} productos</p>
                                <p class="orden-card-description">Dirección: ${orden.direccion.direccion}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button" onclick="mostrarEditorOrden('${orden._id}','ordenes')">Abrir</button></div>
                    </div>
                </div>
                `;}
            );
        });

        //Obtener las ordenes tomadas
        obtenerOrdenesTomadas().then((ordenes) => {
            divOrdenesTomadas.innerHTML = "";
            ordenes.forEach((orden) => {
            console.log(orden);

                orden = orden.ordenes;

                divOrdenesTomadas.innerHTML +=
                `
                <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                    <div class="orden-card">
                        <div>
                            <h5 class="m-0 text-break">Orden: #${orden._id}</h5>
                            <div class="ms-2">
                                <p class="orden-card-description">${(orden.productos).length} productos</p>
                                <p class="orden-card-description">Dirección: ${orden.direccion.direccion}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button"
                                onclick="mostrarEditorOrden('${orden._id}','ordenes')">Abrir</button></div>
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
                                <p class="orden-card-description">Dirección: ${orden.direccion.direccion}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button"
                                onclick="mostrarEditorOrden('${orden._id}','ordenes')">Abrir</button></div>
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
                                <p class="orden-card-description">Dirección: ${orden.direccion.direccion}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button"
                                onclick="mostrarEditorOrden('${orden._id}','ordenes')">Abrir</button></div>
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

        divMotoristasPendientes.innerHTML = " ";
        divMotoristasAprobados.innerHTML = " ";
        divMotoristasRechazados.innerHTML = " ";


        //Obtener los motoristas pendientes
        obtenerMotoristasPendientes().then((motoristas) => {
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
                                onclick="editorMotorista('${motorista._id}')">Abrir</button></div>
                    </div>
                </div>
                    `;
                });
            });
        });

        //Obtener los motoristas aprobados
        obtenerMotoristasAprobados().then((motoristas) => {
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
                                onclick="editorMotorista('${motorista._id}')">Abrir</button></div>
                    </div>
                </div>
                    `;
                });
            });
        });

        //Obtener los motoristas rechazados
        obtenerMotoristasRechazados().then((motoristas) => {
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
                                onclick="editorMotorista('${motorista._id}')">Abrir</button></div>
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

function agregarClienteAdm(){
        
    //Verificar que los campos no esten vacios
    if (nombreCliente.value == "" || apellidoCliente.value == "" || correoCliente.value == "" || contrasenaCliente.value == "") {
        alert("Por favor llene todos los campos");
    } //Verificar que el correo sea valido con expresion regular
    else if (!correoCliente.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        alert("Correo invalido");
    }//Verificar que la contraseña sea valida con una expresion regular, debe tener al menos 8 caracteres, y al menos una letra mayuscula, una minuscula y un numero
    else if (!contrasenaCliente.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
        alert("Contraseña invalida. Debe tener al menos 8 caracteres, una letra mayuscula, una minuscula y un numero");
    } else {

        //Agregar el cliente a la base de datos
        fetch(`http://localhost:3333/cliente`, {
            method: 'POST',
            body: JSON.stringify({
                nombre: nombreCliente.value,
                apellido: apellidoCliente.value,
                correo: correoCliente.value,
                contraseña: contrasenaCliente.value,
                imagen: selectImagenCliente.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status == 200) {
                alert("Cliente agregado correctamente");
                modalEditarClienteAdministrador.hide();
                llenarClientesAdministracion();
            } else {
                alert("Error al agregar el cliente");
            }
        });
    }
}

function eliminarClienteAdm(idCliente){
    fetch(`http://localhost:3333/cliente/${idCliente}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if (res.status == 200) {
            alert("Cliente eliminado correctamente");
            modalEditarClienteAdministrador.hide();
            llenarClientesAdministracion();
        } else {
            alert("Error al eliminar el cliente");
        }
    });
}

function getValueSelectMotoristaAprobado(estado){
    estado = estado.value;
    if(estado == "Aprobado"){
        estadoMotorista = "Aprobado";
        divOrdenesMotorista.style.display = "block";
    }else if (estado == "Rechazado"){
        estadoMotorista = "Rechazado";
        divOrdenesMotorista.style.display = "none";
    } else {
        estadoMotorista = "Pendiente";
        divOrdenesMotorista.style.display = "none";
    }
}


function cambioDeEstado(estado){
    if (estado.value == 'en el destino'){
        if (verificarDatosTarjeta()){
            document.getElementById("motorista-asignado-administracion-modal").disabled = true;
            document.getElementById("boton-visualizar-tarjeta").disabled = true;
            divComisiones.style.display = "block";
        }else{
            let estado = document.getElementById("estado-administracion-modal");
            estado.value = "en camino";
            divComisiones.style.display = "none";
        }
    } else
    {
        document.getElementById("motorista-asignado-administracion-modal").disabled = false;
        document.getElementById("boton-visualizar-tarjeta").disabled = false;
        divComisiones.style.display = "none";
    }
}

function cambioDeMotorista(motorista){
    let estado = document.getElementById("estado-administracion-modal");
    if (estado.value == 'en el origen'){
        //cambia tomado
        document.getElementById("estado-administracion-modal").value = "tomada";
    }
}

function verificarDatosTarjeta(){
// verificar que numeroTarjeta, nombreTitular, fechaVencimiento, codigoSeguridad, tipoTarjeta. No esten vacios, ni contengan undefined
    if(numeroTarjeta.value == "" || nombreTitular.value == "" || fechaVencimiento.value == "" || codigoSeguridad.value == "" || tipoTarjeta.value == ""){
        alert("Por favor llene todos los campos de la tarjeta de credito");
        return false;
    }
    //Verificar que el numero de tarjeta sea valido con expresion regular segun el tipo de tarjeta
    else if(tipoTarjeta.value == "Visa" && !numeroTarjeta.value.match(/^4[0-9]{12}(?:[0-9]{3})?$/)){
        alert("Numero de tarjeta invalido");
        //Debe de verse de la forma 4123456789012345
        return false;
    } else if(tipoTarjeta.value == "MasterCard" && !numeroTarjeta.value.match(/^5[1-5][0-9]{14}$/)){
        alert("Numero de tarjeta invalido");
        //Debe de verse de la forma 5123456789012345
        return false;
    } else if(tipoTarjeta.value == "American Express" && !numeroTarjeta.value.match(/^3[47][0-9]{13}$/)){
        alert("Numero de tarjeta invalido");
        //Debe de verse de la forma 341234567890123
        return false;
    } //Verificar que la fecha de vencimiento sea valida con expresion regular
    else if(!fechaVencimiento.value.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)){
        alert("Fecha de vencimiento invalida. Debe de verse de la forma MM/YYYY");
        return false;
    } //Verificar que el codigo de seguridad sea valido con expresion regular
    else if(!codigoSeguridad.value.match(/^[0-9]{3,4}$/)){
        alert("Codigo de seguridad invalido. Debe de verse de la forma XXX o XXXX");
        return false;
    } else {
        console.log("verificar tarjeta");
        return true;
    }

}

function actualizarTarjeta(){

    if (verificarDatosTarjeta()){
        //actualizar factura
        fetch(`/administracion/orden/${ordenSeleccionadaActualmente}/tarjeta`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numeroTarjeta: numeroTarjeta.value,
                nombreTitular: nombreTitular.value,
                fechaVencimiento: fechaVencimiento.value,
                codigoSeguridad: codigoSeguridad.value,
                tarjeta: tipoTarjeta.value
            })
        })
        .then(res => res.json())
        .then(data => {
            modalVisualizarDatosTarjeta.hide();
            tarjetaCorrecta = true;
        });
    }
}


function getValueSelectMotoristaImagen(motorista){
    //Cambiar imagen del motorista 
    document.getElementById("imagen-motorista-administracion-modal").src = `assets/img/profile-pics/${motorista.value}`;
}


function editorMotorista(idMotorista) {

    motoristaSeleccionadoActualmente = idMotorista;


    //Obtener los datos del motorista
    obtenerMotoristaID(idMotorista).then(motorista => {
        //Porner imagen del motorista
        divImagenMotorista.src = `assets/img/profile-pics/${motorista.imagen}`;

        //Llenar los campos con los datos del motorista
        nombreMotorista.value = motorista.nombre;
        apellidoMotorista.value = motorista.apellido;
        correoMotorista.value = motorista.correo;
        contrasenaMotorista.value = motorista.contraseña;
        identificacionMotorista.value = motorista.identificacion;
        modalEditorMotoristaAdministracionLabel.innerHTML = `Motorista #${motorista._id}`;

        //Comprobar si el motorista esta aprobado o no
        obtenerMotoristasAprobados().then(motoristas => {
            if (motoristas.includes(motorista._id)) {
                //Motorista aprobado
                //En el select selectAprobadoMotorista seleccionar la opcion "aprobado"
                selectAprobadoMotorista.value = "Aprobado";
                divOrdenesMotorista.style.display = "block";
                estadoMotorista = "Aprobado";
                llenarOrdenesMotorista();

            } else {
                obtenerMotoristasPendientes().then(motoristas => {
                    if (motoristas.includes(motorista._id)) {
                        //Motorista pendiente
                        //En el select selectAprobadoMotorista seleccionar la opcion "pendiente"
                        selectAprobadoMotorista.value = "Pendiente";
                        divOrdenesMotorista.style.display = "none";
                        estadoMotorista = "Pendiente";
                    } else {
                        //Motorista no aprobado
                        //En el select selectAprobadoMotorista seleccionar la opcion "no aprobado"
                        selectAprobadoMotorista.value = "Rechazado";
                        divOrdenesMotorista.style.display = "none";
                        estadoMotorista = "Rechazado";
                    }
                });
            }
        }).catch(err => {
            console.log(err);
        });

        //El selectImagenesMotorista seleccionar la opcion de la imagen del motorista actualmente
        selectImagenesMotorista.innerHTML = ``;
        imagenesClientes.forEach(imagen => {
            if (imagen == motorista.imagen) {
                selectImagenesMotorista.innerHTML += `<option value="${imagen}" selected>${imagen}</option>`;
            } else {
                selectImagenesMotorista.innerHTML += `<option value="${imagen}">${imagen}</option>`;
            }
        });


        modalEditorMotoristaAdministracion.show();
    });

}

function agregarMotorista() {


    //Obtener los datos del motorista

    //Porner imagen del motorista
    divImagenMotorista.src = `assets/img/profile-pics/default.png`;

    //Llenar los campos con los datos del motorista
    nombreMotorista.value = "";
    apellidoMotorista.value = "";
    correoMotorista.value = "";
    contrasenaMotorista.value = "";
    identificacionMotorista.value = "";
    modalEditorMotoristaAdministracionLabel.innerHTML = `Crear Motorista`;
    selectAprobadoMotorista.value = "Pendiente";
    divOrdenesMotorista.style.display = "none";
    estadoMotorista = "Pendiente";



    //El selectImagenesMotorista seleccionar la opcion de la imagen del motorista actualmente
    selectImagenesMotorista.innerHTML = ``;
    imagenesClientes.forEach(imagen => {
        selectImagenesMotorista.innerHTML += `<option value="${imagen}">${imagen}</option>`;
    });

    motoristaSeleccionadoActualmente = null;
    modalEditorMotoristaAdministracion.show();

}



function verificarDatosMotorista(){
    if(nombreMotorista.value == "" || apellidoMotorista.value == "" || correoMotorista.value == "" || contrasenaMotorista.value == "" || identificacionMotorista.value == ""){
        alert("Por favor llene todos los campos");
        return false;
    } //Verificar que el correo sea valido con expresion regular
    else if (!correoMotorista.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        alert("Correo invalido");
        return false;
    }//Verificar que la contraseña sea valida con una expresion regular, debe tener al menos 8 caracteres, y al menos una letra mayuscula, una minuscula y un numero
    else if (!contrasenaMotorista.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
        alert("Contraseña invalida. Debe tener al menos 8 caracteres, una letra mayuscula, una minuscula y un numero");
        return false;
    } //Verificar que la identificacion sea valida con una expresion regular, debe tener estaz forma xxxx-xxxx-xxxxx
    else if (!identificacionMotorista.value.match(/^[0-9]{4}-[0-9]{4}-[0-9]{5}$/)) {
        alert("Identificacion invalida. Debe tener estaz forma xxxx-xxxx-xxxxx");
        return false;
    } else {
        actualizarMotorista();
        return true;
    }
}


function actualizarMotorista() {
    if (motoristaSeleccionadoActualmente != null) {
        let motoristaActualizado = {
            nombre: nombreMotorista.value,
            apellido: apellidoMotorista.value,
            correo: correoMotorista.value,
            contraseña: contrasenaMotorista.value,
            identificacion: identificacionMotorista.value,
            imagen: selectImagenesMotorista.value
        }
        console.log(motoristaActualizado);
        console.log(motoristaSeleccionadoActualmente);

        fetch(`/motorista/${motoristaSeleccionadoActualmente}`, {
            method: 'PUT',
            body: JSON.stringify(motoristaActualizado),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {

                modalEditorMotoristaAdministracion.hide();
            }).catch(err => {
                console.log(err);
            });

        console.log('El estado es: ', estadoMotorista);

        if (estadoMotorista == "Aprobado") {
            //El motorista esta aprobado
            console.log("El motorista esta aprobado");
            fetch(`/administracion/motorista/aprobado/${motoristaSeleccionadoActualmente}`, {
                method: 'PUT'
            }).then(res => res.json())
                .then(data => {

                    llenarCategoriaAdministracion('motoristas');
                }).catch(err => {
                    console.log(err);
                });
        } else if (estadoMotorista == "Pendiente") {
            //El motorista esta pendiente
            fetch(`/administracion/motorista/pendiente/${motoristaSeleccionadoActualmente}`, {
                method: 'PUT'
            }).then(res => res.json())
                .then(data => {

                    llenarCategoriaAdministracion('motoristas');
                }).catch(err => {
                    console.log(err);
                });
        } else if (estadoMotorista == "Rechazado") {
            //El motorista esta rechazado
            fetch(`/administracion/motorista/rechazado/${motoristaSeleccionadoActualmente}`, {
                method: 'PUT'
            }).then(res => res.json())
                .then(data => {

                    modalEditorMotoristaAdministracion.hide();
                    llenarCategoriaAdministracion('motoristas');
                }).catch(err => {
                    console.log(err);
                });
        }

    }else{
        //Crear motorista
        let motoristaNuevo = {
            nombre: nombreMotorista.value,
            apellido: apellidoMotorista.value,
            correo: correoMotorista.value,
            contraseña: contrasenaMotorista.value,
            identificacion: identificacionMotorista.value,
            imagen: selectImagenesMotorista.value
        }
        fetch('/motorista', {
            method: 'POST',
            body: JSON.stringify(motoristaNuevo),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                motoristaSeleccionadoActualmente = data._id;
                actualizarMotorista();
            }).catch(err => {
                console.log(err);
            });

    }
}

function eliminarMotorista(){
    fetch(`/motorista/${motoristaSeleccionadoActualmente}`, {
        method: 'DELETE'
    }).then(res => res.json())
        .then(data => {
            fetch(`/administracion/motorista/eliminar/${motoristaSeleccionadoActualmente}`, {
                method: 'PUT'
            }).then(res => res.json())
                .then(data => {
                    alert("Motorista eliminado");
                    modalEditorMotoristaAdministracion.hide();
                    llenarCategoriaAdministracion('motoristas');
                }).catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
}


function llenarOrdenesMotorista() {
    let divOrdenesDisponibles = document.getElementById('div-cont-ordenes-disponibles-motorista-modal');
    let divOrdenesTomadas = document.getElementById('div-cont-ordenes-tomadas-motorista-modal');
    let divOrdenesCamino = document.getElementById('div-cont-ordenes-camino-motorista-modal');
    let divOrdenesentregadas = document.getElementById('div-cont-ordenes-entregadas-motorista-modal');

    //Limpiar los divs
    divOrdenesDisponibles.innerHTML = '';
    divOrdenesTomadas.innerHTML = '';
    divOrdenesCamino.innerHTML = '';
    divOrdenesentregadas.innerHTML = '';

    //Obtener las ordenes disponibles
    obtenerOrdenesDisponibles().then(OrdenesDisponibles => {
        OrdenesDisponibles.forEach((orden) => {
        console.log('Llenando ordenes motorista');

            orden = orden.ordenes;
            divOrdenesDisponibles.innerHTML += 

            `
            <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
            <div class="orden-card">
                    <div>
                        <h5 class="m-0 text-break">Orden: #${orden._id}</h5>
                        <div class="ms-2">
                            <p class="orden-card-description">${(orden.productos).length} productos</p>
                            <p class="orden-card-description">Dirección: ${orden.direccion.direccion}</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center gap-2 mt-2"><button
                            class="btn btn-primary btn-sm flex-fill" type="button" onclick="mostrarEditorOrden('${orden._id}','ordenes')">Abrir</button></div>
                </div>
            </div>
            `;}
        );
    }).catch(err => {
        console.log(err);
    });

    if (motoristaSeleccionadoActualmente != null) {
        //Obtener las ordenes tomadas
        obtenerOrdenesTomadasMotorista().then(OrdenesTomadas => {
            console.log('Llenando ordenes tomadas motorista');
            OrdenesTomadas.forEach((orden) => {

                divOrdenesTomadas.innerHTML += 
                `
                <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                <div class="orden-card">
                        <div>
                            <h5 class="m-0 text-break">Orden: #${orden}</h5>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button" onclick="mostrarEditorOrden('${orden}','ordenes')">Abrir</button></div>
                    </div>
                </div>
                `;}
            );
        });
        //Obtener las ordenes entregadas
        obtenerOrdenesEntregadasMotorista().then(OrdenesEntregadas => {
            OrdenesEntregadas.forEach((orden) => {

                divOrdenesentregadas.innerHTML += 
                `
                <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                <div class="orden-card">
                        <div>
                            <h5 class="m-0 text-break">Orden: #${orden}</h5>
                        </div>
                        <div class="d-flex justify-content-center gap-2 mt-2"><button
                                class="btn btn-primary btn-sm flex-fill" type="button" onclick="mostrarEditorOrden('${orden}','ordenes')">Abrir</button></div>
                    </div>
                </div>
                `;}
            );
        });

        //Obtener las ordenes en camino
        obtenerOrdenesEnCamino().then(OrdenesEnCamino => {
            console.log('Llenando ordenes en camino motorista');
            OrdenesEnCamino.forEach((orden) => {
                    
                    divOrdenesCamino.innerHTML += 
                    `
                    <div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3">
                    <div class="orden-card">
                            <div>
                                <h5 class="m-0 text-break">Orden: #${orden.ordenes._id}</h5>
                            </div>
                            <div class="d-flex justify-content-center gap-2 mt-2"><button
                                    class="btn btn-primary btn-sm flex-fill" type="button" onclick="mostrarEditorOrden('${orden.ordenes._id}','ordenes')">Abrir</button></div>
                        </div>
                    </div>
                    `;}
            );
        });
    }

}

function obtenerOrdenesTomadasMotorista(){
    //Obtener las ordenes tomadas
    //async fetch y await
    async function obtenerOrdenesTomadas() {
        const res = await fetch(`/motorista/${motoristaSeleccionadoActualmente}/ordenes/tomadas`);
        const data = await res.json();
        return data;
    }
    const OrdenesTomadas = obtenerOrdenesTomadas();
    return OrdenesTomadas;
        
}

function obtenerOrdenesEntregadasMotorista(){
    //Obtener las ordenes entregadas
    //async fetch y await
    async function obtenerOrdenesEntregadas() {
        const res = await fetch(`/motorista/${motoristaSeleccionadoActualmente}/ordenes/entregadas`);
        const data = await res.json();
        return data;
    }
    const OrdenesEntregadas = obtenerOrdenesEntregadas();
    return OrdenesEntregadas;
        
}


function divIniciarSesion(){
    //oculta el landing page
    document.getElementById('contenido-home').style.display = 'none';
    document.getElementById('navBar-Home').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    document.getElementById('footer-form-create').style.display = 'none';
    document.getElementById('contenido-create').style.display = 'none';

    //Muestra el formulario de inicio de sesion
    document.getElementById('contenido-formularios').style.display = 'block';
    document.getElementById('contenido-login').style.display = 'block';
    document.getElementById('navBar-Form').style.display = 'block';
    document.getElementById('footer-form').style.display = 'block';
    document.getElementById('footer-form-log').style.display = 'block';
}


function iniciarSesion(){

    if (verificarInputLogIn()){
        //Obtenemos los clientes de la base de datos y comprobamos si el usuario y contraseña son correctos para iniciar sesion
        fetch('/cliente').then(res => {
            return res.json();
        }).then(clientes => {
            clientes.forEach(cliente => {
                if (cliente.correo == inputCorreo.value && cliente.contraseña == inputContrasena.value){
                    //Si el usuario y contraseña son correctos, iniciamos sesion
                    console.log('Iniciando sesion');
                    window.location.href = '/';
                    sesionIniciada = true;
                    //actualizar el local storage con la sesion iniciada como true
                    localStorage.setItem('sesionIniciada', true);
                    //actualizar el local storage con el correo y contraseña del usuario
                    localStorage.setItem('correo', inputCorreo.value);
                    localStorage.setItem('contrasena', inputContrasena.value);
                    //actualizar el local storage con el id del usuario
                    localStorage.setItem('id', cliente._id);

                } else {
                    //Si el usuario y contraseña no son correctos, mostramos un mensaje de error
                    console.log('Usuario o contraseña incorrectos');

                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
}


function verificarInputLogIn(){
    //Verifica que los campos no esten vacios, inputCorreo y inputContrasena
    if (inputCorreo.value == '' || inputContrasena.value == '') {
        alert('Por favor, llene todos los campos');
        return false;
    } //Verifica que el correo sea valido con expresion regular
    else if (!inputCorreo.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
        alert('Por favor, ingrese un correo valido');
        return false;
    }//Verificar que la contraseña sea valida con una expresion regular, debe tener al menos 8 caracteres, y al menos una letra mayuscula, una minuscula y un numero
    else if (!inputContrasena.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
        alert('Por favor, ingrese una contraseña valida');
        //Debe de verse asi, ejemplo: *********
        return false;
    } else {
        return true;
    }

}


function divCrearCliente(){
    //Ocultar el Login del cliente
    document.getElementById('contenido-login').style.display = 'none';
    document.getElementById('form-empresa').style.display = 'none';
    document.getElementById('footer-form-log').style.display = 'none';
    document.getElementById('form-motorista').style.display = 'none';
    //Mostramos el formulario de crear cliente
    document.getElementById('contenido-formularios').style.display = 'block';
    document.getElementById('contenido-create').style.display = 'block';
    document.getElementById('form-cliente').style.display = 'block';
    document.getElementById('navBar-Form').style.display = 'block';
    document.getElementById('footer-form').style.display = 'block';
    document.getElementById('footer-form-create').style.display = 'block';
    

}

function botonCrearCliente(){
    if (verificarCreateCliente()){




            console.log('Creando cliente');
            fetch('/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: inputNombre.value,
                    apellido: inputApellido.value,
                    correo: inputCorreo.value,
                    contrasena: inputContrasena.value
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                //Ir a la pagina /
                window.location.href = '/';
                sesionIniciada = true;

            }).catch(err => {
                console.log(err);
                alert('Error al crear cliente');
            });
    }
}


function verificarCreateCliente(){
    let inputNombre = document.getElementById('inputNombreCliente').value;
    let inputApellido = document.getElementById('inputApellidoCliente').value;
    let inputCorreo = document.getElementById('inputCorreoCliente').value;
    let inputContrasena = document.getElementById('inputContrasenaCliente').value;

    if (inputNombre == '' || inputApellido == '' || inputCorreo == '' || inputContrasena == '') {
        alert('Por favor, llene todos los campos');
        return false;
    } //Verifica que el correo sea valido con expresion regular
    else if (!inputCorreo.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
        alert('Por favor, ingrese un correo valido');
        return false;
    }//Verificar que la contraseña sea valida con una expresion regular, debe tener al menos 8 caracteres, y al menos una letra mayuscula, una minuscula y un numero
    else if (!inputContrasena.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
        alert('Por favor, ingrese una contraseña valida');
        //Debe de verse asi, ejemplo: *********
        return false;
    } else {
        return true;
    }
}

function llenandoCliente(){
if (localStorage.getItem('sesionIniciada') =='true'){
    sesionIniciada = true;

    //Mostrar el contenido del cliente
    document.getElementById('divIniciarSesion').style.display = 'none';
    document.getElementById('divCerrarSesion').style.display = 'block';
    document.getElementById('divEditarPerfil').style.display = 'block';
    document.getElementById('infoClienteLanding').style.display = 'block';

    //imprimir el contenido de localStorage que contiene el _id del cliente
    let idCliente = localStorage.getItem('id');
    //Obtenemos la informacion del cliente
    fetch(`/cliente/${idCliente}`)
    .then(res => res.json())
    .then(cliente => {
        console.log(cliente);
        clienteSeleccionadoActualmente = cliente._id;
        //Lenamos los campos con la informacion del cliente
        avatarClienteLanding.src = `assets/img/profile-pics/${cliente.imagen}`;
        infoClienteLanding.innerHTML = 
        `
            <div class="d-flex align-items-center">
                <!-- Avatar -->
                <div class="avatar me-3">
                    <img class="avatar-img rounded-circle shadow" src="/assets/img/profile-pics/${cliente.imagen}" alt="${cliente.nombre} ${cliente.apellido}">
                </div>
                <div>
                    <a class="h6" href="#">${cliente.nombre}</a>
                    <p class="small m-0">${cliente.correo}</p>
                </div>
            </div>
            <hr>
        `;
        llamadoDesde = 'landing page';
        console.log(carritoSeleccionadoActualmente);

        if (cliente.carrito != null){

            console.log(cliente.carrito);

        carritoSeleccionadoActualmente = cliente.carrito._id;

            //Comprobamos si tiene contenido en su carrito
        if (cliente.carrito.productos.length > 0){
            cantidadDeProductosCarrito = cliente.carrito.productos.length;
            console.log('Tiene contenido en su carrito');
            globoCarrito.style.display = 'block';
            globoCarrito.innerHTML = `<span>${cliente.carrito.productos.length}</span>`;

            document.getElementById('div-productos-carrito').innerHTML =``;

            //Obtnemos los productos del carrito del cliente
            cliente.carrito.productos.forEach(carrito => {
                fetch(`administracion/producto/${carrito.producto}`)
                .then(res => res.json())
                .then(producto => {
                    console.log(producto);



                    document.getElementById('div-productos-carrito').innerHTML +=
                    `
                    <!--Item Producto-->
                    <div class="container my-4">
                        <div class="row gy-3">
                            <div class="col-5 col-md-3 d-flex">
                                <img class="img-fluid img-cover h-100 mx-auto rounded-4" src="assets/img/empresas/productos/${producto.imagen}"/>
                            </div>
                            <div
                                class="col-7 col-md-6 col-lg-6 col-xxl-6 d-flex flex-column justify-content-between gap-4">
                                <h3>${producto.nombre}</h3>
                                <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                                    ID: ${producto._id}</p>
                                    <a class="btn-eliminarModal" onclick="eliminarProductoOrden('${producto._id}')"><i class="fas fa-times"></i> Eliminar</a>
                            </div>
                            <div class="col-sm-12 col-md-3 col-lg-3 col-xxl-3 d-flex flex-column my-auto gap-4">
                                <!--Cantidad-->
                                <div class="d-flex flex-row justify-content-between">
                                    <div class="d-flex flex-column justify-content-between">
                                        <h6>Cantidad</h6>
                                        <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                                            <input type="number" id="cantidad-${producto._id}" onchange="cambiaCantidad('${producto._id}')" class="form-control form-control-sm" value="${carrito.cantidad}" min="1" max="100" />
                                        </div>
                                    </div>

                                </div>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <h6 class="m-0">Precio</h6>
                                        <p class="idProductoModal" id="precio-${producto._id}">$${producto.precio}</p>
                                    </div>
                                    <div>
                                        <h6 class="m-0">Total:</h6>
                                        <p class="idProductoModal" id="total-${producto._id}">$${(producto.precio)*(carrito.cantidad)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Fin Item Producto-->
                    `;


                    let cantidadCarrito = document.getElementById(`cantidad-${producto._id}`).value;
                    let precioCarrito = document.getElementById(`precio-${producto._id}`).innerHTML;
                    precioCarrito = precioCarrito.replace('$', '');
                    subtotalCarrito = cantidadCarrito * precioCarrito;
                    ISVCarrito = subtotalCarrito * 0.15;
                    comisionCarrito = subtotalCarrito * 0.05;
                    totalCarrito = subtotalCarrito + ISVCarrito + comisionCarrito;
                    comisionMotoristaCarrito = (comisionCarrito * 30) / 100;
                    comisionAdministracionCarrito = (comisionCarrito * 70) / 100
                    console.log(comisionMotoristaCarrito);
                    console.log(comisionAdministracionCarrito);
                    console.log(comisionCarrito);

                    document.getElementById(`total-${producto._id}`).innerHTML = `$${subtotalCarrito}`;
                
                
                    //Actualizamos la factura del cliente
                    document.getElementById('div-factura-carrito').innerHTML =
                        `
                        <!--Factura-->
                            <div class="row py-2">
                                <div class="col-md-12 d-flex justify-content-between align-items-center">
                                    <h5 class="m-0">Subtotal</h5>
                                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                                        $${subtotalCarrito}
                                    </p>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12 d-flex justify-content-between align-items-center">
                                    <h5 class="m-0">ISV</h5>
                                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                                        $${ISVCarrito}
                                    </p>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12 d-flex justify-content-between align-items-center">
                                    <h5 class="m-0">Comision</h5>
                                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                                        $${comisionCarrito}
                                    </p>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12 d-flex justify-content-between align-items-center">
                                    <h5 class="m-0">Total a Pagar</h5>
                                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                                        $${totalCarrito}
                                    </p>
                                </div>
                            </div>
                        <!--/Factura-->
                        `;
                });

            });

        } else {
            console.log('No tiene contenido en su carrito');
            cantidadDeProductosCarrito = 0;
            total = 0;
            subtotal = 0;
            comision = 0;
            comisionMotorista = 0;
            comisionAdministracion = 0;
            document.getElementById('globoCarrito').style.display = 'none';
            globoCarrito.innerHTML = `<span>0</span>`;

            document.getElementById('div-factura-carrito').innerHTML =
                `
                        <!--Factura-->
                            <div class="row py-2">
                                <div class="col-md-12 d-flex justify-content-between align-items-center">
                                    <h5 class="m-0">Subtotal</h5>
                                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                                        $0
                                    </p>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12 d-flex justify-content-between align-items-center">
                                    <h5 class="m-0">ISV</h5>
                                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                                        $0
                                    </p>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12 d-flex justify-content-between align-items-center">
                                    <h5 class="m-0">Comision</h5>
                                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                                        $0
                                    </p>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-md-12 d-flex justify-content-between align-items-center">
                                    <h5 class="m-0">Total a Pagar</h5>
                                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                                        $0
                                    </p>
                                </div>
                            </div>
                        <!--/Factura-->
                        `;
        }

        document.getElementById('div-productos-carrito').innerHTML =
        //Agregar producto al carrito, boton
        `
        <!--Agregar producto al carrito, boton-->
        <div class="container my-4">

            <div class="row">
                <div class="col-12">
                    <button class="btn btn-primary btn-block" onclick="agregarProductoOrdenAdministracion()">
                        <i class="fas fa-cart-plus"></i> Agregar Producto
                    </button>
                </div>
            </div>
        </div>
        <!--/Agregar producto al carrito, boton-->
        `
        ;
        } else {
            console.log('No tiene carrito');
            crearCarrito(idCliente);
        }


        
    });
}
}

llenandoCliente();

function cambiaCantidad(idProducto){
    let cantidad = document.getElementById(`cantidad-${idProducto}`).value;
    let precio = document.getElementById(`precio-${idProducto}`).innerHTML;
    precio = precio.replace('$', '');
    let subtotal = cantidad * precio;
    let ISV = subtotal * 0.15;
    let comision = subtotal * 0.05;
    let total = subtotal + ISV + comision;
    document.getElementById(`total-${idProducto}`).innerHTML = `$${subtotal}`;


    //Actualizamos la factura del cliente
    document.getElementById('div-factura-carrito').innerHTML =
        `
        <!--Factura-->
            <div class="row py-2">
                <div class="col-md-12 d-flex justify-content-between align-items-center">
                    <h5 class="m-0">Subtotal</h5>
                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                        $${subtotal}
                    </p>
                </div>
            </div>
            <div class="row py-2">
                <div class="col-md-12 d-flex justify-content-between align-items-center">
                    <h5 class="m-0">ISV</h5>
                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                        $${ISV}
                    </p>
                </div>
            </div>
            <div class="row py-2">
                <div class="col-md-12 d-flex justify-content-between align-items-center">
                    <h5 class="m-0">Comision</h5>
                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                        $${comision}
                    </p>
                </div>
            </div>
            <div class="row py-2">
                <div class="col-md-12 d-flex justify-content-between align-items-center">
                    <h5 class="m-0">Total a Pagar</h5>
                    <p class="idProductoModal" style="font-size: 14px;color: var(--bs-gray-500);">
                        $${total}
                    </p>
                </div>
            </div>
        <!--/Factura-->
        `;

}

function editarMiPerfil(){
    verInfoCliente(clienteSeleccionadoActualmente);
    llamadoDesde = 'landing page';
}

function selectCarrito(paso){
    //obtenemos cuantos productos hay en el carrito
    if (cantidadDeProductosCarrito == 0){
        alert('Debe agregar productos al carrito para poder continuar');
        //Sleeccionamos en el select el primer paso
        document.getElementById('modal-carrito-select').value = 'productos';
    }

    if (paso.value == 'productos'){
        document.getElementById('div-productos-carrito').style.display = 'block';
        document.getElementById('div-factura-carrito').style.display = 'block';
        document.getElementById('div-despacho-carrito').style.display = 'none';
        document.getElementById('div-footer-despacho-carrito').style.display = 'none';
        document.getElementById('div-pago-carrito').style.display = 'none';
        document.getElementById('div-footer-pago-carrito').style.display = 'none';
    } else if (paso.value == 'despacho'){
        document.getElementById('div-productos-carrito').style.display = 'none';
        document.getElementById('div-factura-carrito').style.display = 'none';
        document.getElementById('div-despacho-carrito').style.display = 'block';
        document.getElementById('div-footer-despacho-carrito').style.display = 'block';
        document.getElementById('div-pago-carrito').style.display = 'none';
        document.getElementById('div-footer-pago-carrito').style.display = 'none';
    } else if (paso.value == 'pago'){
        document.getElementById('div-productos-carrito').style.display = 'none';
        document.getElementById('div-factura-carrito').style.display = 'none';
        document.getElementById('div-despacho-carrito').style.display = 'none';
        document.getElementById('div-footer-despacho-carrito').style.display = 'none';
        document.getElementById('div-pago-carrito').style.display = 'block';
        document.getElementById('div-footer-pago-carrito').style.display = 'block';
    }


}

function crearCarrito(idCliente){
    fetch(`/cliente/${idCliente}/carrito`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.success){
            location.reload();
        } else {
            console.log('Carrito');
        }
    }).catch(err => {
        console.log(err);
    });
}


function verificarDireccion(){
    let direccionCarrito = document.getElementById("direccion-carrito").value;
    let longitudCarrito = document.getElementById("longitud-carrito").value;
    let latitudCarrito = document.getElementById("latitud-carrito").value;

    //Verificamos que los campos no esten vacios
    if (direccionCarrito == '' || longitudCarrito == '' || latitudCarrito == ''){
        alert('Todos los campos son obligatorios');
        return false;
    } //Verificamos que longitud y latitud sean numericos
    else if (isNaN(longitudCarrito) || isNaN(latitudCarrito)){
        alert('Longitud y latitud deben ser numericos');
        return false;
    } else {
        return true;
    }
}

function actualizarDireccion(){
    if (verificarDireccion()){
        let direccionCarrito = document.getElementById("direccion-carrito").value;
        let longitudCarrito = document.getElementById("longitud-carrito").value;
        let latitudCarrito = document.getElementById("latitud-carrito").value;

        fetch(`/cliente/carrito/${carritoSeleccionadoActualmente}/direccion`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                direccion: direccionCarrito,
                longitud: longitudCarrito,
                latitud: latitudCarrito
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Se actualizo la direccion');
        }).catch(err => {
            console.log(err);
        });

    }else{
        console.log('No se pudo actualizar la direccion');
    }
}

function verificarTarjetaModal(){
    let tipoTarjetaCarrito = document.getElementById("tipoTarjeta-carrito");
    let numeroTarjetaCarrito = document.getElementById("numeroTarjeta-carrito");
    let nombreTitularCarrito = document.getElementById("nombreTarjeta-carrito");
    let fechaVencimientoCarrito = document.getElementById("fechaVencimiento-carrito");
    let codigoSeguridadCarrito = document.getElementById("codigoSeguridad-carrito");

    //Verificamos que los campos no esten vacios
    if(numeroTarjetaCarrito.value == "" || nombreTitularCarrito.value == "" || fechaVencimientoCarrito.value == "" || codigoSeguridadCarrito.value == "" ){
        alert("Por favor llene todos los campos de la tarjeta de credito");
        return false;
    }
    //Verificar que el numero de tarjeta sea valido con expresion regular segun el tipo de tarjeta
    else if(tipoTarjetaCarrito.value == "Visa" && !numeroTarjetaCarrito.value.match(/^4[0-9]{12}(?:[0-9]{3})?$/)){
        alert("Numero de tarjeta invalido");
        //Debe de verse de la forma 4123456789012345
        return false;
    } else if(tipoTarjetaCarrito.value == "MasterCard" && !numeroTarjetaCarrito.value.match(/^5[1-5][0-9]{14}$/)){
        alert("Numero de tarjeta invalido");
        //Debe de verse de la forma 5123456789012345
        return false;
    } else if(tipoTarjetaCarrito.value == "American Express" && !numeroTarjetaCarrito.value.match(/^3[47][0-9]{13}$/)){
        alert("Numero de tarjeta invalido");
        //Debe de verse de la forma 341234567890123
        return false;
    } //Verificar que la fecha de vencimiento sea valida con expresion regular
    else if(!fechaVencimientoCarrito.value.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)){
        alert("Fecha de vencimiento invalida. Debe de verse de la forma MM/YYYY");
        return false;
    } //Verificar que el codigo de seguridad sea valido con expresion regular
    else if(!codigoSeguridadCarrito.value.match(/^[0-9]{3,4}$/)){
        alert("Codigo de seguridad invalido. Debe de verse de la forma XXX o XXXX");
        return false;
    } else {
        console.log("verificar tarjeta");
        return true;
    }


}

function pagarOrden(){
    if (verificarTarjetaModal()){
        if (verificarDireccion()){
            comisionAdministracionCarrito = (comisionCarrito * 70) / 100
            comisionMotoristaCarrito = (comisionCarrito * 30) / 100
            console.log(comisionAdministracionCarrito);
            console.log(comisionMotoristaCarrito);
            let factura = {
                "total": totalCarrito,
                "subtotal": subtotalCarrito,
                "adm": comisionAdministracionCarrito,
                "motorista": comisionMotoristaCarrito,
                "codigoSeguridad": document.getElementById("codigoSeguridad-carrito").value,
                "fechaVencimiento": document.getElementById("fechaVencimiento-carrito").value,
                "nombreTitular": document.getElementById("nombreTarjeta-carrito").value,
                "numeroTarjeta": document.getElementById("numeroTarjeta-carrito").value,
                "tarjeta": document.getElementById("tipoTarjeta-carrito").value
            }
            fetch(`/cliente/carrito/${carritoSeleccionadoActualmente}/factura`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(factura)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                mandarOrden();
            }).catch(err => {
                console.log(err);
            });


        }else{
            console.log('No se pudo pagar la orden');
        }
    }else{
        console.log('No se pudo pagar la orden');
    }
}

//Mandar la orden de carrito a las iordenes de la base de dato de administracion
function mandarOrden() {
    //Obtener la orden de carrito
    fetch(`/cliente/carrito/${carritoSeleccionadoActualmente}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            //Mandar la orden de carrito a la base de datos de administracion
            fetch(`/administracion/ordenes/copiar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    //Agregar el id de la orden de carrito a ordenes cliente
                    fetch(`/cliente/${clienteSeleccionadoActualmente}/orden/${carritoSeleccionadoActualmente}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            //Eliminar el carrito de la base de datos de cliente
                            fetch(`/cliente/${clienteSeleccionadoActualmente}/carrito`, {
                                method: 'DELETE'
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                    //recargar la pagina
                                    location.reload();
                                }).catch(err => {
                                    console.log(err);
                                });


                        }).catch(err => {
                            console.log(err);
                        });

                }).catch(err => {
                    console.log(err);
                });
        });
}


function verCartegorias(categoria) {
    if (categoria == "todas") {
        imprimirModalCategorias('Todas');
    } else if (categoria == "Familiar") {
        imprimirModalCategorias('Familiar');
    } else if (categoria == "Buffets") {
        imprimirModalCategorias('Buffets');
    } else if (categoria == "Comida Rápida") {
        imprimirModalCategorias('Comida Rápida');
    }
    modalCategorias.show();
}

function imprimirModalCategorias(categoria){
    let div = document.getElementById("div-categorias-empresas-landing");
    document.getElementById("modal-categorias-comida-titulo").innerHTML = categoria;
    fetch(`/empresa/categoria/${categoria}`)
        .then(res => res.json())
        .then(data => {
            div.innerHTML = "";
            //Verificar si empresas esta en 0
            if (data.length != 0) {
                data.forEach(empresas => {
                    //hacer un calculo de las reseñas de la empresa por el promedio de la puntuacion que tiene
                    let promedio = 0;

                    empresas.reseñas.forEach(review => {
                        promedio += review.puntuacion;
                    });
                    promedio = promedio / empresas.reseñas.length;
                    div.innerHTML += `
                    <div class="col-sm-12 col-md-6 col-xxl-4">
                        <div class="card card-proveedores" onclick="modalEmpresaConOrdenes('${empresas._id}')">
                            <img class="card-img-top w-100 d-block img-card-proveedores"
                                src="assets/img/empresas/banners/${empresas.banner}" />
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>${empresas.nombre}</h4>
                                        <p>Descripcion: ${empresas.descripcion}</p>
                                        <p><i class="fas fa-star icon-reference"></i> ${promedio}</p>
                                    </div><img class="avatar-logo avatar-img" src="assets/img/empresas/logos/${empresas.logo}" />
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });
            } else {
                //Imprime, que no hay empresas en esta categoria, centrado en pantalla
                div.innerHTML += `
                <h1 class="text-center">No hay empresas en esta categoria</h1>
                `;
            }
        }).catch(err => {
            console.log(err);
        });
}

function modalEmpresaConOrdenes(idEmpresa){



    fetch(`/empresa/${idEmpresa}`)
        .then(res => res.json())
        .then(empresa => {
            document.getElementById("div-banner-empresa").src = `assets/img/empresas/banners/${empresa.banner}`;
            document.getElementById("div-logo-empresa").src = `assets/img/empresas/logos/${empresa.logo}`;
            document.getElementById("info-empresas-index").innerHTML = 
            `
            <h5 class="m-0">${empresa.nombre}</h5>
            <p class="m-0">${empresa.descripcion}</p>
            `;
            productosEmpresa.innerHTML = '';
            llamadoDesde = 'empresas';
            empresa.productos.forEach(producto => {
                productosEmpresa.innerHTML +=
                `
                    <div class="col-sm-12 col-md-6 col-xxl-4">
                        <div class="card card-proveedores">
                            <img class="card-img-top w-100 d-block img-card-proveedores"
                                src="assets/img/empresas/productos/${producto.imagen}"/>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>${producto.nombre}</h4>
                                    </div>
                                    <!--Boton añadir al carrito-->
                                    <div>
                                        <button class="btn btn-warning" type="button" onclick="agregarItemOrden('${producto._id}')">
                                            <i class="fas fa-shopping-cart"></i>
                                        </button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

        modalProductosEmpresa.show();   
        }).catch(err => {
            console.log(err);
        });

}



function cerrarSesion(){
    //Limpiar el localStorage
    localStorage.clear();
    //Redireccionar a la pagina de inicio
    window.location.href = "/";
}