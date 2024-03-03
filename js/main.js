let productos; // Declara la variable productos en un ámbito más amplio

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('./productos.json');
        productos = await response.json();
        console.log(productos);
        cargarProductos(productos);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
});

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".botonCategoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numerito = document.querySelector("#numerito");

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
       botonesCategorias.forEach(boton => boton.classList.remove("active"));
       e.currentTarget.classList.add("active");

        if(e.currentTarget.id !== "todos"){ 
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else { 
            tituloPrincipal.innerText = "todos los productos";
            cargarProductos(productos);
        }
    });
});



function cargarProductos(productos) {
    contenedorProductos.innerHTML = ""; // Limpiar el contenedor antes de cargar nuevos productos
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.imagen}">
            <div class="contenedorDetalles">
                <h3 class="tituloProducto">${producto.titulo}</h3>
                <p class="productoPrecio">$ ${producto.precio}</p>
                <button class="productoCarrito" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
    const productoCarrito = document.querySelectorAll(".productoCarrito");
    productoCarrito.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    const numerito = document.querySelector("#numerito");
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
