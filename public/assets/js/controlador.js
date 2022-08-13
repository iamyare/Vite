var administracion = true;

//Modales
var modalEditarClienteAdministrador = new bootstrap.Modal('#modalEditarClienteAdministrador');

//Divs para rellenar con los datos obtenidos
const divClientesAdministracion = document.getElementById("contenido-clientes-administracion");
const clienteAdministracionModal = document.getElementById("cliente-administracion-modal");

if (administracion) {
    llenarClientesAdministracion();
}

function llenarClientesAdministracion() {
    divClientesAdministracion.innerHTML = "";
    fetch(`http://localhost:3333/cliente`)
        .then(res => res.json())
        .then(clientes => {
            clientes.forEach(cliente => {
                divClientesAdministracion.innerHTML += 
                `
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
        .catch(err => console.log(err));
}

function verInfoCliente(idCliente) {
    clienteAdministracionModal.innerHTML = "";

    fetch(`http://localhost:3333/cliente/${idCliente}`)
        .then(res => res.json())
        .then(cliente => {
            obtenerOrdenesCliente(cliente.ordenes);


            let ordenesDiv = "";

            clienteAdministracionModal.innerHTML =
            `
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
            console.log(ordenes);
            modalEditarClienteAdministrador.show();
        })
        .catch(err => console.log(err));
}

function obtenerOrdenesCliente(idOrdenes) {
    let ordenes = [];
    idOrdenes.forEach(idOrden => {
        const orden = fetch(`http://localhost:3333/orden/${idOrden}`)
            .then(res => res.json());
    });

    ordenes.then(orden => {
        console.log(orden);
    });
}
