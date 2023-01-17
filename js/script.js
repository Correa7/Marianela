const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modalContainer")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.imgUrl}">
        <h3>${product.producto}</h3>
        <p class="price">$${product.precio}</p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {

        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);    

        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === product.id) {
                    prod.cantidad++
                }
            });
        } else {
            carrito.push({
                id: product.id,
                img: product.imgUrl,
                nombre: product.producto,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }
        console.log(carrito)
        console.log(carrito.length)
        carritoCounter()
        saveLocal()
        
    });
});

// set item
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

