import datos from "./data.json" with {type: "json"};

const listaProductos = document.querySelector('#cuerpo');
const carrito = document.querySelector('#carrito');
let listadoCarrito = [];
const buscarItemTexto = document.querySelector('#buscar');
const buscarItemBoton = document.querySelector('#busqueda')
let resultadoBusqueda = [];

const cargarLista = () => {
    let categoria = "";
    datos.map((item) => {
        if(item.categoria != categoria){
            categoria = item.categoria;
            const titular = document.createElement("h2");
            titular.textContent = categoria.toUpperCase();
            listaProductos.append(titular)
        }

        const monster = document.createElement('div');
        const producto = `<img class="i1" src="${item.imagen}" alt="La imagen no pudo cargar." height="350px">
                                <p>${item.nombre}</p>
                                <p>Comprar por: $${item.precio}</p> <button type="button" class="carrito" onclick="agregarAlCarrito(${item.id})">Comprar</button>`
        monster.innerHTML = producto;
        listaProductos.append(monster)
    })
}


const buscarProductos = () => {
    listaProductos.innerHTML = "<br>\n" +
        "\n" +
        "                <br>"
    const texto = buscarItemTexto.value
    let categoria = "";
    datos.map((item) => {
        if(item.nombre.toLowerCase().includes(texto.toLowerCase())){
            resultadoBusqueda.push(item)
        }
    })
    if(resultadoBusqueda.length > 0){
        resultadoBusqueda.map((item) => {
            if(item.categoria != categoria){
                categoria = item.categoria;
                const titular = document.createElement("h2");
                titular.textContent = categoria.toUpperCase();
                listaProductos.append(titular)
            }
            const monster = document.createElement('div');
            const producto = `<img class="i1" src="${item.imagen}" alt="La imagen no pudo cargar." height="350px">
                                <p>${item.nombre}</p>
                                <p>Comprar por: $${item.precio}</p> <button type="button" class="carrito" onclick="agregarAlCarrito(${item.id})">Comprar</button>`
            monster.innerHTML = producto;
            listaProductos.append(monster)
        })
    }else{
        const titular = document.createElement("h2");
        titular.textContent = "No se encontró item";
        listaProductos.append(titular)
        alert("No se encontró")
        cargarLista();
    }
    resultadoBusqueda = []
}

const buscarMonster = (nombre) => {
    datos.map((item) => {
        if(item.nombre.toLowerCase() == nombre.toLowerCase()){
            console.log("encontrado")
        }
    })
}
window.agregarAlCarrito = (id) => {
    let index = datos.findIndex((item) => item.id == id);
    listadoCarrito.push(datos[index])
    console.log(listadoCarrito)
    actualizarListaCarrito()
}


const actualizarListaCarrito = () => {
    carrito.innerHTML = "";
    listadoCarrito.map((item) => {
        const lineaNueva = document.createElement("div")
        const itemListado = `
        <p style="color: aliceblue">${item.nombre} - ${item.precio}</p>
        <button onclick="borrarDelCarrito(${item.id})">Borrar</button>
    `
        lineaNueva.innerHTML = itemListado;
        carrito.append(lineaNueva)
    })
    const pagar = document.createElement("button")
    pagar.innerHTML = "Pagar";
    carrito.append(pagar)
    pagar.addEventListener('click', vaciarCarrito)
    console.log("Actualizado")
    console.log(listadoCarrito)
}

window.vaciarCarrito = () => {
    if(window.confirm("Desea realizar la compra")){
        listadoCarrito = []
    }
    actualizarListaCarrito()
}
window.borrarDelCarrito = (id) => {
    let flag = true;
    let carritoNuevo = []
    listadoCarrito.map((item) => {
        if(item.id != id){
            carritoNuevo.push(item)
            console.log("agregado")
        }else if(!flag){
            carritoNuevo.push(item)
            console.log("agregado")
        }else{
            flag = false;
            console.log("borrado")
        }
    })
    listadoCarrito = carritoNuevo;
    actualizarListaCarrito();
}
buscarItemBoton.addEventListener('click', buscarProductos)


cargarLista()