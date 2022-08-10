/**
 * Cuando el usuario hace clic en el botón de menú, cambie la clase activa en el botón de menú.
 * @param e - El objeto de evento.
 */
function toggleMenu(e) {
  e.classList.toggle("active");
}

const tiposRegistro = ['cliente', 'empresa', 'motorista'];

function registrar(claseDeIngreso){
  console.log('El registro es de tipo: ', claseDeIngreso);
}

/*
//Al cambiar el valor del select, se ejecuta la una funcion que recibe el valor del select
//Con este valor veremos que tipo de registro es y por lo tanto que formulario mostrar
document.getElementById("selectTipoRegistro").addEventListener("change", function(){
  tiposRegistro.forEach(tipo => {
    document.getElementById(tipo).style.display = 'none';
  });
  document.getElementById(this.value).style.display = 'block';
});
*/