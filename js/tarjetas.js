const container = document.getElementById("container");
const productTemplate = document.getElementById("productTemplate");


fetch('./js/datos.json')
.then((res) => res.json ())
.then((datos) => {
    articulos = datos; // Guardar datos en la variable global
    mostrar_productos(articulos);
})
.catch((error)=> console.log(error) )


function mostrar_productos(articulos) {
    articulos.forEach((producto) => {
        let copia = productTemplate.content.cloneNode(true);
        copia.querySelector('img').src = `./img/productos/` + producto.Imagen;
        copia.querySelector('h3').textContent = producto.Nombre;
        copia.querySelector('.precio').textContent = `$${producto.Precio}`; // Agregado símbolo $

        copia.querySelector('button').addEventListener("click", () => {
            agregarAlCarrito(producto);
            Toastify({
                text: "Producto agregado",
                duration: 500,
                className: "info",
                style: {
                    background: "linear-gradient(to right, rgb(150, 244, 186),rgb(255, 200, 255))",
                },
            }).showToast();
        });

        container.append(copia);
    });
}



        document.addEventListener("keyup", filtrarProductos);
        document.getElementById("precioMin").addEventListener("input", filtrarProductos);
        document.getElementById("precioMax").addEventListener("input", filtrarProductos);
        document.querySelectorAll(".categoria-boton input").forEach(checkbox => {
            checkbox.addEventListener("change", filtrarProductos);
        });

        function filtrarProductos() {
            const buscador = document.getElementById("buscador").value.toLowerCase();
            const precioMin = parseFloat(document.getElementById("precioMin").value) || 0;
            const precioMax = parseFloat(document.getElementById("precioMax").value) || Infinity;
        
            const categoriasActivas = Array.from(document.querySelectorAll(".categoria-boton input:checked"))
                                           .map(checkbox => checkbox.dataset.categoria.toLowerCase());
        
            document.querySelectorAll(".tarjetaproducto").forEach(producto => {
                const nombreProducto = producto.querySelector('h3').textContent.toLowerCase();
                const precioProducto = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
        
                // Busca el producto en el array 'articulos'
                const articuloData = articulos.find(p => p.Nombre.toLowerCase() === nombreProducto);
                if (!articuloData) {
                    console.error(`Producto con nombre "${nombreProducto}" no encontrado en el array 'articulos'.`);
                    return;
                }
                const categoriaProducto = articuloData.Categoría.toLowerCase();
        
                const coincideNombre = nombreProducto.includes(buscador);
                const coincidePrecio = precioProducto >= precioMin && precioProducto <= precioMax;
                const coincideCategoria = categoriasActivas.length === 0 || categoriasActivas.includes(categoriaProducto);
        
                coincideNombre && coincidePrecio && coincideCategoria
                    ? producto.classList.remove("filtro")
                    : producto.classList.add("filtro");
            });
        }
        
