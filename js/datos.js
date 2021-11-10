var municipio = new Array(); //array en el que guardo los datos
var contador = 0;
var pos = 0;
var totalpedido = 0;
class articluoMunicipio {
    constructor(id, descripcion, tipo, direccion, latitud, longitud, precio, duracion) {
        this.id = id;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.direccion = direccion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.precio = precio;
        this.duracion = duracion;

    }
    leerRegistro() {
        return this;
    }
}

//añado el evento click a la lupa para ejecutar el evento que genera la tabla
document.getElementById("lupa").addEventListener("click", generarMunicipio, false);

//Array para guardar las posiciones a mostrar al seleccionar por familia
var aPosiciones;

var FamiliaSeleccionada = document.getElementById("FamiliaSeleccionada");

//funcion que guarda la posicion en caso de seleccionar por familias para ser mostradas
//para distinguir entre familias me he guiado por el campo tipo de la tabla
function familias(){
    aPosiciones = new Array();
    for (var i=0; i<municipio.length; i++){
        if (FamiliaSeleccionada.selectedIndex==0){
            aPosiciones.push(i);
        }else if (FamiliaSeleccionada.selectedIndex!=0 && FamiliaSeleccionada.selectedIndex==municipio[i].tipo){
            aPosiciones.push(i);
        }
    }
}

//funcion que imprime la tabla con los elementos del array
function generarMunicipio(evt) {
    familias();
    var cuerpoa = document.querySelector("#cuerpoServicios");
    cuerpoa.innerHTML = "";
    
    for (i = 0; i < aPosiciones.length; i++) {
        linea = document.createElement("tr");

        //idArticulo
        botonId = document.createElement("button");
        botonId.style.width = "40px";
        botonId.style.heigth = "50px";
        //evento para seleccionar el producto a vender
        botonId.addEventListener("click", mostrarMapa, false);
        botonId.addEventListener("click", VentaArticulo, false);
        //Creo un atributo del botonId para pasarle registroArticulo
        botonId.registro = municipio[aPosiciones[i]];
        dato = document.createTextNode(municipio[aPosiciones[i]].id);
        botonId.appendChild(dato);
        casilla = document.createElement("td");
        casilla.appendChild(botonId);
        linea.appendChild(casilla);


        //Descripcion
        var pDescripcion = document.createElement("p");
        dato = document.createTextNode(municipio[aPosiciones[i]].descripcion);
        pDescripcion.appendChild(dato);
        casilla = document.createElement("td");
        casilla.appendChild(pDescripcion);
        linea.appendChild(casilla);

        //Precio
        var pPrecio = document.createElement("p");
        pPrecio.style.fontWeight = "bold";
        pPrecio.style.fontSize = "18px";
        dato = document.createTextNode(municipio[aPosiciones[i]].precio);
        pPrecio.appendChild(dato);
        casilla = document.createElement("td");
        casilla.appendChild(pPrecio);
        linea.appendChild(casilla);

        //Duracion
        var pDuracion = document.createElement("p");
        dato = document.createTextNode(municipio[aPosiciones[i]].duracion);
        pDuracion.appendChild(dato);
        casilla = document.createElement("td");
        casilla.appendChild(pDuracion);
        linea.appendChild(casilla);

        //Calle
        var pCalle = document.createElement("p");
        dato = document.createTextNode(municipio[aPosiciones[i]].direccion);
        pCalle.appendChild(dato);
        casilla = document.createElement("td");
        casilla.appendChild(pCalle);
        linea.appendChild(casilla);

        //Añadimos la linea al cuerpo
        cuerpoa.appendChild(linea);

    }
}

//funcion a la que llamo para que me muestre el mapa en la latitud y longitud
//con los botones de ambas tablas
function mostrarMapa(){
    var articuloventa = this.registro;
    map = new google.maps.Map(
        document.getElementById('map_canvas'), {
        // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
        center: new google.maps.LatLng(articuloventa.latitud, articuloventa.longitud),//latitud,longitud),//
        // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
        zoom: 18, // zoom del mapa
        draggableCursor: 'auto', // forma del cursor
        draggingCursor: 'crosshair',
        mapTypeId: google.maps.MapTypeId.HYBRID // tipo de mapa
    });
}

//funcion que muestra los articulos seleccionados y muestra una tabla para comprarlos
function VentaArticulo() {
    var articuloventa = this.registro;
    map = new google.maps.Map(
        document.getElementById('map_canvas'), {
        // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
        center: new google.maps.LatLng(articuloventa.latitud, articuloventa.longitud),//latitud,longitud),//
        // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
        zoom: 18, // zoom del mapa
        draggableCursor: 'auto', // forma del cursor
        draggingCursor: 'crosshair',
        mapTypeId: google.maps.MapTypeId.HYBRID // tipo de mapa
    });

    var cuerpop = document.querySelector("#cuerpoPedido");

    linea = document.createElement("tr");

    botonId = document.createElement("button");
    botonId.style.width = "40px";
    botonId.style.heigth = "50px";
    botonId.registro=this.registro;
    botonId.addEventListener("click", mostrarMapa, false);
    dato = document.createTextNode(articuloventa.id);
    botonId.appendChild(dato);
    casilla = document.createElement("td");
    casilla.appendChild(botonId);
    linea.appendChild(casilla);

    dato = document.createTextNode(articuloventa.descripcion);
    Columna = document.createElement("td");
    Columna.appendChild(dato);
    linea.appendChild(Columna)

    parrafo = document.createElement("p");
    dato = document.createTextNode(articuloventa.precio);
    Columna = document.createElement("td");
    Columna.appendChild(dato);
    linea.appendChild(Columna)

    ccantidad = document.createElement("input");
    ccantidad.registro = articuloventa;
    ccantidad.id = "c";
    ccantidad.style.width = "80px";
    Columna = document.createElement("td");
    Columna.appendChild(ccantidad);
    ccantidad.addEventListener("keyup", calculoimporte, false);
    linea.appendChild(Columna);

    pimporte = document.createElement("input");
    pimporte.value = 0;
    pimporte.style.width = "80px";
    Columna = document.createElement("td");
    Columna.appendChild(pimporte);
    linea.appendChild(Columna)


    cuerpop.appendChild(linea);

    this.removeEventListener("click", VentaArticulo, false);

}

//funcion que calcula el importe y el total dependiendo de las cantidades introducidas
function calculoimporte() {
    articuloventa = this.registro;
    var precio = articuloventa.precio;
    var cantidad = this.value
    var importeLinea = parseFloat(precio) * parseFloat(cantidad);

    var lineaPadre = this.parentElement.parentElement;

    var hijosVentaPedido = lineaPadre.childNodes;

    var importelinea = hijosVentaPedido[4].firstChild;

    var importeAnterior = parseFloat(importelinea.value);
    importelinea.value = importeLinea
    if (isNaN(importelinea.value)) {
        importelinea.value = '0';
    }
    if (isNaN(totalpedido)) {
        totalpedido = 0;
    }
    totalpedido = totalpedido + importeLinea - importeAnterior;
    var ctotal = document.querySelector("#total");
    ctotal.value = totalpedido;

}
//document.getElementById('files').addEventListener('click', generarMunicipio, false);
