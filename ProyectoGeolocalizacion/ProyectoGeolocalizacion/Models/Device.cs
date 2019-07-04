using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProyectoGeolocalizacion.Models
{
    public class Device
    {
        public int Id { get; set; }
        public string Alias { get; set; }

        public List<Location> Locations { get; set; }
        public List<ChannelDevice> ChannelDevices { get; set; }

    }
}
