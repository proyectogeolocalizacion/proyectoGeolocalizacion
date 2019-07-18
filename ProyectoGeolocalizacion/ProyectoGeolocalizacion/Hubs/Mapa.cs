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


        //MÉTODO PRINCIPAL ENSEÑAR MARKER EN POSICIÓN
        public async Task SendMessage(double longitude, double latitude, string alias, string canal)
        {

            await Clients.All.SendAsync("ReceiveMessage", longitude, latitude, alias, canal);
            Location location = new Location();
            Device device = await _context.Device.FirstOrDefaultAsync(x=>x.Alias == alias);
            location.Device = device;
            //location.DeviceId = 1;
            location.Latitude = latitude;
            location.Longitude = longitude;
            location.Time = DateTime.Now;
            
            _context.Add(location);
            await _context.SaveChangesAsync();
        }


        //HACER DESAPARECER MARKER SI SE DESCONECTA
        public async Task Desconectar(string alias)
        {
            await Clients.All.SendAsync("QuitarMarker", alias);
            
        }


        //AÑADIR FILA AL CONECTAR

        public async Task Fila(string canal)
        {
            List<Device> devicesOnline = await _context.Device.Where(x => x.Status == "Online" && x.Channel==canal).ToListAsync();
            await Clients.All.SendAsync("AnadirFila", devicesOnline);

        }




    }

    



}
