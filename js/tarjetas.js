let productocontainer = document.querySelector(`#container`)


Productos.forEach((producto)=>{
    let copia = document.querySelector(`template`).content.cloneNode(true)
    copia.querySelector('img').src = `../img/productos/` +producto.img;
    copia.querySelector(`h3`).textContent = producto.nombre
    copia.querySelector(`h4`).textContent = producto.marca
    copia.querySelector(`p`).textContent += producto.precio

    copia.querySelector(`button`).addEventListener("click",() => {
        agregarAlCarrito(producto);

        Toastify({
            text: "Producto agregado",
            duration: 500,
            className: "info",
            style: {
              background: "linear-gradient(to right, rgb(150, 244, 186),rgb(255, 200, 255) )",
            },
          }).showToast();
    })

    container.append(copia)
})

function redirectToPage() {
  window.location.href = 'cart.html'; // Reemplaza 'otra_pagina.html' con la ruta a la página a la que deseas redirigir
}
