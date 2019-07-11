// don't forget to include leaflet-heatmap.js
var testData = {
    max: 8,
    data: [
        { lat: 24.6408, lng: -80.7728, count: 1 },
        { lat: 26.75, lng: -80.55, count: 5 },
        { lat: 26.76, lng: -80.55, count: 5 },
        { lat: 26.77, lng: -80.55, count: 5 },
        { lat: 26.78, lng: -80.55, count: 5 },
        { lat: 26.765, lng: -80.55, count: 5 },
        { lat: 26.74, lng: -80.55, count: 5 },
        { lat: 26.79, lng: -80.55, count: 5 },
        { lat: 26.80, lng: -80.55, count: 5 },
    ]
};

var baseLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '...',
        maxZoom: 18
    }
);

var cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": 25,
    "maxOpacity": .8,
    // scales the radius based on map zoom
    "scaleRadius": false,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtremas": true,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'count'
};


var heatmapLayer = new HeatmapOverlay(cfg);

var map = new L.Map('heatmap', {
    center: new L.LatLng(25.6586, -80.3568),
    zoom: 8,
    layers: [baseLayer, heatmapLayer]
});

heatmapLayer.setData(testData);


////AÑADIR CAPA A NUESTRO MAPA
//var heatmap = document.getElementById("heatmap");
//heatmap.addLayer(heatmapLayer);

//let mymap = L.map('heatmap').setView([43.2630126, -2.9349852], 13);


//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//    maxZoom: 20,
//    id: 'mapbox.streets',
//    accessToken: 'pk.eyJ1IjoibWlubmFoZWkiLCJhIjoiY2p4a2w5eDV1MjlrZzN6bno4YndzcGoycyJ9.t6dIk600zRcR4wHtWNZH_Q'
//}).addTo(mymap);
