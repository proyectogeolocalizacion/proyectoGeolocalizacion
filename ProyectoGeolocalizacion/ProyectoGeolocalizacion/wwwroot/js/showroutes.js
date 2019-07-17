

var locations = document.getElementById("locations").innerHTML;
console.log(locations);

var obj = JSON.parse(locations);

var testData = {

    data: obj,
};

var map = L.Wrld.map("routemap", "91a68d505577cb772e2ba97464e831bf", {
    center: [43.2630126, -2.9349852],
    zoom: 10

});

var polylinePoints = testData.data;

var polyline = L.Wrld.polyline(polylinePoints, { color: 'e60000', weight: 4 }).addTo(map);
map.fitBounds(polyline.getBounds());