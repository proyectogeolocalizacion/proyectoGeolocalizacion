using Microsoft.AspNetCore.SignalR;
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

        public async Task SendMessage(double longitude, double latitude, string alias, string canal)
        {

            await Clients.All.SendAsync("ReceiveMessage", longitude, latitude, alias);

            Location location = new Location();
            Device device = await _context.Device.FirstOrDefaultAsync(x=>x.Alias == alias);
            Channel channel = await _context.Channel.FirstOrDefaultAsync(x => x.Name.ToLower() == canal.ToLower());
            //location.chanel = device.Channel;
            //location.chanelDevice = device.ChannelDevices;
            location.Device = device;
            location.DeviceId = device.Id;
            //location.DeviceId = 1;
            location.Latitude = latitude;
            location.Longitude = longitude;
            location.Time = DateTime.Now;
            location.ChannelId = channel.Id;
            
            _context.Add(location);
            await _context.SaveChangesAsync();
            //var longitud = await _context.Location.Include(x => x.Longitude).FirstOrDefaultAsync();
            //var latitud = await _context.Location.Include(x => x.Latitude).FirstOrDefaultAsync();
        }

    }

    



}
