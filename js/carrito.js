
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".botonCategoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="contenedorDetalles">
                    <h3 class="tituloProducto">${producto.titulo}</h3>
                    <p class="productoPrecio">${producto.precio}</p>
                    <button class="productoCarrito" id="${producto.id}">Agregar al carrito</button>
                </div>
            `;
        contenedorProductos.append("div")
    });

}







