const precioTotalElemento = document.getElementById("precioTotal");



 // Función para obtener la memoria del carrito
function obtenerMemoriaCarrito() {
    return JSON.parse(localStorage.getItem('articulos')) || [];
}

// Función para actualizar la vista del carrito
function actualizarVistaCarrito() {
    const carritoDiv = document.getElementById('carrito');
    const memoria = obtenerMemoriaCarrito();
    mostrarPrecioTotal()

    carritoDiv.innerHTML = ''; // Limpiar la vista actual

    memoria.forEach(producto => {
        const productoArticle = document.createElement('article');
        productoArticle.className = 'producto';
    
        const precioTotal = producto.cantidad * producto.precio;
    
        productoArticle.innerHTML = `
            <img src="./img/productos/${producto.img}" alt="${producto.nombre}">
            <article>
            <div class="listacarrito">
                <h4>${producto.nombre}</h4>
                <p>Total por unidad = $${producto.precio}
                <p>Total por producto = $${precioTotal}</p>
            </div>
                
                <div class="botones">
                    <button onclick="ajustarCantidad(${producto.id}, -1)">-</button>
                    <span> ${producto.cantidad}</span>
                    <button onclick="ajustarCantidad(${producto.id}, 1)">+</button>
                </div>
            </article>
        `;
    
        carritoDiv.appendChild(productoArticle);
    });
}

function ajustarCantidad(id, cambio) {
  const memoria = obtenerMemoriaCarrito();
  const indiceProducto = memoria.findIndex(articulo => articulo.id === id);

  if (indiceProducto === -1) return;

  memoria[indiceProducto].cantidad += cambio;

  if (memoria[indiceProducto].cantidad <= 0) {
      memoria.splice(indiceProducto, 1);
  }

  guardarMemoriaCarrito(memoria);
  actualizarNumeroCarrito();
  actualizarVistaCarrito();
  mostrarPrecioTotal()
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('articulos');
    actualizarVistaCarrito();
    actualizarNumeroCarrito();
    mostrarPrecioTotal()
}
const precioTotalModalElemento = document.getElementById('precioTotalModal');
mostrarPrecioTotal()
function mostrarPrecioTotal() {
  const precioTotal = calcularPrecioTotal();
  const precioTotalElemento = document.getElementById('precioTotal');
  const precioFormateado = precioTotal.toLocaleString('es-ES', { style: 'currency', currency: 'ARS' });
  precioTotalElemento.innerText = `Total: ${precioFormateado}`;
  precioTotalModalElemento.innerText = `Total: ${precioFormateado}`;
}



openModalBtn.addEventListener('click', () => {
    mostrarPrecioTotal(); // Asegúrate de mostrar el precio total antes de abrir el modal
    modal.style.display = 'block'; // Muestra el modal
});
// Inicializar la vista del carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarVistaCarrito);



document.getElementById("openModalBtn").addEventListener("click", function() {
    document.getElementById("modal").style.display = "block";
});

window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
    }
});


const boton = document.getElementById('rrtt');
const formulario = document.getElementById('formularioCompra');
const modal = document.getElementById('modal');

boton.addEventListener('click', function(event) {
    // Prevenir el comportamiento predeterminado del botón
    event.preventDefault();

    // Verificar si el formulario está completo y es válido
    if (formulario.checkValidity()) {
        // Mostrar la alerta de SweetAlert2
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Su compra se realizo con exito",
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                // Vaciar el carrito
                vaciarCarrito();
                // Cerrar el modal
                modal.style.display = 'none';
            }
        });
    } else {
        // Si el formulario no es válido, mostrar los mensajes de error
        formulario.reportValidity();
    }
});