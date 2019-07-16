// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.




var map = L.Wrld.map("routemap", "91a68d505577cb772e2ba97464e831bf", {
    center: [43.2630126, -2.9349852],
    zoom: 8
});

var polylinePoints = [
    [43.2630126, -2.9349852],
    [43.260012, -2.9204827],
    [43.261512, -2.9204827],
    [43.2619512, -2.92495127],
    [43.2619512, -2.93495127],
    [43.2635512, -2.93585127]

];

var polyline = L.Wrld.polyline(polylinePoints, { color: '#FF0000', weight: 4 }).addTo(map);
map.fitBounds(polyline.getBounds());




//..........................Calendario busqueda fecha maproutes...............................//

$(document).ready(function () {
    var date_input = $('input[name="fecha"]'); //our date input has the name "date"
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    var options = {
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);
})











