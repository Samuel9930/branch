let carrito = [];
let total = 0;

function agregarProducto(nombre, imagen) {
    // Buscar el producto por nombre
    let producto = buscarProducto(nombre);

    // Agregar la imagen al objeto del producto
    producto.imagen = imagen;

    // Verificar si el producto ya está en el carrito
    let index = carrito.findIndex(p => p.nombre === nombre);
    if (index === -1) {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        producto.cantidad = 1;
        carrito.push(producto);
    } else {
        // Si el producto ya está en el carrito, aumentar su cantidad en 1
        carrito[index].cantidad++;
   }

    // Actualizar el carrito y el total
    actualizarCarrito();
    actualizarTotal();
}

function buscarProducto(nombre) {
    // En lugar de buscar en una base de datos, simulo la búsqueda con un objeto
    let productos = {
        "Mouse": {nombre: "Mouse", precio: 10},
        "Chasis": {nombre: "Chasis", precio: 80},
        "Teclado": {nombre: "Teclado", precio: 20},
        "Set-up":{nombre: "Set-up", precio: 500},
        "Silla":{nombre:"Silla",precio:150}

    };
    return productos[nombre];
}

function actualizarCarrito() {
    let lista = document.getElementById("lista-productos");
    lista.innerHTML = "";
    carrito.forEach(producto => {
        let item = document.createElement("li");
        let imagen = document.createElement("img");
        imagen.src = producto.imagen;
        item.appendChild(imagen);
        let nombre = document.createElement("span");
        nombre.innerText = producto.nombre;
        item.appendChild(nombre);
        let cantidad = document.createElement("span");
        cantidad.innerText = producto.cantidad;
        item.appendChild(cantidad);
        let precio = document.createElement("span");
        precio.innerText = "$" + producto.precio;
        item.appendChild(precio);
        let eliminar = document.createElement("button");
        eliminar.innerText = "Eliminar";
        eliminar.classList.add("eliminar");
        eliminar.onclick = function() { eliminarProducto(producto.nombre); };
        item.appendChild(eliminar);
        lista.appendChild(item);
    });
}

function actualizarTotal() {
    total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
    document.getElementById("total").innerText = "$" + total;
}

function eliminarProducto(nombre) {
    // Buscar el índice del producto en el carrito
    let index = carrito.findIndex(p => p.nombre === nombre);
    if (index !== -1) {
        // Si el producto está en el carrito, disminuir su cantidad en 1
        carrito[index].cantidad--;
        // Si la cantidad llega a 0, eliminar el producto del carrito
        if (carrito[index].cantidad === 0) {
            carrito.splice(index, 1);
        }
        // Actualizar el carrito y el total
        actualizarCarrito();
        actualizarTotal();
    }
}

function comprar() {
    // Enviar la información del carrito al servidor para procesar el pago
    console.log(carrito);
    console.log(total);
    alert("Compra realizada por $" + total);
    // Reiniciar el carrito y el total
    carrito = [];
    total = 0;
    actualizarCarrito();
    actualizarTotal();
}