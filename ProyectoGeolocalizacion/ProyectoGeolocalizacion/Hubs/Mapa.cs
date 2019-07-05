using Microsoft.AspNetCore.SignalR;
using ProyectoGeolocalizacion.Data;
using ProyectoGeolocalizacion.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ProyectoGeolocalizacion.Hubs
{
    public class Mapa : Hub
    {
        private readonly ApplicationDbContext _context;

        public Mapa(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SendMessage(double longitude, double latitude)
        {
            await Clients.All.SendAsync("ReceiveMessage", longitude, latitude);
            //Location location = new Location();
            //location.Latitude = latitude;
            //location.Longitude = longitude;
            //_context.Add(location);
            //await _context.SaveChangesAsync();
        }

    }

    



}
