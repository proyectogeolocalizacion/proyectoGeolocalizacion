using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProyectoGeolocalizacion.Models
{
    public class Location
    {

        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public List<Device> Devices { get; set; }
    }
}
