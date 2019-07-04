"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});


let mymap = L.map('mapid').setView([43.2630126, -2.9349852], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWlubmFoZWkiLCJhIjoiY2p4a2w5eDV1MjlrZzN6bno4YndzcGoycyJ9.t6dIk600zRcR4wHtWNZH_Q'
}).addTo(mymap);



//mymap.locate({ setView: true, watch: false }) /* This will return map so you can do chaining */
//    .on('locationfound', function (e) {
//        var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
//        var circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
//            weight: 1,
//            color: 'green',
//            fillColor: '#d620d3',
//            fillOpacity: 0.1
//        });
//        mymap.addLayer(marker);
//        mymap.addLayer(circle);
//        console.log(e.latitude);
//    })



connection.on("ReceiveMessage", function (longitude, latitude) {

    var marker = L.marker([latitude, longitude]).bindPopup('Your are here :)');
    var circle = L.circle([latitude, longitude],  {
        weight: 1,
        color: 'green',
        fillColor: '#d620d3',
        fillOpacity: 0.1
    });
        mymap.addLayer(marker);
        mymap.addLayer(circle);
        console.log(latitude);
     
    
    //var msg = latitude.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //var encodedMsg = "longitud: " + longitude + " ,latitud: " + latitude;
    //var li = document.createElement("li");
    //li.textContent = encodedMsg;
    //document.getElementById("messagesList").appendChild(li);
});



document.getElementById("sendButton").addEventListener("click", function (event) {
    var longitude = document.getElementById("userInput").value;
    var latitude = document.getElementById("messageInput").value;
 
    connection.invoke("SendMessage", longitude, latitude).catch(function (err) {
        return console.error(err.toString());

        
            
        


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

    });
    event.preventDefault();
});
















