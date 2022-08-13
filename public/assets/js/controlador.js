var administracion = true;

//Modales
var modalEditarClienteAdministrador = new bootstrap.Modal("#modalEditarClienteAdministrador");
var modalEditorOrdenAdministracion = new bootstrap.Modal("#modalEditorOrdenAdministracion");

//Divs para rellenar con los datos obtenidos
const divClientesAdministracion = document.getElementById("contenido-clientes-administracion");
const clienteAdministracionModal = document.getElementById("cliente-administracion-modal");




if (administracion) {
  llenarClientesAdministracion();
}

function llenarClientesAdministracion() {
  divClientesAdministracion.innerHTML = "";
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
                                    <p class="text-break m-0 m-0">${cliente.ordenes.length}</p>
                                </div>
                            </div>
                            <div><button class="btn btn-warning btn-sm" type="button" onclick="verInfoCliente('${cliente._id}')">Ver</button></div>
                        </div>
                    </div>
                    <!-- /Cliente item -->
                `;
      });
    })
    .catch((err) => console.log(err));
}

function verInfoCliente(idCliente) {
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
                                <td>${orden.factura.total}</td>
                                <td>${orden.estado}</td>
                                <td>
                                    <button class="btn btn-warning" type="button" onclick="mostrarEditorOrdenAdministracion('${orden._id}')">Mostrar</button>
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
                                        <button class="btn btn-primary" type="button" onclick="abrirModalEditar('nombre-cliente-administracion-modal');">Editar</button>
                                    </div>
                                </div>
                                <!--Apellido-->
                                <div class="mb-3">
                                    <label class="form-label" for="apellido-cliente-administracion-modal">Apellido</label>
                                    <div class="input-group">
                                        <input class="form-control" type="text" id="apellido-cliente-administracion-modal" value="${cliente.apellido}">
                                        <button class="btn btn-primary" type="button" onclick="abrirModalEditar('apellido-cliente-administracion-modal');">Editar</button>
                                    </div>
                                </div>
                                <!--Correo-->
                                <div class="mb-3">
                                    <label class="form-label" for="correo-cliente-administracion-modal">Correo</label>
                                    <div class="input-group">
                                        <input class="form-control" type="email" id="correo-cliente-administracion-modal" value="${cliente.correo}">
                                        <button class="btn btn-primary" type="button" onclick="abrirModalEditar('correo-cliente-administracion-modal');">Editar</button>
                                    </div>
                                </div>
                                <!--Contraseña-->
                                <div class="mb-3">
                                    <label class="form-label" for="contrasena-cliente-administracion-modal">Contraseña</label>
                                    <div class="input-group">
                                        <input class="form-control" type="password" id="contrasena-cliente-administracion-modal" value="${cliente.contraseña}">
                                        <button class="btn btn-primary" type="button" onclick="abrirModalEditar('contrasena-cliente-administracion-modal');">Editar</button>
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

    mostrarOrdenAdministracion(idOrden).then((res) => {
        //Modoficar h5 con id modalEditorOrdenAdministracionLabel
        modalEditorOrdenAdministracionLabel.innerHTML = `Orden #${res._id}`;
        tablaModalEditorOrdenAdministracion.innerHTML = "";
        res.productos.forEach((producto) => {
            tablaModalEditorOrdenAdministracion.innerHTML += 
            `
            <tr>
                <td>${producto}</td>
                <td>Producto 1</td>
                <td>1</td>
                <td>L. 1000</td>
                <td>L. 1000</td>
                <td><button class="btn btn-primary" type="button" onclick="mostrarProductoAdministracion('adios')">Mostrar</button></td>
            </tr>
            `
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

function mostrarProductoAdministracion(){

}

