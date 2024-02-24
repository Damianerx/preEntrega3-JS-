// ESTADO DEL CHANGUITO
var changuitoVisible = false;

// CARGAMOS LA WEB, LUEGO EJECUTAMOS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', webCargada)
} else {
    webCargada();
}

function webCargada() {
    // BOTONCITOS ELIMINAR DEL CHANGUITO
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var boton = botonesEliminarItem[i];
        boton.addEventListener('click', eliminarItemchanguito);
    }

    // BOTONCITOS SUMAR CANTIDAD DEL CHANGUITO
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var boton = botonesSumarCantidad[i];
        boton.addEventListener('click', sumarCantidad);
    }

    // BOTONCITOS RESTAR CANTIDAD DEL CHANGUITO
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var boton = botonesRestarCantidad[i];
        boton.addEventListener('click', restarCantidad);
    }

    // AGREGAR AL CHANGUITO
    var botonesAgregarAlchanguito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlchanguito.length; i++) {
        var boton = botonesAgregarAlchanguito[i];
        boton.addEventListener('click', agregarAlchanguitoClicked);
    }

    // FUNCIONALIDAD DEL BOTON COMPRAR
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
}

// VACIAMOS EL CHANGUITO Y LO OCULTAMOS
function pagarClicked() {
    // MENSAJITO DE SWEET ALERT DE COMPRA CONFIRMADA

    Swal.fire({
        html: `
            <div style="text-align: center;">
                <h2 style="margin-bottom: 10px;">Listo DOÑA, compra pagada</h2>
                <img src="./img/gracias.jpg" style="max-height: 250px;">
            </div>
        `,
        icon: "success",
        confirmButtonText: "Gracias Apu"
    });


    // ELIMINAMOS LOS ITEMS DEL CHANGUITO
    var changuitoItems = document.getElementsByClassName('changuito-items')[0];
    while (changuitoItems.hasChildNodes()) {
        changuitoItems.removeChild(changuitoItems.firstChild)
    }
    actualizarTotalchanguito();
    ocultarchanguito();
}

// LISTNER DEL AGREGAR AL CHANGUITO
function agregarAlchanguitoClicked(event) {
    var boton = event.target;
    var item = boton.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;

    console.log(imagenSrc);
    agregarItemAlchanguito(titulo, precio, imagenSrc);
    hacerVisiblechanguito();
}

// HACEMOS VISIBLLE EL CHANGO
function hacerVisiblechanguito() {
    changuitoVisible = true;
    var changuito = document.getElementsByClassName('changuito')[0];
    changuito.style.marginRight = '0';
    changuito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

// AGREGAR ITEM AL CHANGUITO
function agregarItemAlchanguito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemschanguito = document.getElementsByClassName('changuito-items')[0];

    // CONTROLAMOS QUE EL ITEM NO SE ENCUENTRE YA EN EL CHANGUITO
    var nombresItemschanguito = itemschanguito.getElementsByClassName('changuito-item-titulo');
    for (var i = 0; i < nombresItemschanguito.length; i++) {
        if (nombresItemschanguito[i].innerText == titulo) {
            Swal.fire({
                title: "Ya lo tiene señora",
                text: "si quiere más cantidad, presione el botón (+) en su chango ",
                icon: "info",
                confirmButtonText: "Entendido joven",
            });
            return;
        } else {
            Swal.fire({
                position: "top-end",
                toast: true,
                padding: "1rem",
                timer: 1750,
                timerProgressBar: true,
                icon: "success",
                title: "Producto agregado al changuito señora",
                showConfirmButton: false,
            });
        }
    }

    var itemchanguitoContenido = `
        <div class="changuito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="changuito-item-detalles">
                <span class="changuito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="changuito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="changuito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemchanguitoContenido;
    itemschanguito.append(item);

    // FUNCIONALIDAD DE ELIMINAR EL NUEVO ITEM DEL CHANGUITO
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemchanguito);

    // FUNCIONALIDAD DE RESTAR CANTIDAD AL NUEVO ITEM DEL CHANGUITO
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    // FUNCIONALIDAD DE SUMAR CANTIDAD AL NUEVO ITEM DEL CHANGUITO
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    // ACTUALIZAMOS EL TOTAL DEL PRECIO DEL CHANGO
    actualizarTotalchanguito();
}

// AUMENTO EN UNO LA CANTIDAD DEL ITEM SELECCIONADO
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('changuito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('changuito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('changuito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalchanguito();
}
// RESTO EN UNO LA CANTIDAD DEL ITEM SELECCIONADO
function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('changuito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('changuito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('changuito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalchanguito();
    }
}

// ELIMINAR ITEM SELECCIONADO EN EL CHANGUITO
function eliminarItemchanguito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del changuito
    actualizarTotalchanguito();

    //SI NO HAY ELEMENTOS EN EL CHAGUITO, LO ELIMINO
    ocultarchanguito();
}

// CONTROLAMOS SI NO HAY ITEMS EN EL CVHANGO. SI NO HAY, LO OCULTO
function ocultarchanguito() {
    var changuitoItems = document.getElementsByClassName('changuito-items')[0];
    if (changuitoItems.childElementCount == 0) {
        var changuito = document.getElementsByClassName('changuito')[0];
        changuito.style.marginRight = '-100%';
        changuito.style.opacity = '0';
        changuitoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
// ACTUALIZADOR DE PRECIO TOTAL DEL CHANGUITO
function actualizarTotalchanguito() {
    //seleccionamos el contenedor changuito
    var changuitoContenedor = document.getElementsByClassName('changuito')[0];
    var changuitoItems = changuitoContenedor.getElementsByClassName('changuito-item');
    var total = 0;
    //recorremos cada elemento del changuito para actualizar el total
    for (var i = 0; i < changuitoItems.length; i++) {
        var item = changuitoItems[i];
        var precioElemento = item.getElementsByClassName('changuito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        var cantidadItem = item.getElementsByClassName('changuito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('changuito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";

}