const precioTotalElemento = document.getElementById("precioTotal");
const precioTotalModalElemento = document.getElementById('precioTotalModal');
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("modal");

// Función para obtener la memoria del carrito
function obtenerMemoriaCarrito() {
    return JSON.parse(localStorage.getItem('articulos')) || [];
}

// Función para guardar la memoria del carrito
function guardarMemoriaCarrito(carrito) {
    localStorage.setItem('articulos', JSON.stringify(carrito));
}

// Función para calcular el precio total
function calcularPrecioTotal() {
    const memoria = obtenerMemoriaCarrito();
    return memoria.reduce((total, producto) => total + (producto.cantidad * producto.Precio), 0);
}

// Función para actualizar la vista del carrito
function actualizarVistaCarrito() {
    const carritoDiv = document.getElementById('carrito');
    const memoria = obtenerMemoriaCarrito();
    

    carritoDiv.innerHTML = ''; // Limpiar la vista actual

    memoria.forEach(producto => {
        const productoArticle = document.createElement('article');
        productoArticle.className = 'producto';
    
        const precioTotal = producto.cantidad * producto.Precio;
    
        productoArticle.innerHTML = `
            <img src="./img/productos/${producto.Imagen}" alt="${producto.Nombre}">
            <article>
            <div class="listacarrito">
                <h4>${producto.Nombre}</h4>
                <p>Precio por unidad = $${producto.Precio}</p>
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

        mostrarPrecioTotal();
    });
}

// Función para ajustar la cantidad de un producto en el carrito
function ajustarCantidad(id, cambio) {
    const memoria = obtenerMemoriaCarrito();
    const indiceProducto = memoria.findIndex(articulo => articulo.id === id);

    if (indiceProducto === -1) return;

    memoria[indiceProducto].cantidad += cambio;

    if (memoria[indiceProducto].cantidad <= 0) {
        memoria.splice(indiceProducto, 1);
    }

    guardarMemoriaCarrito(memoria);
    actualizarVistaCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('articulos');
    actualizarVistaCarrito();
    actualizarNumeroCarrito();
    mostrarPrecioTotal();
}

// Función para mostrar el precio total
function mostrarPrecioTotal() {
    const precioTotal = calcularPrecioTotal();
    const precioFormateado = precioTotal.toLocaleString('es-ES', { style: 'currency', currency: 'ARS' });
    document.getElementById('precioTotal').innerText = `Total: ${precioFormateado}`;
    document.getElementById('precioTotalModal').innerText = `Total: ${precioFormateado}`;
}

// Mostrar el precio total al abrir el modal
openModalBtn.addEventListener('click', () => {
    mostrarPrecioTotal(); // Asegúrate de mostrar el precio total antes de abrir el modal
    modal.style.display = 'block'; // Muestra el modal
});

// Inicializar la vista del carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarVistaCarrito);

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Procesar el formulario y vaciar el carrito al confirmar la compra
const boton = document.getElementById('rrtt');
const formulario = document.getElementById('formularioCompra');

boton.addEventListener('click', function(event) {
    // Prevenir el comportamiento predeterminado del botón
    event.preventDefault();

    // Verificar si el formulario está completo y es válido
    if (formulario.checkValidity()) {
        // Mostrar la alerta de SweetAlert2
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Su compra se realizó con éxito",
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
