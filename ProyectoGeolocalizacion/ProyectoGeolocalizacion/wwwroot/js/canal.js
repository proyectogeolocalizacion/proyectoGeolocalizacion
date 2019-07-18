"use strict";
//CONEXIÓN CON SIGNALR
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


//AÑADIR FILAS
connection.start().then(function () {
    console.log('conectado a signalr');
    navigator.geolocation.watchPosition(recibirPosicion, errorPosicion, options);
    connection.invoke("Fila", miCanal);
}).catch(function (err) {
    return console.error(err.toString());
});


//MAPA INICIAL
let mymap = L.map('mapid').setView([43.2630126, -2.9349852], 13);
let miCanal = document.getElementById("canal").value;


//API Y TOKEN
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWlubmFoZWkiLCJhIjoiY2p4a2w5eDV1MjlrZzN6bno4YndzcGoycyJ9.t6dIk600zRcR4wHtWNZH_Q'
}).addTo(mymap);



//CREAR MARCADORES Y MOSTRAR ALIAS AL CLICKAR EN ELLOS
let markerCluster = L.markerClusterGroup();
var marker = {};


connection.on("ReceiveMessage", function (longitude, latitude, alias, canalDelEmisor) {
    console.log('mensaje recibido');
    var aliasMinuscula = alias.toLowerCase();
    let randomNumber = Math.floor(Math.random() * 7);
    if (canalDelEmisor == miCanal) {

        if (!marker[aliasMinuscula] || marker[aliasMinuscula] == undefined) {
            console.log('creando marker de ', alias);
            switch (randomNumber) {
                case 1:
                    marker[aliasMinuscula] = L.marker([latitude, longitude], { icon: blackIcon }).bindPopup(alias); break;
                case 2:
                    marker[aliasMinuscula] = L.marker([latitude, longitude], { icon: yellowIcon }).bindPopup(alias); break;
                case 3:
                    marker[aliasMinuscula] = L.marker([latitude, longitude], { icon: redIcon }).bindPopup(alias); break;
                case 4:
                    marker[aliasMinuscula] = L.marker([latitude, longitude], { icon: blueIcon }).bindPopup(alias); break;
                case 5:
                    marker[aliasMinuscula] = L.marker([latitude, longitude], { icon: violetIcon }).bindPopup(alias); break;
                case 6:
                    marker[aliasMinuscula] = L.marker([latitude, longitude], { icon: orangeIcon }).bindPopup(alias); break;
                case 7:
                    marker[aliasMinuscula] = L.marker([latitude, longitude], { icon: greyIcon }).bindPopup(alias); break;
            }

            //marker[alias] = L.marker([latitude, longitude]).bindPopup(alias);
            mymap.addLayer(marker[aliasMinuscula]);

        } else {
            console.log('actualizando marker de', alias)
            marker[aliasMinuscula].setLatLng([latitude, longitude]).update();
        }
    }

});

//WATCH POSITION - SEGUIMIENTO SIGNALR
//var watchID; = 

function recibirPosicion(position) {
    console.log('calculando nuestra posicion en el navegador')
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);
    document.getElementById("userInput").value = position.coords.longitude;
    document.getElementById("messageInput").value = position.coords.latitude;

    let alias = document.getElementById("alias").value;
    console.log(alias);
    console.log(miCanal);

    console.log('mandar la posicion de', alias);
    connection.invoke("SendMessage", position.coords.longitude, position.coords.latitude, alias, miCanal).catch(function (err) {
        return console.error(err.toString());

    });

}

function errorPosicion(error) {
    console.log(error)
}


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};


//FUNCION DEL BOTON DESCONECTAR
let desconectBtn = document.getElementById('dscnct');
window.onbeforeunload = function () {

    desconectBtn.click();
};

desconectBtn.addEventListener("click", function () {

    let alias = document.getElementById("alias").value;
    console.log(alias);

    connection.invoke("Desconectar", alias).catch(function (err) {

        return console.error(err.toString());
    });
})


//HACER DESAPARECER MARKER Y FILA SI SE DESCONECTA
connection.on("QuitarMarker", function (alias) {
    alias = alias.toLowerCase();
    mymap.removeLayer(marker[alias]);
    marker[alias] = undefined;
    let fila = document.getElementById("fila"+alias);
    tbody.removeChild(fila);
})


//AÑADIR FILA AL CONECTAR
connection.on("AnadirFila", function (devicesOnline) {

    for (var i = 0; i < devicesOnline.length; i++) {

        var textoCelda = document.createTextNode(devicesOnline[i].alias);
        var celda = document.createElement("th");
        var celda2 = document.createElement("th");
        var nuevaFila = document.createElement("tr");
        nuevaFila.setAttribute("id", "fila" + devicesOnline[i].alias.toLowerCase());

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute("id", devicesOnline[i].alias.toLowerCase());
        checkbox.setAttribute("checked", "");
        checkbox.onclick = checkboxMarkers;


        var existeUsuario = false;

        for (let row = 0; row < tabla.rows.length; row++) {
            if (tabla.rows[row].id === "fila" + devicesOnline[i].alias.toLowerCase()) {
                existeUsuario = true;
            }
        }

        if (!existeUsuario) {
            celda.appendChild(checkbox);
            celda2.appendChild(textoCelda)
            nuevaFila.appendChild(celda);
            nuevaFila.appendChild(celda2);
            tbody.appendChild(nuevaFila);
        }
    }
})

function checkboxMarkers() {
    if (this.checked == false) {
        mymap.removeLayer(marker[this.id]);
    } else {
        mymap.addLayer(marker[this.id]);

    }
}