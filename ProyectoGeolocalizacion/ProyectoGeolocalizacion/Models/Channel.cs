﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProyectoGeolocalizacion.Models
{
    public class Channel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Device> Devices { get; set; }
       

    }

}