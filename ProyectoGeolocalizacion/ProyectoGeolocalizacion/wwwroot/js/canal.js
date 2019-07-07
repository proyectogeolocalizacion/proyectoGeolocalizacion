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
    //var circle = L.circle([latitude, longitude],  {
    //    weight: 1,
    //    color: 'green',
    //    fillColor: '#d620d3',
    //    fillOpacity: 0.1
    //});
        mymap.addLayer(markerCluster);
        //mymap.addLayer(circle);
        console.log(latitude);
     
    
    //var msg = latitude.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //var encodedMsg = "longitud: " + longitude + " ,latitud: " + latitude;
    //var li = document.createElement("li");
    //li.textContent = encodedMsg;
    //document.getElementById("messagesList").appendChild(li);
});

//mymap.locate({ setView: true, watch: false }) /* This will return map so you can do chaining */
//    .on('locationfound', function (e) {
//        //connection.invoke("SendMessage", e.longitude, e.latitude).catch(function (err) {
//        //    return console.error(err.toString());
//            document.getElementById("userInput").value =  e.longitude;
//            document.getElementById("messageInput").value = e.latitude;
            
//        //})
//    });

var watchID = navigator.geolocation.watchPosition(function (position) {
    document.getElementById("userInput").value = position.coords.longitude;
    document.getElementById("messageInput").value = position.coords.latitude;
    let alias = "lunes";
    document.getElementById("alias").value = alias;
    let canal = "semanas";
    document.getElementById("canal").value = canal;
    console.log(alias);
    console.log(canal);

    connection.invoke("SendMessage", position.coords.longitude, position.coords.latitude, alias).catch(function (err) {
        return console.error(err.toString());
    })
});


//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var longitude = document.getElementById("userInput").value;
//    var latitude = document.getElementById("messageInput").value;
 
//    connection.invoke("SendMessage", longitude, latitude,).catch(function (err) {
//        return console.error(err.toString());

        //connection.invoke("SendMessage", longitude, latitude).catch(function (e) {
        //    var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
        //    var circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
        //        weight: 1,
        //        color: 'green',
        //        fillColor: '#d620d3',
        //        fillOpacity: 0.1
        //    });
        //    mymap.addLayer(marker);
        //    mymap.addLayer(circle);
        //    console.log(e.latitude);
        //})

//    });
//    event.preventDefault();
//});
















