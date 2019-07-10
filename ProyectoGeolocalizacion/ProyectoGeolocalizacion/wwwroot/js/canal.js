"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    geoloc();
}).catch(function (err) {
    return console.error(err.toString());
});


let mymap = L.map('mapid').setView([43.2630126, -2.9349852], 13);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWlubmFoZWkiLCJhIjoiY2p4a2w5eDV1MjlrZzN6bno4YndzcGoycyJ9.t6dIk600zRcR4wHtWNZH_Q'
}).addTo(mymap);


let markerCluster = L.markerClusterGroup();
var marker = {};

connection.on("ReceiveMessage", function (longitude, latitude, alias) {

    if (!marker[alias]) {

        marker[alias] = L.marker([latitude, longitude]).bindPopup(alias);
        mymap.addLayer(marker[alias]);

    } else {
        marker[alias].setLatLng([latitude, longitude]).update();
    }

    //markerCluster.addLayer(marker);
    geoloc();
});

function geoloc() {
    var watchID = navigator.geolocation.getCurrentPosition(function (position) {
        var lng = position.coords.longitude;
        document.getElementById("userInput").value = position.coords.longitude;
        var lat = position.coords.latitude;
        document.getElementById("messageInput").value = position.coords.latitude;

        let alias = document.getElementById("alias").value;
        let canal = document.getElementById("canal").value;
        //console.log(position.coords.longitude);
        console.log(alias);


        connection.invoke("SendMessage", position.coords.longitude, position.coords.latitude, alias, canal).catch(function (err) {
            return console.error(err.toString());
        })

        //event.preventDefault();
    });
}

//PRUEBA SI NO BORRAR
//var marker;
//function update_pos() {
//    if (navigator.geolocation) {
//        navigator.geolocation.watchPosition(function (position) {
//            var latitude = position.coords.latitude;
//            var longitude = position.coords.longitude;
//        })
//    }
//    if (!marker) {
//        marker = L.marker([latitude, longitude]).bindPopup('You are here :)').addTo(mymap);
//    }
//    marker.setLatLng([latitude, longitude]).update();
//    setTimeout(update_pos, 3000);
//}
//FINPRUEBA

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
var watchID = navigator.geolocation.watchPosition(recibirPosicion, errorPosicion, options);

function errorPosicion(error) {
    console.log(error)
}
var longitudActual;
var latitudActual;

function recibirPosicion(position) {
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);
    document.getElementById("userInput").value = position.coords.longitude;
    document.getElementById("messageInput").value = position.coords.latitude;

    let alias = document.getElementById("alias").value;
    let canal = document.getElementById("canal").value;
    console.log(alias);
    console.log(canal);

    if (longitudActual !== position.coords.longitude || latitudActual !== position.coords.latitude) {

        connection.invoke("SendMessage", position.coords.longitude, position.coords.latitude, alias).catch(function (err) {
            return console.error(err.toString());

        });
        longitudActual = position.coords.longitude;
        latitudActual = position.coords.latitude;
    }
}

window.onbeforeunload = function () {
    let desconectBtn = document.getElementById('dscnct'); 
    desconectBtn.click();
};




