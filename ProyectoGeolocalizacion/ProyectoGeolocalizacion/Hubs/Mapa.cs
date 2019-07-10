﻿using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
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

        public async Task SendMessage(double longitude, double latitude, string alias)
        {

            await Clients.All.SendAsync("ReceiveMessage", longitude, latitude);
            Location location = new Location();
            Device device = await _context.Device.FirstOrDefaultAsync(x=>x.Alias == alias);
            location.Device = device;
            //location.DeviceId = 1;
            location.Latitude = latitude;
            location.Longitude = longitude;
            location.Time = DateTime.Now;
            
            _context.Add(location);
            await _context.SaveChangesAsync();
            //var longitud = await _context.Location.Include(x => x.Longitude).FirstOrDefaultAsync();
            //var latitud = await _context.Location.Include(x => x.Latitude).FirstOrDefaultAsync();
        }

        public async Task NewConnection(string alias)
        {
            Device dev = await _context.Device.Where(x => x.Alias == alias).FirstOrDefaultAsync();
            await Clients.All.SendAsync("ConnectedFriends", dev);
        }
    }

    



}
