﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;
var canal = document.getElementById('canal').value;
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

var channel = document.getElementById('canal').value;
connection.on("ReceiveMessage", function (longitude, latitude, alias, canal) {

    if (channel != canal) {

    }
    else {
        if (!marker[alias]) {
            marker[canal] = canal;
            marker[alias] = L.marker([latitude, longitude]).bindPopup(alias);
            mymap.addLayer(marker[alias]);
            geoloc();
        } else {
            marker[canal] = canal;
            marker[alias].setLatLng([latitude, longitude]).update();
            geoloc();
        }

    }
    

});

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
var watchID = navigator.geolocation.getCurrentPosition(recibirPosicion, errorPosicion, options);

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
    canal = document.getElementById("canal").value;
    console.log(alias);
    console.log(canal);

    //if (longitudActual !== position.coords.longitude || latitudActual !== position.coords.latitude) {

        connection.invoke("SendMessage", position.coords.longitude, position.coords.latitude, alias, canal).catch(function (err) {
            return console.error(err.toString());

        //});
        longitudActual = position.coords.longitude;
        latitudActual = position.coords.latitude;
    })
}

window.onbeforeunload = function () {
    let desconectBtn = document.getElementById('dscnct');
    desconectBtn.click();
};


//HACER DESAPARECER MARKERS CHECKBOXES  

var tabla = document.getElementById("tabla");
var casillas = tabla.getElementsByTagName('input');


for (var i = 0, len = casillas.length; i < len; i++) {
    if (casillas[i].type === 'checkbox') {



        casillas[i].onclick = function () {
            if (casillas[i].checked = false) {

                mymap.removeLayer(marker[i]);

            } else {

                mymap.addLayer(marker[i]);

            }
        };

    }
}

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
        console.log(canal);

        
        //connection.invoke("SendMessage", position.coords.longitude, position.coords.latitude, alias, canal).catch(function (err) {
        //    return console.error(err.toString());
        //    console.log(position.coords.longitude);
        //    console.log(position.coords.latitude);
        //    console.log(alias);
        //    console.log(canal);
        //})

        //event.preventDefault();
    });
}
