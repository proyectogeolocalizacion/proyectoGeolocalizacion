"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (longitude, latitude) {
    var msg = latitude.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = longitude + " says " + latitude    ;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var longitude = document.getElementById("userInput").value;
    var latitude = document.getElementById("messageInput").value;
 
    connection.invoke("SendMessage", longitude, latitude).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});










(function () {
    var content = document.getElementById("sendButton");

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (objPosition) {
            var lon = objPosition.coords.longitude;
            var lat = objPosition.coords.latitude;

            connection.invoke("SendMessage", longitude, latitude).catch(function (err) {
                return console.error(err.toString());
            
        }, function (objPositionError) {
            switch (objPositionError.code) {
                case objPositionError.PERMISSION_DENIED:
                    content.innerHTML = "No se ha permitido el acceso a la posición del usuario.";
                    break;
                case objPositionError.POSITION_UNAVAILABLE:
                    content.innerHTML = "No se ha podido acceder a la información de su posición.";
                    break;
                case objPositionError.TIMEOUT:
                    content.innerHTML = "El servicio ha tardado demasiado tiempo en responder.";
                    break;
                default:
                    content.innerHTML = "Error desconocido.";
            }
        }, {
                maximumAge: 75000,
                timeout: 15000
            });
