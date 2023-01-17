
const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modalContainer")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let input = document.getElementById("input")
let button = document.getElementById("buscador")

button.addEventListener("click", buscar)

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// renderizar(productos)

// set item
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


/*     Buscador / Filtro  */
function buscar(e) {
    e.preventDefault()
    let filtrado = productos.filter(producto => producto.nombre.toLowerCase().includes(input.value.toLowerCase()))
    console.log(filtrado)
    
    renderizar(filtrado)
}
function renderizar (arrey) {

        shopContent.innerHTML=""

    for (let product of productos) {
        let content = document.createElement("div")
        content.className = "card"
        content.innerHTML = `
            <img src="${product.imgUrl}">
            <h3>${product.nombre}</h3>
            <p class="price">$${product.precio}</p>
            <button id ="${product.id}" class="comprar7">Comprar</button>
        `
        shopContent.append(content)
    }
    let comprar = document.getElementsByClassName("comprar7")
    for (btn of comprar) {
        btn.addEventListener("click", Comprar)
    }
   
}
function Comprar (e) {
    let product = productos.find(producto => producto.id == e.target.id)
    let indexProduct = carrito.findIndex(producto => producto.id == product.id)

    if (indexProduct != -1) {
        carrito[indexProduct].cantidad++
        carrito[indexProduct].subtotal = carrito[indexProduct].precio * carrito[indexProduct].unidades
        carritoJSON = JSON.stringify(carrito)
        localStorage.setItem("carrito", carritoJSON)
    }
    else {
        carrito.push({
            id: product.id,
            img: product.imgUrl,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
            subtotal: product.precio
        })
        carritoJSON = JSON.stringify(carrito)
        localStorage.setItem("carrito", carritoJSON)
    }
    totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
    unidades = carrito.reduce((a, b) => a + b.cantidad, 0)
    carritoCounter()
    saveLocal()
}