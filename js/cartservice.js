const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Obtiene la memoria del carrito desde localStorage */
function obtenerMemoriaCarrito() {
  return JSON.parse(localStorage.getItem("articulos")) || [];
}

/** Guarda la memoria del carrito en localStorage */
function guardarMemoriaCarrito(memoria) {
  localStorage.setItem("articulos", JSON.stringify(memoria));
}

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto) {
  const memoria = obtenerMemoriaCarrito();
  const productoExistente = memoria.find(p => p.id === producto.id);

  if (productoExistente) {
    // Si el producto ya existe, aumenta la cantidad
    productoExistente.cantidad ++;
} else {

  producto.cantidad = 1; // Asegúrate de establecer la cantidad inicial en 1
  memoria.push(producto);
}

  guardarMemoriaCarrito(memoria);
  actualizarNumeroCarrito();
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto) {
  const memoria = obtenerMemoriaCarrito();
  const indiceProducto = memoria.findIndex(articulo => articulo.id === producto.id);

  if (indiceProducto === -1) return 0; // El producto no está en el carrito

  memoria[indiceProducto].cantidad--;
  let cantidadProductoFinal = memoria[indiceProducto].cantidad;

  if (cantidadProductoFinal === 0) {
    memoria.splice(indiceProducto, 1);
  }

  guardarMemoriaCarrito(memoria);
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito() {
  const memoria = obtenerMemoriaCarrito();
  const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
  cuentaCarritoElement.innerText = cuenta;
}

/** Reinicia el carrito */
function reiniciarCarrito() {
  localStorage.removeItem("articulos");
  actualizarNumeroCarrito();
}


/** sumar productos del carrito */
function calcularPrecioTotal() {
  const memoria = obtenerMemoriaCarrito();
  return memoria.reduce((total, producto) => {
      // Asegúrate de que los atributos necesarios están presentes
      if (producto.id && producto.Precio && producto.cantidad) {
          return total + (producto.cantidad * producto.Precio);
      } else {
          console.error(`Producto con ID ${producto.id} tiene atributos inválidos.`);
          return total;
      }
  }, 0);
}



actualizarNumeroCarrito();
