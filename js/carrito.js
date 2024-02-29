const productosEncarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector(".carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const numeritoCarrito = document.getElementById('numerito');
const botonVaciarCarrito = document.querySelector(".vaciarCarrito");
const botonComprarAhora = document.querySelector(".carritoAccionescomprar");

document.addEventListener("DOMContentLoaded", function () {
    cargarProductosCarrito();
});

function cargarProductosCarrito() {
    if (productosEncarrito && productosEncarrito.length > 0) {
        contenedorCarritoVacio.style.display = "none";
        contenedorCarritoProductos.style.display = "block";
        contenedorCarritoAcciones.style.display = "flex";
        contenedorCarritoComprado.style.display = "none";

        contenedorCarritoProductos.innerHTML = "";

        productosEncarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.imagen}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
            contenedorCarritoProductos.append(div);
        });
    } else {
        contenedorCarritoVacio.style.display = "block";
        contenedorCarritoProductos.style.display = "none";
        contenedorCarritoAcciones.style.display = "none";
        contenedorCarritoComprado.style.display = "none";
    }
    actualizarBotonesEliminar();
    if (numeritoCarrito) {
        numeritoCarrito.style.display = 'none';
    }
}

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelcarrito);
    });
}
function eliminarDelcarrito(e) {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "El producto fue eliminado",
        showConfirmButton: false,
        timer: 1200,
        width: '400px',
        heigth: '30px', 
    });

    const idBoton = e.currentTarget.id;
    const index = productosEncarrito.findIndex(producto => producto.id === idBoton);

    if (index !== -1) {
        productosEncarrito.splice(index, 1);
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEncarrito));
        cargarProductosCarrito();
    }
}


const botonSeguirComprando = document.querySelector(".botonMenu");
botonSeguirComprando.addEventListener("click", () => {
    window.location.href = "./index.html";
});

botonVaciarCarrito.addEventListener("click", () => {
    localStorage.removeItem("productos-en-carrito");
    contenedorCarritoProductos.innerHTML = "";
    contenedorCarritoVacio.style.display = "block";
    contenedorCarritoProductos.style.display = "none";
    contenedorCarritoAcciones.style.display = "none";
    contenedorCarritoComprado.style.display = "none";
    if (numeritoCarrito) {
        numeritoCarrito.style.display = 'none';
    }

});

//TOTAL DE CARRITO

function calcularTotalCarrito() {
    let total = 0;
    productosEncarrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
    return total;
}

function actualizarTotalCarrito() {
    const total = document.getElementById("totalPrecio");
    total.textContent = `$${calcularTotalCarrito()}`;
}

actualizarTotalCarrito();


//COMPRAR AHORA 

botonComprarAhora.addEventListener("click", () => {
    Swal.fire({
        title: '¿Confirmar compra?',
        text: '¿Estás seguro de que deseas realizar la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Compra realizada!',
                text: 'Gracias por tu compra.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});

