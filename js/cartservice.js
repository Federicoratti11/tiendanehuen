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
  const indiceProducto = memoria.findIndex(articulo => articulo.id === producto.id);
  let cantidadProductoFinal;

  if (indiceProducto === -1) {
    memoria.push({ ...producto, cantidad: 1 });
    cantidadProductoFinal = 1;
  } else {
    memoria[indiceProducto].cantidad++;
    cantidadProductoFinal = memoria[indiceProducto].cantidad;
  }

  guardarMemoriaCarrito(memoria);
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
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
  const precioTotal = memoria.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  return precioTotal; // Redondear a dos decimales
}
mostrarPrecioTotal()
function mostrarPrecioTotal() {
  const precioTotal = calcularPrecioTotal();
  const precioTotalElemento = document.getElementById('precioTotal');
  const precioFormateado = precioTotal.toLocaleString('es-ES', { style: 'currency', currency: 'ARS' });
  precioTotalElemento.innerText = precioFormateado;
}

actualizarNumeroCarrito();
