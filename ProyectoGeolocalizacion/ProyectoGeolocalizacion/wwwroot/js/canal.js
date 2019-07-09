"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
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

connection.on("ReceiveMessage", function (longitude, latitude) {
    var marker = L.marker([latitude, longitude]).bindPopup('Your are here :)');
    markerCluster.addLayer(marker);
   
        mymap.addLayer(markerCluster);
        //mymap.addLayer(circle);
        console.log(latitude);
    
});

var watchID = navigator.geolocation.watchPosition(function (position) {
    document.getElementById("userInput").value = position.coords.longitude;
    document.getElementById("messageInput").value = position.coords.latitude;

    let alias = document.getElementById("alias").value; 
    //let canal = document.getElementById("canal").value;
    console.log(longitud);
    console.log(canal);

    connection.invoke("SendMessage", position.coords.longitude, position.coords.latitude, alias).catch(function (err) {
        return console.error(err.toString());
    })
    //event.preventDefault();
});









