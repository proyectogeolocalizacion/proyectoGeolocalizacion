using System;
using System.Collections.Generic;

namespace ProyectoGeolocalizacion.Models
{
    public class Location
    {
        public int Id { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }

        public Device Device { get; set; }
        public int DeviceId { get; set; }



    }
}
