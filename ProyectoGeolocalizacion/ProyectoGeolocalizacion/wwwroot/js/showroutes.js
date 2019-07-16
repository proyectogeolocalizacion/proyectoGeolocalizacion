
var locations = document.getElementById("locations").innerHTML;
console.log(locations);

var obj = JSON.parse(locations);

var testData = {
  
    data: obj,
};

var map = L.Wrld.map("routemap", "91a68d505577cb772e2ba97464e831bf" , {
    center: [43.2630126, -2.9349852],
    zoom: 9
    
});

var polylinePoints = testData.data;

var polyline = L.Wrld.polyline(polylinePoints, { color: '#FF0000', weight: 4 }).addTo(map);
map.fitBounds(polyline.getBounds());











//var map = L.Wrld.map("routesmap", "91a68d505577cb772e2ba97464e831bf", {
//    center: [43.2630126, -2.9349852],
//    zoom: 8
//});

//var polylinePoints = [
//    [43.2630126, -2.9349852],
//    [43.260012, -2.9204827],
//    [43.261512, -2.9204827],
//    [43.2619512, -2.92495127],
//    [43.2619512, -2.93495127],
//    [43.2635512, -2.93585127]

//];

//var polyline = L.Wrld.polyline(polylinePoints,{ color: '#FF0000', weight: 4 }).addTo(map);
//map.fitBounds(polyline.getBounds());


