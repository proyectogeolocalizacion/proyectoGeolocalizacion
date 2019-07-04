using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ProyectoGeolocalizacion.Hubs
{
    public class Mapa : Hub
    {
        public async Task SendMessage(string longitude, string latitude)
        {
            await Clients.All.SendAsync("ReceiveMessage", longitude,latitude);
        }

    }

    //public async Task ShowLocation(double longitude, double latitude)
    //{


    //}




}
