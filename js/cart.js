const precioTotalElemento = document.getElementById("precioTotal");



 // Función para obtener la memoria del carrito
function obtenerMemoriaCarrito() {
    return JSON.parse(localStorage.getItem('articulos')) || [];
}

// Función para actualizar la vista del carrito
function actualizarVistaCarrito() {
    const carritoDiv = document.getElementById('carrito');
    const memoria = obtenerMemoriaCarrito();

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

// Inicializar la vista del carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarVistaCarrito);