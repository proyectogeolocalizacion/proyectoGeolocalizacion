// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var mymap = L.map('mapid').setView([43.2630126, -2.9349852], 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWlubmFoZWkiLCJhIjoiY2p4a2w5eDV1MjlrZzN6bno4YndzcGoycyJ9.t6dIk600zRcR4wHtWNZH_Q'
}).addTo(mymap);




//var x = document.getElementById("jonatan");

//function getLocation() {
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(showPosition);
//    }
//    else {
//        x.innerHTML = "Geolocation is not supported by this browser.";
//    }
//}

//function showPosition(position) {
//    x.innerHTML = "Latitude: " + position.coords.latitude +
//        "<br>Longitude: " + position.coords.longitude;
//    console.log(position)
//}




mymap.locate({ setView: true, watch: false }) /* This will return map so you can do chaining */
    .on('locationfound', function (e) {
        var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
        var circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
            weight: 1,
            color: 'green',
            fillColor: '#d620d3',
            fillOpacity: 0.1
        });
        mymap.addLayer(marker);
        mymap.addLayer(circle);
        console.log(e.latitude);
    })
    .on('locationerror', function (e) {
        console.log(e);
        alert("Location access denied.");
    });


loadMap('mymap');

